import { Application, Request, Response } from 'express';
import { getCoordinatesByAddress } from '../lib/coordinates/get-by-address';

export function controller(app: Application) {
  app.get('/geolocation', async (req: Request, res: Response) => {
    try {
      const data = await getCoordinatesByAddress(req.query.address as string);

      res.status(200).json({
        status: 'OK',
        search: req.query.address as string,
        location: data,
      });
    } catch (error) {
      res.status(error.statusCode).json({
        status: error.code,
        search: error.message,
      });
    }
  });
}
