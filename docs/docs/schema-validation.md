---
sidebar_position: 3
---

# Schema Validation

## Validation Schema

Schemas are a object representing the keys and their respective validators to use when validating a object.

The key in a schema will be the name of the key in the object to validate. Each key should have a value of a validator or a array of validators.

```
const schema = {
  test1: required(), // test1 is required.
  test2: [required(), min(3)], // test2 is required and must be a at least 3 characters.
  nested: {
    test1: required(), // "nested.test1" is required.
    test2: [required(), min(3)], // "nested.test2" is required and must be a at least 3 characters.
  },
};
```

Here is the format the errors will be returned in (This assumes every field is not provided):

```
{
    test1: 'Error Message (Required)',
    test2: ['Error Message (Required)', 'Error Message (Min)'],
    nested: {
        test1: 'Error Message (Required)',
        test2: ['Error Message (Required)', 'Error Message (Min)'],
    }
}
```

## validateSchema()

Validates a custom object according to a schema and returns the errors for each field.

```
validateSchema(toValidateObj: GenericObject, schema: ValidatorSchema)
```

### Params

| Name          | Type                   | Description                                                    |
| ------------- | ---------------------- | -------------------------------------------------------------- |
| toValidateObj | { [key: string]: any } | The object containing the keys and values to validate against. |
| schema        | ValidatorSchema        | The schema to use to validate the object.                      |

## Important Notes

-   When validating a schema if you pass in a single function it will return a single string error. If you pass a array of validators it will return a array of errors.
-   If there is a key in the object to validate that is not in the schema it will be ignored.

## Basic Schema Validation

This is a basic example of validating a schema. For more advanced usage please look at the links below.

-   [Schema Validation](schema-validation.md)
-   [Custom Validators](custom-validators.md)
-   [Addon Validators](addon-validators.md)
-   [Custom Messages](configuration.md)

```
import { validateSchema, min, required } from "super-validator";

// This creates a schema for the object to validate. The key names must be the same as in the object you are validating.
const schema = {
  // You can use single validators.
  test1: required(), // test1 is required.
  // You can also pass in a array of validators. NOTE: When doing this the error will be
  // returned in a array this is in case there are multiple errors.
  test2: [required(), min(3)], // test2 is required and must be a at least 3 characters.
  nested: {
    test1: required(),
    test2: required(),
  },
};

// No errors obj has no errors.
const test1 = validateSchema(
  {
    test1: "Test1",
    test2: "Test2",
    nested: {
      test1: 1,
      test2: 2,
    },
  },
  schema
);
console.log(test1); // Output: null

// Errors because obj is missing some values.
const test2 = validateSchema(
  {
    test1: "Test1",
    nested: {
      test1: "Test",
    },
  },
  schema
);
console.log(test2);
// Output:
// {
//   test2: [ '`test2` is required.' ], // Notice that this is a array since in the schema a array was passed.
//   nested: {
//     test2: '`test2` is required.'
//   }
// }
```
