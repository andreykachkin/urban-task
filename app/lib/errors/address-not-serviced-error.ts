import ErrorBase from './base-error'

export class AddressNotServicedError extends ErrorBase {
  constructor(address: string) {
    super(`Address ${address} not found`);
  }

  code = 'ADDRESS_NOT_SERVICED';
  statusCode = 404;
  message = 'Non-serviced address';
}
