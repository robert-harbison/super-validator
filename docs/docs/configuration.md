---
sidebar_position: 5
---

# Configuration

You can edit the configuration using `setConfig`, you should call this as early in your application as possible. Currently this will only allow you to change the global language for the built in validators. In the future this will allow you to configure other parts of the library and custom validator messages.

# Language

In the case below we are going to set the error message for the 'required' validator:

```
import {setConfig} from 'super-validator'

setConfig({
    language: {
        required: 'NEW REQUIRED MESSAGE!'
    }
})
```

## Options

```
// All language configs.
language: {
	minString: string // The message to give when the min validator fails for a string.
	minNumber: string // The message to give when the min validator fails for a number.
	maxString: string // The message to give when the max validator fails for a string.
	maxNumber: string // The message to give when the max validator fails for a number.
	equals: string // The message to give when the equals validator fails.
	required: string // The message to give when the required validator fails.
	typeOf: string // The message to give when the typeOf validator fails.
}
```

## Message Format

You can inject values into a error message to include parameters from the validation. In the message string you can '{paramIndex}' with in the string to inject a calue. `'Test value is: {0}'` will output `'Test value is: test'` assuming the value passed to the validator was `'test'`.

### Injection Values

| Key | Replaces With  |
| --- | -------------- |
| {0} | The fieldName. |
| {1} | The value.     |
