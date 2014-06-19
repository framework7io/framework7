[![Stories in Ready](https://badge.waffle.io/nolimits4web/framework7.png?label=ready&title=Ready)](https://waffle.io/nolimits4web/framework7)
[![Build Status](https://travis-ci.org/nolimits4web/Framework7.svg?branch=master)](https://travis-ci.org/nolimits4web/Framework7)

Framework7
==========

Full Featured HTML Framework For Building iOS7 Apps

## Attention!

Framework7 is on early development stage, so many things may be changed and sorted in a short time.

## Getting Started
  * Clone/download this repo
  * Start building your App from changing Kitchen Sink, or from a clean template from `dist/` folder

## Server

Because Framework7 uses Ajax for navigation between pages you will need a server. So to make it work you should put dist folder (or Kitchen Sink) on a server. Or, as an option, you may use Grunt's server. Just run:

```
$ grunt server
```

  * Kitchen Sink will be available on `http://localhost:3000/kitchen-sink/`
  * Dist - on `http://localhost:3000/dist/`

## Kitchen Sink

Framework7' JS and CSS files in Kitchen Sink are temporary linked to `build/` to make development process easier on this stage. So to make it work you need to build Framework7 (see Build section) or to re-link JS and CSS files to `dist/` folder.

## Dist vs Build versions

On production use files (JS and CSS) only from `dist/` folder, there will be the most stable versions, `build/` folder is only for development purpose

## Build

Framework7 uses `grunt` to build a development (build) and dist versions.

First you need to have `grunt-cli` which you should install globally.

```
$ npm install -g grunt-cli
```

Then install all dependencies, in repo's root:

```
$ npm install
$ grunt build
```

The result is available in `build/` folder.

## Dist/Release

After you have made build:

```
$ grunt dist
```

Distributable version will available in `dist/` folder.

## Contributing

All changes should be commited to `src/` files. Framework7 uses LESS for CSS compliations, and concatenated JS files (look at Gruntfile.js for concat files order)

## Forum

If you have questions about Framework7 or want to help others you are welcome to special forum at http://www.idangero.us/framework7/forum/

## Docs

Documentation available at http://idangero.us/framework7/docs/