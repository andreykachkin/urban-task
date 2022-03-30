import { Feature } from 'geojson'

export interface IAddress {
  address1: string
  address2: string
  city: string
  lat: number
  lng: number
  postcode?: string
}

export interface IAddressWithServiceArea extends IAddress {
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
  geocode(address: string): Promise<IAddress>
}
