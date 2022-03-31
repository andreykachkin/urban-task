import ErrorBase from './base-error'

export class AddressNotServicedError extends ErrorBase {
  constructor(address: string) {
    super(`Address ${address} not serviced`)
  }

  code = 'ADDRESS_NOT_SERVICED'
  statusCode = 400
  message = 'Non-serviced address'
}
