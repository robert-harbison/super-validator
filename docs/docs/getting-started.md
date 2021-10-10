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
