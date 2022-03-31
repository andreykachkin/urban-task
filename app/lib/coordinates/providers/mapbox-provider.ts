import axios from 'axios'

import config from '../../../config'
import { Address } from '../../models/address'

const { MAPBOX_LIMIT, MAPBOX_ACCESS_TOKEN, MAPBOX_COUNTRIES, MAPBOX_URL } = config

export async function mapboxGeocode(address: string): Promise<Address> {
  const { data: mapboxData } = await axios.get(
    `${MAPBOX_URL}/${address}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=${MAPBOX_LIMIT}&country=${MAPBOX_COUNTRIES}`,
  )

  if (!mapboxData.features.length) {
    return null
  }

  return Address.mapMapboxAddress(mapboxData.features[0])
}
