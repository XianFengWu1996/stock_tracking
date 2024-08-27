export type AppConfig = {
  apiUrl: string;
  port: number;
  env: string;
  nodemailer_user: string;
  nodemailer_pass: string;
  secret: string;
};

export const config: () => AppConfig = () => {
  console.log(process.env.SECRET);
  return {
    apiUrl: process.env.API_URL || '',
    port: process.env.PORT ? parseInt(process.env.PORT) : 8000,
    env: process.env.NODE_ENV || '',
    nodemailer_user: process.env.NODEMAILER_USER || '',
    nodemailer_pass: process.env.NODEMAILER_PASS || '',
    secret: process.env.SECRET || '',
  };
};
