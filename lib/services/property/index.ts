import { propertyQueries } from './property-queries'
import { propertyMutations } from './property-mutations'
import { unitService } from './unit-service'

export const propertyService = {
  ...propertyQueries,
  ...propertyMutations,
  units: unitService
}
