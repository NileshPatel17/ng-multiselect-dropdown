## step to publish

1.  yarn build:lib
2.  navigate to dist-lib folder
3.  mark private to false (package.json)
4.  login to npm registry (npm login)
5.  yarn publish
6.  yarn deployOnly

## To publish the beta version just run the following command;

`npm publish --tag beta`

## NPM install with tags

Consumers usually install our library by running the standard npm install command:

`npm install —-save libraryname`

This command will fetch the version associated with the latest tag. Only the version labeled to latest is shown on npmjs.com.

But there’s also the possibility to install a version based on a tag. Beta users can install the brand new version with

`npm install — save libraryname@beta.`

## Angular Multiselect Dropdown

[![npm version](https://img.shields.io/npm/v/ng-multiselect-dropdown.svg)](https://www.npmjs.com/package/ng-multiselect-dropdown)
[![downloads](https://img.shields.io/npm/dt/ng-multiselect-dropdown.svg)](https://www.npmjs.com/package/ng-multiselect-dropdown)
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/ng-multiselect-dropdown)
[![npm](https://img.shields.io/npm/dw/localeval.svg)](https://www.npmjs.com/package/ng-multiselect-dropdown)
