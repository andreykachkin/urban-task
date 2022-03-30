import axios from 'axios'
import { Point } from 'geojson';
import {
  AddressType,
  Client,
  GeocodeResult,
  GeocodingAddressComponentType
} from '@googlemaps/google-maps-services-js';

import config from '../../../config';
import { IAddress, IMapboxResult } from '../../models/address';

const { GOOGLE_MAPS_KEY, MAPBOX_LIMIT, MAPBOX_ACCESS_TOKEN, MAPBOX_COUNTRIES, MAPBOX_URL } = config;

const googlemapsClient = new Client({});

export async function geocode(address: string): Promise<IAddress> {
  const googleAddress = await googlemapsClient.geocode({
    params: {
      address,
      key: GOOGLE_MAPS_KEY,
    },
  });

  if (googleAddress.data) {
    const [result] = googleAddress.data.results;
    return mapAddress(result);
  }

  const { data: mapboxData } = await axios
    .get(`${MAPBOX_URL}/${address}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=${MAPBOX_LIMIT}&country=${MAPBOX_COUNTRIES}`)
  
  if (!mapboxData.features.length) {
    return null
  }

  return mapMapboxAddress(mapboxData.features[0]);
}

function mapAddress(googleAddress: GeocodeResult) {
  return {
    address1: googleAddress.address_components.find((x) =>
      x.types.includes(AddressType.route),
    )?.long_name,
    address2: googleAddress.address_components.find((x) =>
      x.types.includes(AddressType.neighborhood),
    )?.long_name,
    city: googleAddress.address_components.find((x) =>
      x.types.includes(GeocodingAddressComponentType.postal_town),
    )?.long_name,
    lat: googleAddress.geometry.location.lat,
    lng: googleAddress.geometry.location.lng,
  };
}

function mapMapboxAddress(mapboxAddress: IMapboxResult) {
  return {
    address1: mapboxAddress.place_name,
    address2: mapboxAddress.properties.address,
    city: mapboxAddress.context.find((x) =>
      x.id.includes('place')
    )?.text,
    postcode: mapboxAddress.context.find((x) =>
      x.id.includes('postcode')
    )?.text,
    lat: (mapboxAddress.geometry as Point).coordinates[1],
    lng: (mapboxAddress.geometry as Point).coordinates[0],
  };
}
