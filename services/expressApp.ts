import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { BadRequestError, errorHandler, NotAuthroizedError, NotFoundError } from '../errors';
import Cron from 'croner';
import { config } from '../config/config';
import nodemailer from 'nodemailer';
import { logger } from '../utils';

export const ExpressApp = async (app: Application) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(cors());

  const createEmailTransport = () => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config().nodemailer_user,
        pass: config().nodemailer_pass,
      },
    });

    return transporter;
  };

  const sendEmailNotification = async (title: string, url: string) => {
    const transporter = createEmailTransport();

    const email = config().nodemailer_user;

    await transporter.sendMail({
      from: email, // sender address
      to: email, // list of receivers
      subject: `${title} is now in stock`, // Subject line
      html: `<b>${title} is now in stock<b><br><br>
        ${url}
      `, // plain text body
    });
  };

  const getInStockText = async (url: string) => {
    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const inStockText = await page.$eval('#form-action-addToCart', (el) => el.getAttribute('value'));
    const titleText = await page.$eval(
      '#product-view > section.productView-details.tw-flex.tw-justify-center.tw-pb-3 > div > h1',
      (el) => el.textContent,
    );
    await browser.close();

    if (!inStockText || !titleText) throw new NotFoundError();

    return {
      inStockText: inStockText.toLowerCase().trim(),
      titleText,
    };
  };

  const checkSecret = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.headers.authorization);

      if (req.headers.authorization?.replace('Bearer ', '') !== config().secret) throw new NotAuthroizedError();
      next();
    } catch (error) {
      logger.error(error);

      next(error);
    }
  };

  app.post('/jellycat', checkSecret, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inStockTextToMatch = 'add to bag'; // means in stock

      if (!req.body.url) throw new BadRequestError();

      const job = Cron('*/15 * * * * *');

      job.schedule(async () => {
        const inStockText = await getInStockText(req.body.url);
        logger.info(`Currently tracking ${inStockText.titleText}`);

        if (inStockText.inStockText === inStockTextToMatch) {
          await sendEmailNotification(inStockText.titleText, req.body.url);
          logger.info(`The job has ended`);

          job.stop();
        }
      });

      res.status(200).json({ success: true, message: 'Email notification has been sent' });
    } catch (error) {
      logger.error(error);

      next(error);
    }
  });

  app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    try {
      // if some thing
      throw new Error('generic error');
      res.json('up and running');
    } catch (error) {
      next(error);
    }
  });

  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const error = new NotFoundError();
    next(error);
  });

  app.use(errorHandler);

  return app;
};
