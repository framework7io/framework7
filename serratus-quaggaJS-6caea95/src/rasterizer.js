/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

/**
 * http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
 */
define(["tracer"], function(Tracer) {
    "use strict";

    var Rasterizer = {
        createContour2D : function() {
            return {
                dir : null,
                index : null,
                firstVertex : null,
                insideContours : null,
                nextpeer : null,
                prevpeer : null
            };
        },
        CONTOUR_DIR : {
            CW_DIR : 0,
            CCW_DIR : 1,
            UNKNOWN_DIR : 2
        },
        DIR : {
            OUTSIDE_EDGE : -32767,
            INSIDE_EDGE : -32766
        },
        create : function(imageWrapper, labelWrapper) {
            var imageData = imageWrapper.data,
                labelData = labelWrapper.data,
                width = imageWrapper.size.x,
                height = imageWrapper.size.y,
                tracer = Tracer.create(imageWrapper, labelWrapper);

            return {
                rasterize : function(depthlabel) {
                    var color,
                        bc,
                        lc,
                        labelindex,
                        cx,
                        cy,
                        colorMap = [],
                        vertex,
                        p,
                        cc,
                        sc,
                        pos,
                        connectedCount = 0,
                        i;

                    for ( i = 0; i < 400; i++) {
                        colorMap[i] = 0;
                    }

                    colorMap[0] = imageData[0];
                    cc = null;
                    for ( cy = 1; cy < height - 1; cy++) {
                        labelindex = 0;
                        bc = colorMap[0];
                        for ( cx = 1; cx < width - 1; cx++) {
                            pos = cy * width + cx;
                            if (labelData[pos] === 0) {
                                color = imageData[pos];
                                if (color !== bc) {
                                    if (labelindex === 0) {
                                        lc = connectedCount + 1;
                                        colorMap[lc] = color;
                                        bc = color;
                                        vertex = tracer.contourTracing(cy, cx, lc, color, Rasterizer.DIR.OUTSIDE_EDGE);
                                        if (vertex !== null) {
                                            connectedCount++;
                                            labelindex = lc;
                                            p = Rasterizer.createContour2D();
                                            p.dir = Rasterizer.CONTOUR_DIR.CW_DIR;
                                            p.index = labelindex;
                                            p.firstVertex = vertex;
                                            p.nextpeer = cc;
                                            p.insideContours = null;
                                            if (cc !== null) {
                                                cc.prevpeer = p;
                                            }
                                            cc = p;
                                        }
                                    } else {
                                        vertex = tracer.contourTracing(cy, cx, Rasterizer.DIR.INSIDE_EDGE, color, labelindex);
                                        if (vertex !== null) {
                                            p = Rasterizer.createContour2D();
                                            p.firstVertex = vertex;
                                            p.insideContours = null;
                                            if (depthlabel === 0) {
                                                p.dir = Rasterizer.CONTOUR_DIR.CCW_DIR;
                                            } else {
                                                p.dir = Rasterizer.CONTOUR_DIR.CW_DIR;
                                            }
                                            p.index = depthlabel;
                                            sc = cc;
                                            while ((sc !== null) && sc.index !== labelindex) {
                                                sc = sc.nextpeer;
                                            }
                                            if (sc !== null) {
                                                p.nextpeer = sc.insideContours;
                                                if (sc.insideContours !== null) {
                                                    sc.insideContours.prevpeer = p;
                                                }
                                                sc.insideContours = p;
                                            }
                                        }
                                    }
                                } else {
                                    labelData[pos] = labelindex;
                                }
                            } else if (labelData[pos] === Rasterizer.DIR.OUTSIDE_EDGE || labelData[pos] === Rasterizer.DIR.INSIDE_EDGE) {
                                labelindex = 0;
                                if (labelData[pos] === Rasterizer.DIR.INSIDE_EDGE) {
                                    bc = imageData[pos];
                                } else {
                                    bc = colorMap[0];
                                }
                            } else {
                                labelindex = labelData[pos];
                                bc = colorMap[labelindex];
                            }
                        }
                    }
                    sc = cc;
                    while (sc !== null) {
                        sc.index = depthlabel;
                        sc = sc.nextpeer;
                    }
                    return {
                        cc : cc,
                        count : connectedCount
                    };
                },
                debug: {
                    drawContour : function(canvas, firstContour) {
                        var ctx = canvas.getContext("2d"),
                            pq = firstContour,
                            iq,
                            q,
                            p;
                            
                        ctx.strokeStyle = "red";
                        ctx.fillStyle = "red";
                        ctx.lineWidth = 1;
    
                        if (pq !== null) {
                            iq = pq.insideContours;
                        } else {
                            iq = null;
                        }
    
                        while (pq !== null) {
                            if (iq !== null) {
                                q = iq;
                                iq = iq.nextpeer;
                            } else {
                                q = pq;
                                pq = pq.nextpeer;
                                if (pq !== null) {
                                    iq = pq.insideContours;
                                } else {
                                    iq = null;
                                }
                            }
    
                            switch(q.dir) {
                            case Rasterizer.CONTOUR_DIR.CW_DIR:
                                ctx.strokeStyle = "red";
                                break;
                            case Rasterizer.CONTOUR_DIR.CCW_DIR:
                                ctx.strokeStyle = "blue";
                                break;
                            case Rasterizer.CONTOUR_DIR.UNKNOWN_DIR:
                                ctx.strokeStyle = "green";
                                break;
                            }
    
                            p = q.firstVertex;
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            do {
                                p = p.next;
                                ctx.lineTo(p.x, p.y);
                            } while(p !== q.firstVertex);
                            ctx.stroke();
                        }
                    }
                }
            };
        }
    };

    return (Rasterizer);
});
