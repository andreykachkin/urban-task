import { FeatureCollection, Polygon, Position, Feature } from 'geojson';
import pointInPolygon from '@turf/boolean-point-in-polygon';
import { getGeoJson } from '../orm/service-areas';

export function findServiceArea(lat: number, lng: number): string | null {
  const { features } = getGeoJson() as FeatureCollection;
  
  const district: Feature = features
    .find((feature) => pointInPolygon([lng, lat] as Position, feature.geometry as Polygon))

  return district ? district.properties.Name : null;
}
