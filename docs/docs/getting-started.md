---
sidebar_position: 2
---

# Getting Started

## Installation

Install Super Validator using the following commands (This library was written in typescript and includes type definitions):

NPM:

```
npm install super-validator
```

Yarn:

```
yarn add super-validator
```

## Basic Schema Validation

This is a basic example of validating a schema. For more advanced usage please look at the links below.

-   [Schema Validation](schema-validation.md)
-   [Custom Validators](custom-validators.md)
-   Addon Validators
-   [Configuration](configuration.md)

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

## Addons
