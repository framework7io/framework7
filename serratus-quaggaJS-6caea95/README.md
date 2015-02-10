quaggaJS
========

- [Changelog](#changelog) (2015-01-21)

QuaggaJS is a barcode-scanner entirely written in JavaScript supporting real-time localization and decoding of 
various types of barcodes such as __EAN__ and __CODE128__. The library is also capable of using `getUserMedia` to get direct 
access to the user's camera stream. Although the code relies on heavy image-processing even recent smartphones are 
capable of locating and decoding barcodes in real-time.

Try some [examples](http://serratus.github.io/quaggaJS/examples) and check out the blog post 
([How barcode-localization works in QuaggaJS](http://www.oberhofer.co/how-barcode-localization-works-in-quaggajs/))
if you want to dive deeper into this topic.

![teaser][teaser_left]![teaser][teaser_right]


## Yet another barcode library?

This is not yet another port of the great [zxing][zxing_github] library, but more of an extension to it. 
This implementation features a barcode locator which is capable of finding a barcode-like pattern in an 
image resulting in an estimated bounding box including the rotation. Simply speaking, this reader is invariant 
to scale and rotation, whereas other libraries require the barcode to be aligned with the viewport.


## Requirements

In order to take full advantage of quaggaJS, the browser needs to support the `getUserMedia` API which is 
already implemented in recent versions of Firefox, Chrome and Opera. The API is also available on their 
mobile counterparts installed on Android. Safari and IE do not allow the access to the camera yet, neither 
on desktop, nor on mobile. You can check [caniuse][caniuse_getusermedia] for updates.

In cases where real-time decoding is not needed, or the platform does not support `getUserMedia` QuaggaJS is 
also capable of decoding image-files using the File API or other URL sources.

## Installation

Just clone the repository and include `dist/quagga.js` in your project. You can also build the library yourself 
by simply typing:

```console
> npm install
> grunt
```

## Usage

You can check out the [examples](http://serratus.github.io/quaggaJS/examples) to get an idea of how to use QuaggaJS.
Basically the library exposes the following API:

### Quagga.init(config, callback)

This method initializes the library for a given configuration `config` (see below) and invokes the `callback` when Quagga is ready to start. The initialization process also requests for camera access if real-time detection is configured.

```javascript
Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream"
    },
    decoder : {
      readers : ["code_128_reader"]
    }
  }, function() {
      console.log("Initialization finished. Ready to start");
      Quagga.start();
  });
```

### Quagga.start()

When the library is initialized, the `start()` method starts the video-stream and begins locating and decoding
the images.

### Quagga.stop()

If the decoder is currently running, after calling `stop()` the decoder does not process any more images. Additionally, if a camera-stream was requested upon initialization, this operation also disconnects the camera.

### Quagga.onProcessed(callback)

This method registers a `callback(data)` function that is called for each frame after the processing is done. The `data` object contains detailed information about the success/failure of the operation. The output varies, depending whether the detection and/or decoding were successful or not. 

### Quagga.onDetected(callback)

Registers a `callback(data)` function which is triggered whenever a barcode-pattern has been located and decoded
successfully. The passed `data` object contains information about the decoding process including the detected code which can be obtained by calling `data.codeResult.code`.

### Quagga.decodeSingle(config, callback)

In contrast to the calls described above, this method does not rely on `getUserMedia` and operates on a
single image instead. The provided callback is the same as in `onDetected` and contains the result `data`
object.

## <a name="resultobject">The result object</a>

The callbacks passed into `onProcessed`, `onDetected` and `decodeSingle` receive a `data` object upon execution. The `data` object contains the following information. Depending on the success, some fields may be `undefined` or just empty.

```javascript
{
  "codeResult": {
    "code": "FANAVF1461710",
    "start": 355,
    "end": 26,
    "codeset": 100,
    "startInfo": {
      "error": 1.0000000000000002,
      "code": 104,
      "start": 21,
      "end": 41
    },
    "decodedCodes": [{
      "code": 104,
      "start": 21,
      "end": 41
    },
    // stripped for brevity
    {
      "error": 0.8888888888888893,
      "code": 106,
      "start": 328,
      "end": 350
    }],
    "endInfo": {
      "error": 0.8888888888888893,
      "code": 106,
      "start": 328,
      "end": 350
    },
    "direction": -1
  },
  "line": [{
    "x": 25.97278706156836,
    "y": 360.5616435369468
  }, {
    "x": 401.9220519377024,
    "y": 70.87524989906444
  }],
  "angle": -0.6565217179979483,
  "pattern": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, /* ... */ 1],
  "box": [
    [77.4074243622672, 410.9288668804402],
    [0.050203235235130705, 310.53619724086366],
    [360.15706727788256, 33.05711026051813],
    [437.5142884049146, 133.44977990009465]
  ],
  "boxes": [
    [
      [77.4074243622672, 410.9288668804402],
      [0.050203235235130705, 310.53619724086366],
      [360.15706727788256, 33.05711026051813],
      [437.5142884049146, 133.44977990009465]
    ],
    [
      [248.90769330706507, 415.2041489551161],
      [198.9532321622869, 352.62160512937635],
      [339.546160777576, 240.3979259789976],
      [389.5006219223542, 302.98046980473737]
    ]
  ]
}
```

## Config

The default `config` object is set as followed:

```javascript
{
  inputStream: { name: "Live",
       type: "LiveStream",
       constraints: {
         width: 640,
         height: 480,
         facing: "environment"
       }
  },
  tracking: false,
  debug: false,
  controls: false,
  locate: true,
  numOfWorkers: 4,
  scriptName: 'quagga.js',
  visual: {
    show: true
  },
  decoder:{
    drawBoundingBox: false,
    showFrequency: false,
    drawScanline: true,
    showPattern: false,
    readers: [
      'code_128_reader'
    ]
  },
  locator: {
    halfSample: true,
    showCanvas: false,
    showPatches: false,
    showFoundPatches: false,
    showSkeleton: false,
    showLabels: false,
    showPatchLabels: false,
    showRemainingPatchLabels: false,
    boxFromPatches: {
      showTransformed: false,
      showTransformedBox: false,
      showBB: false
    }
  }
}
```

## Examples

The following example takes an image `src` as input and prints the result on the console. 
The decoder is configured to detect _Code128_ barcodes and enables the locating-mechanism for more robust results.

```javascript
Quagga.decodeSingle({
  readers: ['code_128_reader'],
  locate: true, // try to locate the barcode in the image
  src: '/test/fixtures/code_128/image-001.jpg' // or 'data:image/jpg;base64,' + data
}, function(result){
  console.log(result);
});
```

## Tests

Unit Tests can be run with [Karma][karmaUrl] and written using [Mocha][mochaUrl], [Chai][chaiUrl] and [SinonJS][sinonUrl]. Coverage reports are automatically generated in the coverage/ folder.

```console
> npm install
> grunt test
```
## Image Debugging

In case you want to take a deeper dive into the inner workings of Quagga, get to know the _debugging_ capabilities of the current implementation. The various flags exposed through the `config` object give you the abilily to visualize almost every step in the processing. Because of the introduction of the web-workers, and their restriction not to have access to the DOM, the configuration must be explicitly set to `config.numOfWorkers = 0` in order to work.

## <a name="changelog">Changelog</a>

### 2015-01-21
- Features
  - Added support for web-worker (using 4 workers as default, can be changed through `config.numOfWorkers`)
  - Due to the way how web-workers are created, the name of the script file (`config.scriptName`) should be kept in sync with your actual filename
  - Removed canvas-overlay for decoding (boxes & scanline) which can now be easily implemented using the existing API (see example)
- API Changes
In the course of implementing web-workers some breaking changes were introduced to the API.
  - The `Quagga.init` function no longer receives the callback as part of the config but rather as a second argument: `Quagga.init(config, cb)`
  - The callback to `Quagga.onDetected` now receives an object containing much more information in addition to the decoded code. (see [data](#resultobject))
  - Added `Quagga.onProcessed(callback)` which provides a way to get information for each image processed.
  The callback receives the same `data` object as `Quagga.onDetected` does. Depending on the success of the process the `data` object
  might not contain any `resultCode` and/or `box` properties.

[zxing_github]: https://github.com/zxing/zxing
[teaser_left]: https://github.com/serratus/quaggaJS/blob/master/doc/img/mobile-located.png
[teaser_right]: https://github.com/serratus/quaggaJS/blob/master/doc/img/mobile-detected.png
[caniuse_getusermedia]: http://caniuse.com/#feat=stream
[sinonUrl]: http://sinonjs.org/
[chaiUrl]: http://chaijs.com/
[mochaUrl]: https://github.com/mochajs/mocha
[karmaUrl]: http://karma-runner.github.io/
