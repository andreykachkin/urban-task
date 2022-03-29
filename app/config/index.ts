import { config } from 'dotenv';

config();

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 9000,
  GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
}
