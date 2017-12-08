generator-webpack-typescript-library
=========================================

Yeoman generator for awesome typescript based libraries build with webpack.

## Installation

First, install yeoman, yarn and generator-webpack-typescript using npm.
```
npm install -g yo yarn generator-webpack-typescript-library
```

## Usage

Then generate your new project:
```
mkdir my-library
cd my-library
yo webpack-typescript-library
```

This generator will provide a setup with the the following npm scripts:

```
"start"             : "webpack-dev-server --config ./config/webpack.dev.js --inline --progress", 
"build"             : "npm run clean && npm run build:cjs && npm run build:esm && npm run build:umd",
"build:dev"         : "webpack --config ./config/webpack.dev.js --progress",
"build:cjs"         : "tsc --declaration true --declarationDir ./dist/types",
"build:esm"         : "tsc -m es6 --outDir ./dist/lib-esm",
"build:umd"         : "webpack --config ./config/webpack.prod.js --progress",
"test"              : "npm run lint && npm run test:unit",
"test:unit"         : "mocha --require ts-node/register --recursive ./test/**/*.spec.ts",
"test:unit:watch"   : "npm run test:unit -- --watch --watch-extensions ts",
"test:unit:coverage": "nyc npm run test:unit -- --require source-map-support/register",
"test:unit:ci"      : "nyc --reporter teamcity npm run test:unit --  --require source-map-support/register --reporter mocha-teamcity-reporter",
"lint"              : "tslint -c tslint.json './src/**/*.ts'",
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, please create an issue.

## Versioning

This project uses [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Sh4bbY/generator-webpack-typescript-library/tags). 

## Authors

* **[Sascha Bialon](https://github.com/Sh4bbY)** - *Initial work* 

See also the list of [contributors](https://github.com/Sh4bbY/generator-webpack-typescript-library/contributors) who participated in this project.
