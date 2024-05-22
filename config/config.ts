export type AppConfig = {
  apiUrl: string;
  port: number;
  env: string;
  mongoUri: string;
};

export const config: () => AppConfig = () => {
  return {
    apiUrl: process.env.API_URL || '',
    port: process.env.PORT ? parseInt(process.env.PORT) : 8000,
    env: process.env.NODE_ENV || '',
    mongoUri: process.env.MONGO_URI || '',
  };
};
