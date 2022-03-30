import axios from 'axios'
import { Point } from 'geojson'

import config from '../../../config'
import { IAddress, IMapboxResult } from '../../models/address'

const { MAPBOX_LIMIT, MAPBOX_ACCESS_TOKEN, MAPBOX_COUNTRIES, MAPBOX_URL } = config

export function mapMapboxAddress(mapboxAddress: IMapboxResult) {
  return {
    address1: mapboxAddress.place_name,
    address2: mapboxAddress.properties.address,
    city: mapboxAddress.context.find((x) => x.id.includes('place'))?.text,
    postcode: mapboxAddress.context.find((x) => x.id.includes('postcode'))?.text,
    lat: (mapboxAddress.geometry as Point).coordinates[1],
    lng: (mapboxAddress.geometry as Point).coordinates[0],
  }
}

export async function mapboxGeocode(address: string): Promise<IAddress> {
  const { data: mapboxData } = await axios.get(
    `${MAPBOX_URL}/${address}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=${MAPBOX_LIMIT}&country=${MAPBOX_COUNTRIES}`,
  )

  if (!mapboxData.features.length) {
    return null
  }

  return mapMapboxAddress(mapboxData.features[0])
}
