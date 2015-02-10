/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(function() {
    "use strict";
    
    return {
        drawRect: function(pos, size, ctx, style){
            ctx.strokeStyle = style.color;
            ctx.fillStyle = style.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.strokeRect(pos.x, pos.y, size.x, size.y);
        },
        drawPath: function(path, def, ctx, style) {
            ctx.strokeStyle = style.color;
            ctx.fillStyle = style.color;
            ctx.lineWidth = style.lineWidth;
            ctx.beginPath();
            ctx.moveTo(path[0][def.x], path[0][def.y]);
            for (var j = 1; j < path.length; j++) {
                ctx.lineTo(path[j][def.x], path[j][def.y]);
            }
            ctx.closePath();
            ctx.stroke();
        }
    };
    
});
