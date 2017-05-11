declare const Promise: any;

/** A set of utility functions */
export default class Martine {

    /**
     * Adds a cookie
     * @param {String} selector Find a new selector within a parent selector
     * @example
     * _.addCookie('Mr Cookie', '1', 365)
     */
    public static addCookie(name: string, value: any, days?: number) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }

    /**
     * Reads the value of a cookie
     * @param {String} name The name of the cookie to read
     * @returns Cookie value
     * @example 
     * _.readCookie('Mr Cookie')
     */
    public static readCookie(name: string) {
        const cookies: any = document.cookie;
        return (cookies.match('(^|; )' + name + '=([^;]*)') || 0)[2];
    }

    /**
     * Removes a cookie
     * @param {String} name The name of the cookie to remove
     * @example
     * _.removeCookie('Mr Cookie')
     */
    public static removeCookie(name: string) {
        this.addCookie(name, "", -1);
    }

    /**
     * Debounces a function
     * @param {Function} fn The function to debounce
     * @param {Number} delay The amount of time to delay the function
     * @example
     * _.debounce(function() { console.log('Yo'); }, 300)
     */
    /* tslint:disable */
    public static debounce(fn: (Function), delay: number) {
    /* tslint:enable */
        let timer: any = null;
        delay = delay || 300;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, delay);
        };
    }

    /**
     * A simple loop function
     * @param {Array} value Array to loop through
     * @example
     * _.each([1,2,3], function(item) { console.log(item); })
     */
    /* tslint:disable */
    public static each(value: any, cb: Function) {
    /* tslint:enable */
        for (let i = 0, len = value.length; i < len; i++) {
            cb(value[i], i);
        }
    }

    /**
     * Escape HTML
     * @param {String} unsafe Code to escape
     * @example
     * _.escapeHtml('<hello>Escape me</hello>')
     */
    public static escapeHtml(unsafe: string): string {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    /**
     * Extend objects
     * @param {object} target
     * @param {object} source
     * @returns object
     * @example
     * _.extend({ "hello": "hello" }, { "goodbye": "goodbye" })
     */
    public static extend(target: any, source: any): object {
        target = target || {};
        for (const prop in source) {
            if (typeof source[prop] === 'object') {
                target[prop] = this.extend(target[prop], source[prop]);
            } else {
                target[prop] = source[prop];
            }
        }
        return target;
    }

    /**
     * Gets a querystring value
     * @param {String} name The parameter to read
     * @returns {String} The value of the parameter
     * @example
     * _.getParameter("search")
     */
    public static getParameter(name: string, locationSearch?: string): string {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        if (!locationSearch) {
            locationSearch = location.search;
        }
        const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        const results = regex.exec(locationSearch);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    /**
     * A simple logger
     * @example
     * _.log("Log me")
     */
    public static log(message: any) {
        if (window.console) {
            /* tslint:disable */
            console.log(message);
            /* tslint:enable */
        }
    }

    /**
     * Run a function only once
     * @param {Function} fn The function
     * @param {Object} context The value of this for the call
     * @example
     * var onlyCallOnce = _.once(function() { console.log('Once'); });
     * onlyCallOnce(); // console logs "Once"
     * onlyCallOnce(); // null
     */
    /* tslint:disable */
    public static once(fn: Function, context: any) {
    /* tslint:enable */
        let result: any;
        return function() {
            if (fn) {
                result = fn.apply(context || this, arguments);
                fn = null;
            }
            return result;
        };
    }

    /**
     * Get a random number in a range
     * @param {Number} min The minimum value in the range
     * @param {Number} max The maximum value in the range
     * @returns {Number} A number between the minimum and maximum
     * @example
     * _.random(5, 20)
     */
    public static random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Get a random value from an array
     * @param {Array} arr The array which to sample from
     * @returns {Number} A random item from the array
     * @example
     * _.sample(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
     */
    public static sample(arr: any[]): number {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /**
     * Trigger a native event
     * @param {Element} el The element to trigger an event on
     * @param {String} eventName The name of the event to trigger
     * @example
     * _.trigger(_.query('.button'),'click')
     */
    public static trigger(el: Element, eventName: string) {
        const event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, false);
        el.dispatchEvent(event);
    }

    /**
     * Query HTML Elements
     * @param {String} expr
     * @param {Element} container
     * @returns Element
     * @example
     * _.query('.cool')
     */
    public static query(expr: string, container?: any): HTMLElement {
        return (container || document).querySelector(expr);
    }

    /**
     * Query all HTML Elements
     * @param {String} expr
     * @param {Element} container
     * @returns {Array} An array of the matching elements
     * @example
     * _.query('.cool')
     */
    public static queryAll(expr: string, container?: any): HTMLElement[] {
        const nodeArray: any[] = [];
        const currentQuery = (container || document).querySelectorAll(expr);
        this.each(currentQuery, function(value: any) {
            nodeArray.push(value);
        });
        return nodeArray;
    }

    /**
     * Get the width and height of the viewport
     * @returns {object} An object with the viewport width and height
     * @example
     * _.viewport().width
     * _.viewport().height
     */
    public static viewport() {
        return {
            width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        };
    }

    /**
     * Simple cross browser ajax
     * @deprecated For use only if IE9 and below support is required. Polyfill for fetch is recommended.
     */
    public static ajax(url: string, data?: object, type?: string, cache?: boolean, headers?: any[]) {

        return new Promise(function(resolve: any, reject: any) {

            let httpRequest = new XMLHttpRequest();
            url = url;
            data = data ? data : null;
            type = type ? type : 'GET';
            cache = cache !== false;
            headers = headers ? headers : [];

            let pageUrl = url;
            if (!cache) {
                pageUrl = url + ((/\?/).test(url) ? "&" : "?") + new Date().getTime();
            }

            httpRequest.open(type, pageUrl);

            if (type === 'POST') {
                httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            }

            Martine.each(headers, function(item: any) {
                httpRequest.setRequestHeader(item.header, item.value);
            });

            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200) {
                        resolve(httpRequest);
                        httpRequest = null;
                    } else {
                        reject(httpRequest);
                        httpRequest = null;
                    }
                }
            };

            // Handle network errors
            httpRequest.onerror = function() {
                reject(Error("Network Error"));
            };

            httpRequest.send(data);

        });

    }

    /**
     * Checks if an element is hidden or not
     * @param {Element} el The element to check
     * @example
     * _.isHidden(_.query('.Element'))
     */
    public static isHidden(el: HTMLElement) {
        return (el.offsetParent === null);
    }

    // https://github.com/camwiegert/in-view/blob/master/src/viewport.js

    /**
     * Checks if an element is in viewport
     * @param {Element} element The element to check
     * @param {number} thresholdOption The treshold to check against
     * @example
     * _.inViewport(_.query('.Element'))
     */
    public static inViewport(element: HTMLElement, thresholdOption?: number) {

        if (!thresholdOption) {
            thresholdOption = 0;
        }

        const { top, right, bottom, left, width, height } = element.getBoundingClientRect();

        const intersection = {
            t: bottom,
            r: window.innerWidth - left,
            b: window.innerHeight - top,
            l: right
        };

        const threshold = {
            x: thresholdOption * width,
            y: thresholdOption * height
        };

        return intersection.t >= (0 + threshold.y) &&
            intersection.r >= (0 + threshold.x) &&
            intersection.b >= (0 + threshold.y) &&
            intersection.l >= (0 + threshold.x);
    }

    /**
     * Simple polling function
     * @param {Function} fn The function to poll
     * @param {number} timeout When to timeout
     * @param {number} interval The interval to poll
     * @example
     *   _.poll(function () {
     *        return _.query('main').offsetWidth > 0;
     *    }, 2000, 150)
     *    .then(function () {
     *        console.log('done');
     *    }).catch(function (error) {
     *        _.log(error);
     *    });
     */
    /* tslint:disable */
    public static poll(fn: Function, timeout?: number, interval?: number) {
    /* tslint:enable */

        return new Promise(function(resolve: any, reject: any) {

            const endTime = Number(new Date()) + (timeout || 2000);
            interval = interval || 100;

            (function p() {
                // If the condition is met, we're done! 
                if (fn()) {
                    resolve();
                } else if (Number(new Date()) < endTime) { // If the condition isn't met but the timeout hasn't elapsed
                    setTimeout(p, interval);
                } else { // Didn't match and too much time, reject!
                    reject(new Error('timed out for ' + fn + ': ' + arguments));
                }
            })();

        });

    }

    /**
     * A decorator for logging method arguments and return values to the console
     * @example
     * @_.logger
     * function talk(message) { alert(message); }
     */
    public static logger(target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value; // save a reference to the original method

        descriptor.value = function(...args: any[]) {
            Martine.log("--- Martine logger ---");
            Martine.log("Method: " + propertyKey);
            Martine.log("Arguments: " + JSON.stringify(args)); // pre
            const result = originalMethod.apply(this, args);    // run and store the result
            Martine.log("Returns: " + result);                 // post
            return result;                                    // return the result of the original method
        };

        return descriptor;
    }

}
