/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(function() {
    "use strict";

    var _events = function() {
        var events = {};

        function getEvent(eventName) {
            if (!events[eventName]) {
                events[eventName] = {
                    subscribers : []
                };
            }
            return events[eventName];
        }
        
        function clearEvents(){
            events = {};
        }

        function publishSubscription(subscription, data) {
            if (subscription.async) {
                setTimeout(function() {
                    subscription.callback(data);
                }, 4);
            } else {
                subscription.callback(data);
            }
        }
        
        function subscribe(event, callback, async) {
            var subscription;

            if ( typeof callback === "function") {
                subscription = {
                    callback : callback,
                    async : async
                };
            } else {
                subscription = callback;
                if (!subscription.callback) {
                    throw "Callback was not specified on options";
                }
            }

            getEvent(event).subscribers.push(subscription);
        }

        return {
            subscribe : function(event, callback, async) {
                return subscribe(event, callback, async);
            },
            publish : function(eventName, data) {
                var event = getEvent(eventName),
                    subscribers = event.subscribers;
                    
                event.subscribers = subscribers.filter(function(subscriber) {
                    publishSubscription(subscriber, data);
                    return !subscriber.once;
                });
            },
            once: function(event, callback, async) {
                subscribe(event, {
                    callback: callback,
                    async: async,
                    once: true
                });
            },
            unsubscribe: function(eventName, callback) {
                var event;
                
                if (eventName) {
                    event = getEvent(eventName);
                    if (event && callback) {
                        event.subscribers = event.subscribers.filter(function(subscriber){
                            return subscriber.callback !== callback;
                        });
                    } else {
                        event.subscribers = [];
                    }
                } else {
                    clearEvents();
                }
            }
        };
    }();

    return _events;
}); 