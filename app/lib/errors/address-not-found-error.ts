import ErrorBase from './base-error'

export class AddressNotFoundError extends ErrorBase {
  constructor(address: string) {
    super(`Address ${address} not found`)
  }

  code = 'ADDRESS_NOT_FOUND'
  statusCode = 404
  message = 'Non-existing address'
}
