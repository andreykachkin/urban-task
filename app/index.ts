import { json } from 'body-parser';
import * as express from 'express';

import config from './config';
import { controller as geolocationController } from './controllers/geo-location';

const PORT = (config.PORT);

export const app = express();

app.use(json());

geolocationController(app);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
