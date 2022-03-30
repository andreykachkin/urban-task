import { json } from 'body-parser'
import * as express from 'express'

import config from './config'
import { controller as geolocationController } from './controllers/geo-location'

const { PORT, NODE_ENV } = config

export const app = express()

app.use(json())

geolocationController(app)

app.listen(PORT, () => {
  console.log(`Start app on ${NODE_ENV} stage`)
  console.log(`App listening on port ${PORT}!`)
})
