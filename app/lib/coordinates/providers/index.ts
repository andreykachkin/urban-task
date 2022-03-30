import { IAddress, IGeocodeProvider } from '../../models/address'
import { mapboxGeocode } from './mapbox-provider'
import { googleMapsGeocode } from './googlemaps-provider'
import config from '../../../config'

const { GOOGLE_PROVIDER_PRIORITY, MAPBOX_PROVIDER_PRIORITY } = config

export async function geocode(address: string): Promise<IAddress> {
  const providers: IGeocodeProvider[] = [
    {
      geocode: googleMapsGeocode,
      priority: Number(GOOGLE_PROVIDER_PRIORITY),
    },
    {
      geocode: mapboxGeocode,
      priority: Number(MAPBOX_PROVIDER_PRIORITY),
    },
  ]
    .filter((provider) => provider.priority)
    .sort((a, b) => b.priority - a.priority)

  return await providers.reduce(async (acc: never, provider) => {
    if (!acc) {
      return provider.geocode(address)
    }
    return acc
  }, null)
}
