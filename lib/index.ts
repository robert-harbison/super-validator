import { validateSchema } from './core/Validator'

import required from './validators/Required'
import min from './validators/Min'
import max from './validators/Max'
import typeOf from './validators/TypeOf'
import equals from './validators/Equals'
import { setConfig } from './core/Config'
import { createValidator } from './utils/ValidatorUtils'

export { validateSchema, required, min, max, typeOf, equals, setConfig, createValidator }
