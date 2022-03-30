import { config } from 'dotenv'

config()

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 9000,
  GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
  MAPBOX_URL: process.env.MAPBOX_URL,
  MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
  MAPBOX_LIMIT: process.env.MAPBOX_LIMIT || 1,
  MAPBOX_COUNTRIES: process.env.MAPBOX_COUNTRIES || 'gb',

  GOOGLE_PROVIDER_PRIORITY: process.env.GOOGLE_PROVIDER_PRIORITY,
  MAPBOX_PROVIDER_PRIORITY: process.env.MAPBOX_PROVIDER_PRIORITY,
}
