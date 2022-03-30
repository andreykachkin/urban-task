import { AddressNotFoundError, AddressNotServicedError } from '../errors';
import { IAddressWithServiceArea } from '../models/address';
import { findServiceArea } from '../service-areas';
import { geocode } from './providers/googlemaps-provider';

export async function getCoordinatesByAddress(
  address: string,
): Promise<IAddressWithServiceArea> {
  const response = await geocode(address);

  if (!response) {
    throw new AddressNotFoundError(address);
  }

  const serviceArea = findServiceArea(response.lat, response.lng);
  
  if (!serviceArea) {
    throw new AddressNotServicedError(address);
  }
  return {
    ...response,
    serviceArea,
  };
}
