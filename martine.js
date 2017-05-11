(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Martine = (function () {
        function Martine() {
        }
        Martine.addCookie = function (name, value, days) {
            var expires = '';
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            }
            document.cookie = name + '=' + value + expires + '; path=/';
        };
        Martine.readCookie = function (name) {
            var cookies = document.cookie;
            return (cookies.match('(^|; )' + name + '=([^;]*)') || 0)[2];
        };
        Martine.removeCookie = function (name) {
            this.addCookie(name, "", -1);
        };
        Martine.debounce = function (fn, delay) {
            var timer = null;
            delay = delay || 300;
            return function () {
                var context = this;
                var args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            };
        };
        Martine.each = function (value, cb) {
            for (var i = 0, len = value.length; i < len; i++) {
                cb(value[i], i);
            }
        };
        Martine.escapeHtml = function (unsafe) {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        };
        Martine.extend = function (target, source) {
            target = target || {};
            for (var prop in source) {
                if (typeof source[prop] === 'object') {
                    target[prop] = this.extend(target[prop], source[prop]);
                }
                else {
                    target[prop] = source[prop];
                }
            }
            return target;
        };
        Martine.getParameter = function (name, locationSearch) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            if (!locationSearch) {
                locationSearch = location.search;
            }
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var results = regex.exec(locationSearch);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };
        Martine.log = function (message) {
            if (window.console) {
                console.log(message);
            }
        };
        Martine.once = function (fn, context) {
            var result;
            return function () {
                if (fn) {
                    result = fn.apply(context || this, arguments);
                    fn = null;
                }
                return result;
            };
        };
        Martine.random = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        Martine.sample = function (arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        };
        Martine.trigger = function (el, eventName) {
            var event = document.createEvent('HTMLEvents');
            event.initEvent(eventName, true, false);
            el.dispatchEvent(event);
        };
        Martine.query = function (expr, container) {
            return (container || document).querySelector(expr);
        };
        Martine.queryAll = function (expr, container) {
            var nodeArray = [];
            var currentQuery = (container || document).querySelectorAll(expr);
            this.each(currentQuery, function (value) {
                nodeArray.push(value);
            });
            return nodeArray;
        };
        Martine.viewport = function () {
            return {
                width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
            };
        };
        Martine.ajax = function (url, data, type, cache, headers) {
            return new Promise(function (resolve, reject) {
                var httpRequest = new XMLHttpRequest();
                url = url;
                data = data ? data : null;
                type = type ? type : 'GET';
                cache = cache !== false;
                headers = headers ? headers : [];
                var pageUrl = url;
                if (!cache) {
                    pageUrl = url + ((/\?/).test(url) ? "&" : "?") + new Date().getTime();
                }
                httpRequest.open(type, pageUrl);
                if (type === 'POST') {
                    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                }
                Martine.each(headers, function (item) {
                    httpRequest.setRequestHeader(item.header, item.value);
                });
                httpRequest.onreadystatechange = function () {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200) {
                            resolve(httpRequest);
                            httpRequest = null;
                        }
                        else {
                            reject(httpRequest);
                            httpRequest = null;
                        }
                    }
                };
                httpRequest.onerror = function () {
                    reject(Error("Network Error"));
                };
                httpRequest.send(data);
            });
        };
        Martine.isHidden = function (el) {
            return (el.offsetParent === null);
        };
        Martine.inViewport = function (element, thresholdOption) {
            if (!thresholdOption) {
                thresholdOption = 0;
            }
            var _a = element.getBoundingClientRect(), top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left, width = _a.width, height = _a.height;
            var intersection = {
                t: bottom,
                r: window.innerWidth - left,
                b: window.innerHeight - top,
                l: right
            };
            var threshold = {
                x: thresholdOption * width,
                y: thresholdOption * height
            };
            return intersection.t >= (0 + threshold.y) &&
                intersection.r >= (0 + threshold.x) &&
                intersection.b >= (0 + threshold.y) &&
                intersection.l >= (0 + threshold.x);
        };
        Martine.poll = function (fn, timeout, interval) {
            return new Promise(function (resolve, reject) {
                var endTime = Number(new Date()) + (timeout || 2000);
                interval = interval || 100;
                (function p() {
                    if (fn()) {
                        resolve();
                    }
                    else if (Number(new Date()) < endTime) {
                        setTimeout(p, interval);
                    }
                    else {
                        reject(new Error('timed out for ' + fn + ': ' + arguments));
                    }
                })();
            });
        };
        Martine.logger = function (target, propertyKey, descriptor) {
            var originalMethod = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                Martine.log("--- Martine logger ---");
                Martine.log("Method: " + propertyKey);
                Martine.log("Arguments: " + JSON.stringify(args));
                var result = originalMethod.apply(this, args);
                Martine.log("Returns: " + result);
                return result;
            };
            return descriptor;
        };
        return Martine;
    }());
    exports.default = Martine;
});
