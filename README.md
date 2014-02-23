Framework7
==========

Full Featured HTML Framework For Building iOS7 Apps

## Attention!

Framework7 is on early development stage, so many things may be changed and sorted in a short time.

## Getting Started
  * Clone/download this repo
  * You can start build your App from changing Kitchen Sink for your needs, or to start from a clean template from `dist/` folder

## Kitchen Sink

Framework 7 JS and CSS files in Kitchen Sink are temporary linked to `build/` to make development process easier on this stage. So to make it work you need to build Framework7 (see Build section) or to re-link JS and CSS files to `dist/` folder.

## Dist vs Build versions

On production use files (JS and CSS) only from `dist/` folder, where will be the most stable versions. Build/ folder is only for development purpose

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

The results is available in `build/` folder.

## Dist version

After you have made build:

```
$ grunt dist
```

Distributable version will available in `dist/` folder.

## Docs

Coming soon...