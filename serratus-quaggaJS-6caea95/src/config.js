/**
 * The basic configuration 
 */

define(function(){
  var config = {
      inputStream: { name: "Live",
          type: "LiveStream",
          constraints: {
              width: 640,
              height: 480,
              facing: "environment" // or user
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
        drawScanline: false,
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
   };
   
   return config;
});