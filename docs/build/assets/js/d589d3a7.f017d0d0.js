"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[162],{9390:function(t,e,a){a.r(e),a.d(e,{frontMatter:function(){return o},contentTitle:function(){return d},metadata:function(){return l},toc:function(){return u},default:function(){return p}});var n=a(7462),i=a(3366),s=(a(7294),a(3905)),r=["components"],o={sidebar_position:1,slug:"/"},d="Getting Started",l={unversionedId:"getting-started",id:"getting-started",isDocsHomePage:!1,title:"Getting Started",description:"Super Validator provides a customizable solution to validating schemas for both frontend and backend projects. While this library does include some basic validators it is intended that you create your own or use one of our addon libraries.",source:"@site/docs/getting-started.md",sourceDirName:".",slug:"/",permalink:"/super-validator/",editUrl:"https://github.com/robert-harbison/super-validator/docs/getting-started.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,slug:"/"},sidebar:"defaultSidebar",next:{title:"Schema Validation",permalink:"/super-validator/schema-validation"}},u=[{value:"Installation",id:"installation",children:[]},{value:"Basic Schema Validation",id:"basic-schema-validation",children:[]},{value:"Addons",id:"addons",children:[]}],c={toc:u};function p(t){var e=t.components,a=(0,i.Z)(t,r);return(0,s.kt)("wrapper",(0,n.Z)({},c,a,{components:e,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"getting-started"},"Getting Started"),(0,s.kt)("p",null,"Super Validator provides a customizable solution to validating schemas for both frontend and backend projects. While this library does include some basic validators it is intended that you create your own or use one of our addon libraries."),(0,s.kt)("h2",{id:"installation"},"Installation"),(0,s.kt)("p",null,"Install Super Validator using the following commands (This library was written in typescript and includes type definitions):"),(0,s.kt)("p",null,"NPM:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"npm install super-validator\n")),(0,s.kt)("p",null,"Yarn:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"yarn add super-validator\n")),(0,s.kt)("h2",{id:"basic-schema-validation"},"Basic Schema Validation"),(0,s.kt)("p",null,"This is a basic example of validating a schema. For more advanced usage please look at the links below."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/super-validator/schema-validation"},"Schema Validation")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/super-validator/custom-validators"},"Custom Validators")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/super-validator/addon-validators"},"Addon Validators")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/super-validator/configuration"},"Configuration"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},'import { validateSchema, min, required } from "super-validator";\n\n// This creates a schema for the object to validate. The key names must be the same as in the object you are validating.\nconst schema = {\n  // You can use single validators.\n  test1: required(), // test1 is required.\n  // You can also pass in a array of validators. NOTE: When doing this the error will be\n  // returned in a array this is in case there are multiple errors.\n  test2: [required(), min(3)], // test2 is required and must be a at least 3 characters.\n  nested: {\n    test1: required(),\n    test2: required(),\n  },\n};\n\n// No errors obj has no errors.\nconst test1 = validateSchema(\n  {\n    test1: "Test1",\n    test2: "Test2",\n    nested: {\n      test1: 1,\n      test2: 2,\n    },\n  },\n  schema\n);\nconsole.log(test1); // Output: null\n\n// Errors because obj is missing some values.\nconst test2 = validateSchema(\n  {\n    test1: "Test1",\n    nested: {\n      test1: "Test",\n    },\n  },\n  schema\n);\nconsole.log(test2);\n// Output:\n// {\n//   test2: [ \'`test2` is required.\' ], // Notice that this is a array since in the schema a array was passed.\n//   nested: {\n//     test2: \'`test2` is required.\'\n//   }\n// }\n')),(0,s.kt)("h2",{id:"addons"},"Addons"),(0,s.kt)("p",null,"[COMING SOON]"))}p.isMDXComponent=!0}}]);