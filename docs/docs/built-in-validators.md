---
sidebar_position: 7
---

# Built in Validators

Super validator only supplies a few basic validators. You can take a look into making your own or using addons for more validators.

**If you have suggestions for more validators please create a issue here.**

## Required

Makes a value required. This will fail if the value is equal to null or undefined.

```
import { required } from 'super-validator'

required()
// Or
required('Custom Error Message')
```

### Params

| Name          | Type              | Description                                       |
| ------------- | ----------------- | ------------------------------------------------- |
| customMessage | string, undefined | Custom message to override any validation errors. |

## Min

If the value to validate is a number it will check to make sure it is equal to or greater than x. If the value is a string it will ensure the length of the string is at least x characters long.

### Params

| Name          | Type              | Description                                                                               |
| ------------- | ----------------- | ----------------------------------------------------------------------------------------- |
| minValue      | number            | The minimum value if the input is a number or the minimum length if a string is the value |
| customMessage | string, undefined | Custom message to override any validation errors.                                         |

```
import { min } from 'super-validator'

min(5)
// Or
min(5, 'Custom Error Message')
```

## Max

If the value to validate is a number it will check to make sure it is less than or equal to x. If the value is a string it will ensure the length of the string is not longer than x.

### Params

| Name          | Type              | Description                                                                                                |
| ------------- | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| maxValue      | number            | The maximum value the input can be if the value is a number or the maximum length if a string is the value |
| customMessage | string, undefined | Custom message to override any validation errors.                                                          |

```
import { max } from 'super-validator'

max(5)
// Or
max(5, 'Custom Error Message')
```

## TypeOf

If the value to validate is a number it will check to make sure it is less than or equal to x. If the value is a string it will ensure the length of the string is not longer than x.

### Params

| Name          | Type              | Description                                                                                    |
| ------------- | ----------------- | ---------------------------------------------------------------------------------------------- |
| type          | string            | The type the value should be. If the value has a type of anything else it will return a error. |
| customMessage | string, undefined | Custom message to override any validation errors.                                              |

```
import { typeOf } from 'super-validator'

typeOf('string')
// Or
typeOf('string', 'Custom Error Message')
```

## Equals

Checks if the value is equal to another this can be used with both strict and non strict checks.

### Params

| Name          | Type              | Description                                                                 | Default |
| ------------- | ----------------- | --------------------------------------------------------------------------- | ------- |
| toMatch       | unknown           | The object to match to the value provided.                                  |
| strict        | boolean           | If we should use strict equals or not. (This should be true in most cases.) | true    |
| customMessage | string, undefined | Custom message to override any validation errors.                           |         |

```
import { equal } from 'super-validator'

equal(true)
// Or
equal('test')
// Or
equal(6)
// Or
equal(null, false)
// Or
typeOf('test', true, 'Custom Error Message')
```
