/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define([], function() {
    "use strict";

    function createNode(htmlStr) {
        var temp = document.createElement('div');
        
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            return temp.firstChild;
        }
    }

    function mergeObjects(obj1, obj2) {
        for (var p in obj2) {
            try {
                if (obj2[p].constructor == Object) {
                    obj1[p] = mergeObjects(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch(e) {
                obj1[p] = obj2[p];
            }
        }

        return obj1;
    }

    return {
        createNode : function(htmlStr) {
            return createNode(htmlStr);
        },
        mergeObjects : function(obj1, obj2) {
            return mergeObjects(obj1, obj2);
        }
    };
}); 