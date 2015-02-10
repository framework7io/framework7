$(function() {
    var App = {
        init: function() {
            Quagga.init({
                inputStream: { name: "Test",
                   type: "ImageStream",
                   src: "../test/fixtures/" + App.config.reader + "/",
                   length: App.config.length
                },
                decoder : {
                    readers : [App.config.reader + "_reader"]
                }
            }, function() {
                App.attachListeners();
                Quagga.start();
            });
        },
        config: {
            reader: "code_128",
            length: 10
        },
        attachListeners: function() {
            $(".controls").on("click", "button.next", function(e) {
                e.preventDefault();
                Quagga.start();
            });
            
            $(".controls .reader-group").on("change", "input", function(e) {
                e.preventDefault();
                App.detachListeners();
                Quagga.stop();
                App.config.reader = e.target.value;
                App.init();
            });
        },
        detachListeners: function() {
            $(".controls").off("click", "button.next");
            $(".controls .reader-group").off("change", "input");
        }
    };
    
    App.init();

    Quagga.onProcessed(function(result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
            }
        }
    });

    Quagga.onDetected(function(result) {
        var $node,
            canvas = Quagga.canvas.dom.image,
            detectedCode = result.codeResult.code;

        $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
        $node.find("img").attr("src", canvas.toDataURL());
        $node.find("h4.code").html(detectedCode);
        $("#result_strip ul.thumbnails").prepend($node);
    });
}); 