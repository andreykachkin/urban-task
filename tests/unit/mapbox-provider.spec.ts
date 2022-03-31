import { expect } from 'chai';
import { IMapboxResult } from '../../app/lib/models/address';
import { Address } from '../../app/lib/models/address'

const mapboxTestAddress: IMapboxResult = {
  id: 'place.10094022391318790',
  type: 'Feature',
  properties: { wikidata: 'Q353307', address: 'test_address' },
  place_name: 'Addlestone, Surrey, England, United Kingdom',
  geometry: { type: 'Point', coordinates: [ -0.4901, 51.3695 ] },
  context: [
    {
      id: 'place.2914015507466560',
      text: 'Test city'
    },
    {
      id: 'district.2914015507466560',
      text: 'Surrey'
    },
    {
      id: 'region.13483278848453920',
      text: 'England'
    },
    {
      id: 'country.12405201072814600',
      text: 'United Kingdom'
    },
  ]
}

describe('lib/coordinates/provider/mapbox-provider', () => {
  it('should convert mapbox response',  () => {
    const address = Address.mapMapboxAddress(mapboxTestAddress);
    expect(address).to.deep.eq({
      address1: 'Addlestone, Surrey, England, United Kingdom',
      address2: 'test_address',
      city: 'Test city',
      postcode: undefined,
      lat: 51.3695,
      lng: -0.4901,
    });
  });
});
