import { expect } from 'chai';
import {
  GeocodeResult,
  LocationType,
  AddressType,
  GeocodingAddressComponentType
} from "@googlemaps/google-maps-services-js";
import { mapAddress } from '../../app/lib/coordinates/providers/googlemaps-provider';

const googleMapsTestAddress: Partial<GeocodeResult> = {
  address_components: [
    {
      long_name: 'White Bear Yard',
      short_name: 'White Bear Yard',
      types: [AddressType.route]
    },
    { long_name: 'London', short_name: 'London', types: [AddressType.neighborhood] },
    {
      long_name: 'Greater London',
      short_name: 'Greater London',
      types: [GeocodingAddressComponentType.postal_town]
    },
    { long_name: 'England', short_name: 'England', types: [] },
    { long_name: 'United Kingdom', short_name: 'GB', types: [] },
    { long_name: 'EC1R 5DP', short_name: 'EC1R 5DP', types: [] }
  ],
  formatted_address: 'White Bear Yard, London EC1R 5DP, UK',
  geometry: {
    bounds: { northeast: { lat: 51.5222691, lng: -0.1098115 }, southwest: { lat: 51.5222691, lng: -0.1098115 } },
    location: { lat: 51.5222691, lng: -0.1098115 },
    location_type: LocationType.GEOMETRIC_CENTER,
    viewport: { northeast: { lat: 51.5222691, lng: -0.1098115 }, southwest: { lat: 51.5222691, lng: -0.1098115 } }
  },
  place_id: 'ChIJ5XwA5k4bdkgRJ15fCYrsX3A',
  types: [AddressType.route] 
}

describe('lib/coordinates/provider/googlemaps-provider', () => {
  it('should convert googleMaps response',  () => {
    const address = mapAddress(googleMapsTestAddress);
    expect(address).to.deep.eq({
      address1: 'White Bear Yard',
      address2: 'London',
      city: 'Greater London',
      lat: 51.5222691,
      lng: -0.1098115,
    });
  });
});
