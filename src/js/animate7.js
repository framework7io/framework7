/*========================
Animate7 Animate Engine
==========================*/
var Animate7 = function (elements, props, params) {
    props = props || {};
    params = params || {};
    var defaults = {
        duration: 300,
        easing: 'swing', // or 'linear'
        /* Callbacks
        begin(elements)
        complete(elements)
        progress(elements, complete, remaining, start, tweenValue)
        */
    };

    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }

    var a = this;
    a.params = params;
    a.props = props;
    a.elements = $(elements);
    if (a.elements.length === 0) {
        return a;
    }

    a.easingProgress = function (easing, progress) {
        if (easing === 'swing') {
            return 0.5 - Math.cos( progress * Math.PI ) / 2;
        }
        if (typeof easing === 'function') {
            return easing(progress);
        }
        return progress;
    };

    a.stop = function () {
        if (a.frameId) {
            $.cancelAnimationFrame(a.frameId);
        }
        a.animating = false;
        a.elements.each(function (index, el) {
            delete el.animate7Instance;
        });
        a.que = [];
    };
    a.done = function (complete) {
        a.animating = false;
        a.elements.each(function (index, el) {
            delete el.animate7Instance;
        });
        if (complete) complete(elements);
        if (a.que.length > 0) {
            var que = a.que.shift();
            a.animate(que[0], que[1]);
        }
    };
    a.animating = false;
    a.que = [];
    a.animate = function (props, params) {
        if (a.animating) {
            a.que.push([props, params]);
            return a;
        }
        a.params = params;

        var _elements = [];

        // Define & Cache Initials & Units
        a.elements.each(function (index, el) {
            var initialFullValue, initialValue, unit, finalValue, finalFullValue;

            _elements[index] = {
                _container: el
            };

            for (var prop in props) {
                initialFullValue = window.getComputedStyle(el, null).getPropertyValue(prop).replace(',', '.');
                initialValue = parseFloat(initialFullValue);
                unit = initialFullValue.replace(initialValue, '');
                finalValue = props[prop];
                finalFullValue = props[prop] + unit;
                _elements[index][prop] = {
                    initialFullValue: initialFullValue,
                    initialValue: initialValue,
                    unit: unit,
                    finalValue: finalValue,
                    finalFullValue: finalFullValue,
                    currentValue: initialValue
                };

            }
        });

        var startTime = null,
            time,
            elementsDone = 0,
            propsDone = 0,
            done,
            began = false;

        a.animating = true;

        function render() {
            time = new Date().getTime();
            var progress, easeProgress, el;
            if (!began) {
                began = true;
                if (params.begin) params.begin(elements);
            }
            if (startTime === null) {
                startTime = time;
            }
            if (params.progress) {
                params.progress(
                    a.elements,
                    Math.max(Math.min((time - startTime) / params.duration, 1), 0),
                    ((startTime + params.duration) - time < 0 ? 0 : (startTime + params.duration) - time),
                    startTime
                );
            }

            for (var i = 0; i < _elements.length; i++) {
                if (done) continue;
                el = _elements[i];
                if (el.done) continue;

                for (var prop in props) {
                    progress = Math.max(Math.min((time - startTime) / params.duration, 1), 0);
                    easeProgress = a.easingProgress(params.easing, progress);

                    el[prop].currentValue = el[prop].initialValue + easeProgress * (el[prop].finalValue - el[prop].initialValue);

                    if (el[prop].finalValue > el[prop].initialValue && el[prop].currentValue >= el[prop].finalValue || el[prop].finalValue < el[prop].initialValue && el[prop].currentValue <= el[prop].finalValue)  {
                        el._container.style[prop] = el[prop].finalValue + el[prop].unit;
                        propsDone ++;
                        if (propsDone === Object.keys(props).length) {
                            el.done = true;
                            elementsDone++;
                        }
                        if (elementsDone === _elements.length) {
                            done = true;
                        }
                    }
                    if (done) {
                        a.done(params.complete);
                        return a;
                    }
                    el._container.style[prop] = el[prop].currentValue + el[prop].unit;
                }
            }

            // Then call
            a.frameId = $.requestAnimationFrame(render);
        }
        a.frameId = $.requestAnimationFrame(render);
        return a;
    };
    var foundInstance;
    for (var i = 0; i < a.elements.length; i++) {
        if (a.elements[i].animate7Instance) {
            foundInstance = a.elements[i].animate7Instance;
        }
        else a.elements[i].animate7Instance = a;
    }
    if (foundInstance) {
        return foundInstance.animate(props, params);
    }
    else a.animate(props, params);
    return a;
};
window.Animate7 = function (elements, props, params){
    return new Animate7(elements, props, params);
};
Dom7.fn.animate = function (props, params) {
    new Animate7(this, props, params);
    return this;
};