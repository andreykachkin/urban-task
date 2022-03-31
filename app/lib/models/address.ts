import { Feature, Point } from 'geojson'
import { AddressType, GeocodeResult, GeocodingAddressComponentType } from '@googlemaps/google-maps-services-js'

export class Address {
  constructor(address) {
    this.address1 = address.address1
    this.address2 = address.address2
    this.city = address.city
    this.lat = address.lat
    this.lng = address.lng
    this.postcode = address.postcode
  }

  public address1?: string
  public address2?: string
  public city?: string
  public lat: number
  public lng: number
  public postcode?: string

  static mapMapboxAddress = (mapboxAddress: IMapboxResult) =>
    new Address({
      address1: mapboxAddress.place_name,
      address2: mapboxAddress.properties.address,
      city: mapboxAddress.context.find((x) => x.id.includes('place'))?.text,
      postcode: mapboxAddress.context.find((x) => x.id.includes('postcode'))?.text,
      lat: (mapboxAddress.geometry as Point).coordinates[1],
      lng: (mapboxAddress.geometry as Point).coordinates[0],
    })

  static mapGoogleAddress = (googleAddress: Partial<GeocodeResult>) =>
    new Address({
      address1: googleAddress.address_components.find((x) => x.types.includes(AddressType.route))?.long_name,
      address2: googleAddress.address_components.find((x) => x.types.includes(AddressType.neighborhood))?.long_name,
      city: googleAddress.address_components.find((x) => x.types.includes(GeocodingAddressComponentType.postal_town))
        ?.long_name,
      lat: googleAddress.geometry.location.lat,
      lng: googleAddress.geometry.location.lng,
    })
}

export interface IAddressWithServiceArea extends Address {
  serviceArea: string
}

export interface IMapboxResultContextItem {
  id: string
  text: string
}

export interface IMapboxResult extends Feature {
  context: IMapboxResultContextItem[]
  place_name: string
}

export interface IGeocodeProvider {
  priority: number
  geocode(address: string): Promise<Address>
}
