/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define, vec2 */

define(function() {
    "use strict";
    
    /**
     * Creates a cluster for grouping similar orientations of datapoints 
     */
    var Cluster = {
        create : function(point, threshold) {
            var points = [], center = {
                rad : 0,
                vec : vec2.create([0, 0])
            }, pointMap = {};

            function init() {
                add(point);
                updateCenter();
            }

            function add(point) {
                pointMap[point.id] = point;
                points.push(point);
            }

            function updateCenter() {
                var i, sum = 0;
                for ( i = 0; i < points.length; i++) {
                    sum += points[i].rad;
                }
                center.rad = sum / points.length;
                center.vec = vec2.create([Math.cos(center.rad), Math.sin(center.rad)]);
            }

            init();

            return {
                add : function(point) {
                    if (!pointMap[point.id]) {
                        add(point);
                        updateCenter();
                    }
                },
                fits : function(point) {
                    // check cosine similarity to center-angle
                    var similarity = Math.abs(vec2.dot(point.point.vec, center.vec));
                    if (similarity > threshold) {
                        return true;
                    }
                    return false;
                },
                getPoints : function() {
                    return points;
                },
                getCenter : function() {
                    return center;
                }
            };
        },
        createPoint : function(point, id, property) {
            return {
                rad : point[property],
                point : point,
                id : id
            };
        }
    };

    return (Cluster);
});
