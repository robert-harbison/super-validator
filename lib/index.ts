import { validateSchema } from './core/Validator'

import required from './validators/Required'
import min from './validators/Min'
import max from './validators/Max'
import doesMatch from './validators/DoesMatch'
import { setConfig } from './core/Config'

export { validateSchema, required, min, max, doesMatch, setConfig }
