---
sidebar_position: 2
---

# Getting Started

## Installation

Install Super Validator using the following commands:

NPM:

```
npm install super-validator
```

Yarn:

```
yarn add super-validator
```

## Validate Single

Validate single allows you to validate single values. This can be used with any of the built in validators or you can create your own.

```
import Validator, { required } from "super-validator";

// No error the value is there.
const test1 = Validator.validateSingle("key", "test", required());
console.log(test1); // Output: null

// Error the value is undefined
const test2 = Validator.validateSingle(
  "TheNameOfTheKey",
  undefined,
  required()
);
console.log(test2); // Output: `TheNameOfTheKey` is required.
```

## Basic Schema Validation

Validates a object in accordance with the schema. You can read more about schemas (here) and validators (here). Also you can read about adding custom error messages here.

```
import Validator, { min, required } from "super-validator";

// This creates a schema for the object to validate. The key names must be the same as in the object you are validating.
const schema = {
  // You can use single validators.
  firstName: [required()], // Username is required.
  // You can also pass in a array of validators
  username: [required(), min(3)], // Username is required and must be a at least 3 characters.
};

// No errors obj has no errors.
const test1 = Validator.validateSchema(
  { firstName: "Name", username: "Username" },
  schema
);
console.log(test1); // Output: null

// Errors because obj is missing firstName and username is too short.
const test2 = Validator.validateSchema({ username: "ta" }, schema);
console.log(test2); // { firstName: [ '`firstName` is required.' ] }, { username: [ '`username` is shorter than `3`.' ] } ]
```
