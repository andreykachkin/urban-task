import { Application, Request, Response } from 'express'
import { getCoordinatesByAddress } from '../lib/coordinates/get-by-address'
import { checkAddress } from '../middlewares'

export function controller(app: Application) {
  app.get('/geolocation', checkAddress, async (req: Request, res: Response) => {
    const { address } = req.query

    try {
      const data = await getCoordinatesByAddress(address as string)

      res.status(200).json({
        status: 'OK',
        search: address,
        location: data,
      })
    } catch (error) {
      res.status(error.statusCode).json({
        status: error.code,
        search: error.message,
      })
    }
  })
}
