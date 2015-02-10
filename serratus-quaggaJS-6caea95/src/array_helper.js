/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(function() {
    "use strict";

    return {
        init : function(arr, val) {
            var l = arr.length;
            while (l--) {
                arr[l] = val;
            }
        },

        /**
         * Shuffles the content of an array
         * @return {Array} the array itself shuffled
         */
        shuffle : function(arr) {
            var i = arr.length - 1, j, x;
            for (i; i >= 0; i--) {
                j = Math.floor(Math.random() * i);
                x = arr[i];
                arr[i] = arr[j];
                arr[j] = x;
            }
            return arr;
        },

        toPointList : function(arr) {
            var i, j, row = [], rows = [];
            for ( i = 0; i < arr.length; i++) {
                row = [];
                for ( j = 0; j < arr[i].length; j++) {
                    row[j] = arr[i][j];
                }
                rows[i] = "[" + row.join(",") + "]";
            }
            return "[" + rows.join(",\r\n") + "]";
        },

        /**
         * returns the elements which's score is bigger than the threshold
         * @return {Array} the reduced array
         */
        threshold : function(arr, threshold, scoreFunc) {
            var i, queue = [];
            for ( i = 0; i < arr.length; i++) {
                if (scoreFunc.apply(arr, [arr[i]]) >= threshold) {
                    queue.push(arr[i]);
                }
            }
            return queue;
        },

        maxIndex : function(arr) {
            var i, max = 0;
            for ( i = 0; i < arr.length; i++) {
                if (arr[i] > arr[max]) {
                    max = i;
                }
            }
            return max;
        },

        max : function(arr) {
            var i, max = 0;
            for ( i = 0; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                }
            }
            return max;
        }
    };
}); 