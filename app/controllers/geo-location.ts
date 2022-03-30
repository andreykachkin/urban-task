import { Application, Request, Response } from 'express'
import { getCoordinatesByAddress } from '../lib/coordinates/get-by-address'

export function controller(app: Application) {
  app.get('/geolocation', async (req: Request, res: Response) => {
    const { address } = req.query

    if (!address) {
      return res.status(400).json({
        status: 'ADDRESS_REQUIRED',
        search: 'Address parameter is required',
      })
    }

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
