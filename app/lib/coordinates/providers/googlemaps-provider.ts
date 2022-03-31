import { Client } from '@googlemaps/google-maps-services-js'

import config from '../../../config'
import { Address } from '../../models/address'

const { GOOGLE_MAPS_KEY } = config

const googlemapsClient = new Client({})

export async function googleMapsGeocode(address: string): Promise<Address> {
  const googleAddress = await googlemapsClient.geocode({
    params: {
      address,
      key: GOOGLE_MAPS_KEY,
    },
  })

  if (googleAddress.data && googleAddress.data.results.length) {
    const [result] = googleAddress.data.results
    return Address.mapGoogleAddress(result)
  }

  return null
}
