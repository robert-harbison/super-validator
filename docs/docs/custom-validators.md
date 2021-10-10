---
sidebar_position: 6
---

# Custom Validators

## createValidator(cb: (fieldKey: string, value: unknown) => ErrorReturnTypes, customMessage?: string)

Creates a custom validator function that can be passed into a schema.

### Params

| Name          | Type                                                   | Description                                                                                                                                                                                                |
| ------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cb            | (fieldKey: string, value: unknown) => ErrorReturnTypes | A callback that gets called to validate a value. The fieldKey is the name of the field in the schema, the value is the value to validate. You can return any of the error types (null, string or string[]) |
| customMessage | string, undefined                                      | This is the custom message to use if there is a error. It will override kind of error you return in the callback.                                                                                          |

## Examples

### Basic Custom Validator

This is the most basic way to create a custom validator however it has one main limitation of not using a user provided overriding error message. This will return a error if the value is true.

```
import { createValidator } from "super-validator";

export const customValidator = () => createValidator((fieldKey, value) => {
    // Validation Logic
    if (value === true) {
        return `This is a error for: '${fieldKey}'`; // If there is a error return a string. You can also use the fieldName in the error message.
    }
    return null; // If validation passes return null.
});
```

### Custom Validator With User Provided Message

This allows a user to pass in a message when creating a schema. NOTE: This will override any error message(s) returned from the validator.

```
import { createValidator } from "super-validator";

export const customValidator = (customMessage) => createValidator((fieldKey, value) => {
    // Validation Logic
    if (value === true) {
        return `This is a error for: '${fieldKey}'`;
    }
    return null; // If validation passes return null.
}, customMessage);
```

### Custom Validator Multiple Errors

To use return multiple errors you just need to return a array instead of a string for the error(s). It's important to note that in this example if a user passes a customMessage it will override any array you return and only return the provided string.

```
import { createValidator } from "super-validator";

export const customValidator = (customMessage) => createValidator((fieldKey, value) => {
    const errors = [];
    if (value === true) {
        errors.push("This is a error!"); // Add this error to array.
    }

    if (value === true) {
        errors.push("This is a 2nd error!"); // Add this 2nd error to array.
    }
    return errors; // Return the array if it is empty there are no errors.
  }, customMessage);
```

### Custom Validator With Parameters.

You can also take in custom parameters when making a validator. In the below example you will pass in a number (n) that is used to check if the value is greater than n.

```
import { createValidator } from "super-validator";

export const customValidator = (greaterThan, customMessage) => createValidator((fieldKey, value) => {
    if (value <= greaterThan) {
        return `'${fieldKey}' has to be greater than ${greaterThan}.`;
    }
    return null;
}, customMessage);
```

### Typescript

Here is a example of a validator in Typescript that will return a error if the value is less than the provided value.

```
import { createValidator, ErrorReturnTypes, ValidatorFunction } from "super-validator";

export const min = (minValue: number, customMessage?: string): ValidatorFunction<number> =>
    createValidator<number>((fieldKey: string, value: number): ErrorReturnTypes => {
	    if (value < minValue) {
	    	return `${value} is less than ${minValue}`
	    }
	    return null
    }, customMessage)
```
