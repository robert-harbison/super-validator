"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[657],{3227:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return l},contentTitle:function(){return o},metadata:function(){return d},toc:function(){return u},default:function(){return m}});var n=a(7462),r=a(3366),i=(a(7294),a(3905)),s=["components"],l={sidebar_position:3},o="Schema Validation",d={unversionedId:"schema-validation",id:"schema-validation",isDocsHomePage:!1,title:"Schema Validation",description:"Validation Schema",source:"@site/docs/schema-validation.md",sourceDirName:".",slug:"/schema-validation",permalink:"/super-validator/schema-validation",editUrl:"https://github.com/robert-harbison/super-validator/docs/schema-validation.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"defaultSidebar",previous:{title:"Getting Started",permalink:"/super-validator/"},next:{title:"Built in Validators",permalink:"/super-validator/built-in-validators"}},u=[{value:"Validation Schema",id:"validation-schema",children:[]},{value:"validateSchema()",id:"validateschema",children:[{value:"Params",id:"params",children:[]}]},{value:"Important Notes",id:"important-notes",children:[]},{value:"Basic Schema Validation",id:"basic-schema-validation",children:[]}],c={toc:u};function m(e){var t=e.components,a=(0,r.Z)(e,s);return(0,i.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"schema-validation"},"Schema Validation"),(0,i.kt)("h2",{id:"validation-schema"},"Validation Schema"),(0,i.kt)("p",null,"Schemas are a object representing the keys and their respective validators to use when validating a object."),(0,i.kt)("p",null,"The key in a schema will be the name of the key in the object to validate. Each key should have a value of a validator or a array of validators."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'const schema = {\n  test1: required(), // test1 is required.\n  test2: [required(), min(3)], // test2 is required and must be a at least 3 characters.\n  nested: {\n    test1: required(), // "nested.test1" is required.\n    test2: [required(), min(3)], // "nested.test2" is required and must be a at least 3 characters.\n  },\n};\n')),(0,i.kt)("p",null,"Here is the format the errors will be returned in (This assumes every field is not provided):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"{\n    test1: 'Error Message (Required)',\n    test2: ['Error Message (Required)', 'Error Message (Min)'],\n    nested: {\n        test1: 'Error Message (Required)',\n        test2: ['Error Message (Required)', 'Error Message (Min)'],\n    }\n}\n")),(0,i.kt)("h2",{id:"validateschema"},"validateSchema()"),(0,i.kt)("p",null,"Validates a custom object according to a schema and returns the errors for each field."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"validateSchema(toValidateObj: GenericObject, schema: ValidatorSchema)\n")),(0,i.kt)("h3",{id:"params"},"Params"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"toValidateObj"),(0,i.kt)("td",{parentName:"tr",align:null},"{ ","[key: string]",": any }"),(0,i.kt)("td",{parentName:"tr",align:null},"The object containing the keys and values to validate against.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"schema"),(0,i.kt)("td",{parentName:"tr",align:null},"ValidatorSchema"),(0,i.kt)("td",{parentName:"tr",align:null},"The schema to use to validate the object.")))),(0,i.kt)("h2",{id:"important-notes"},"Important Notes"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"When validating a schema if you pass in a single function it will return a single string error. If you pass a array of validators it will return a array of errors."),(0,i.kt)("li",{parentName:"ul"},"If there is a key in the object to validate that is not in the schema it will be ignored.")),(0,i.kt)("h2",{id:"basic-schema-validation"},"Basic Schema Validation"),(0,i.kt)("p",null,"This is a basic example of validating a schema. For more advanced usage please look at the links below."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/super-validator/schema-validation"},"Schema Validation")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/super-validator/custom-validators"},"Custom Validators")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/super-validator/addon-validators"},"Addon Validators")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/super-validator/configuration"},"Custom Messages"))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'import { validateSchema, min, required } from "super-validator";\n\n// This creates a schema for the object to validate. The key names must be the same as in the object you are validating.\nconst schema = {\n  // You can use single validators.\n  test1: required(), // test1 is required.\n  // You can also pass in a array of validators. NOTE: When doing this the error will be\n  // returned in a array this is in case there are multiple errors.\n  test2: [required(), min(3)], // test2 is required and must be a at least 3 characters.\n  nested: {\n    test1: required(),\n    test2: required(),\n  },\n};\n\n// No errors obj has no errors.\nconst test1 = validateSchema(\n  {\n    test1: "Test1",\n    test2: "Test2",\n    nested: {\n      test1: 1,\n      test2: 2,\n    },\n  },\n  schema\n);\nconsole.log(test1); // Output: null\n\n// Errors because obj is missing some values.\nconst test2 = validateSchema(\n  {\n    test1: "Test1",\n    nested: {\n      test1: "Test",\n    },\n  },\n  schema\n);\nconsole.log(test2);\n// Output:\n// {\n//   test2: [ \'`test2` is required.\' ], // Notice that this is a array since in the schema a array was passed.\n//   nested: {\n//     test2: \'`test2` is required.\'\n//   }\n// }\n')))}m.isMDXComponent=!0}}]);