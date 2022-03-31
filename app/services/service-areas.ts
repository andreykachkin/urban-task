import { readFileSync } from 'fs'
import { GeoJSON } from 'geojson'

export function getGeoJson() {
  const data = readFileSync('./static/formatted-data.json')

  return JSON.parse(data.toString()) as GeoJSON
}
