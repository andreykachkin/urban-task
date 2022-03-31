import { Request, Response, NextFunction } from 'express'

const checkAddress = (req: Request, res: Response, next: NextFunction) => {
  const { address } = req.query

  if (!address) {
    return res.status(400).json({
      status: 'ADDRESS_REQUIRED',
      search: 'Address parameter is required',
    })
  }

  next()
}

export default checkAddress
