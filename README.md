<a href="https://www.patreon.com/vladimirkharlampidi"><img src="https://cdn.framework7.io/i/support-badge.png" height="20"></a>
[![Join the chat at https://gitter.im/nolimits4web/Framework7](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/nolimits4web/Framework7)
[![Build Status](https://travis-ci.org/framework7io/Framework7.svg?branch=master)](https://travis-ci.org/framework7io/Framework7)
[![devDependency Status](https://david-dm.org/framework7io/framework7/dev-status.svg)](https://david-dm.org/framework7io/framework7#info=devDependencies)

Framework7
==========

[![Greenkeeper badge](https://badges.greenkeeper.io/framework7io/Framework7.svg)](https://greenkeeper.io/)

Full Featured Mobile HTML Framework For Building iOS & Android Apps

## Getting Started
  * [Getting Started Guide](http://www.idangero.us/framework7/get-started/)
  * Clone/download this repo
  * Start building your App from changing Kitchen Sink, or using a clean template.

## Build

Framework7 uses `gulp` and `rollup` to build a development (build) and productuin (dist) versions.

First you need to have `gulp-cli` which you should install globally.

```
$ npm install --global gulp
```

Then install all dependencies, in repo's root:

```
$ npm install
```

And build development version of Framework7:
```
$ npm run build:dev
```

The result is available in `build/` folder.

## Dist/Release

To build production version of Framework7:

```
$ npm run build:prod
```

Production version will be available in `dist/` folder.

## Kitchen Sink

Kitchen Sink uses Ajax for navigation between pages so you will need a server.

Run Kitchen Sink with development environment (development version will be built first):

```
$ npm run dev
```

Run Kitchen Sink with production environment (configured to scripts and styles from `dist/` folder):

```
$ npm run prod
```

## Contributing

All changes should be commited to `src/` files. Framework7 uses LESS for CSS compliations, and ES modules JS files.

The project uses [.editorconfig](http://editorconfig.org/) to define the coding style of each file. We recommend that you install the Editor Config extension for your preferred IDE.

If you want to help in Framework7 development and make it event better visit this page: http://framework7.io/contribute/

## Forum

If you have questions about Framework7 or want to help others you are welcome to special forum at http://forum.framework7.io/

## Docs

Documentation available at http://framework7.io/docs/

## Tutorials

Tutorials available at http://framework7.io/tutorials/

## Showcase

Appstore apps made with Framework7: http://framework7.io/showcase/

## v1

Old v1 version of Framework7 is still available at [v1 branch](https://github.com/framework7io/Framework7/tree/v1)
