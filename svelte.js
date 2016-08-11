(function (window, document) {
    "use strict";

    function extend (target, source) {
        target = target || {};
        for (var prop in source) {
            if (typeof source[prop] === 'object') {
                target[prop] = extend(target[prop], source[prop]);
            } else {
                target[prop] = source[prop];
            }
        }
        return target;
    }

    var all = ':all'; // saves one byte as a variable

    var Svelte = function(expr, container) {
        if (expr instanceof Node || expr instanceof Window) {
            return [expr];
        }
        if(expr.indexOf(all) === -1) {
            return typeof expr === 'string'? (container || document).querySelector(expr) : expr || null;
        } else {
            return [].slice.call((container || document).querySelectorAll(expr.replace(all, '')));
        }
    };

    extend(Svelte, {
        extend: extend,
        ready: function() {
            return new Promise(function(resolve, reject){
                if (document.readyState !== 'loading') {
                    resolve();
                }
                else {
                    document.addEventListener('DOMContentLoaded', function(){
                        resolve();
                    });
                }
            });
        },
        fetch: function(url, opts) {

            // Set options
            opts = opts || {};
            opts.data = opts.data || '';
            opts.method = opts.method || 'GET';
            opts.headers = opts.headers || {};

            // Return a new promise.
            return new Promise(function(resolve, reject) {

                var req = new XMLHttpRequest();
                req.open(opts.method, url);

                for (var header in opts.headers) {
                    req.setRequestHeader(header, opts.headers[header]);
                }

                req.onload = function() {
                    // This is called even on 404 etc
                    // so check the status
                    if (req.status === 200 && req.status < 400) {
                        // Resolve the promise with the response text
                        resolve(req);
                    }
                    else {
                        // Otherwise reject with the status text
                        // which will hopefully be a meaningful error
                        reject(Error(req));
                    }
                };

                // Handle network errors
                req.onerror = function() {
                    reject(Error('Network Error'));
                };

                // Make the request
                req.send(opts.method === 'GET'? null : opts.data);

            });
        },
        template: function (value, data) { // Credit: https://gist.github.com/Fedia/20d41d8533e0903f0123
            var render;
            try {
                render = new Function( // compile template as a function
                    "v,o", // data object
                    "with(v){o=" + // this variable will aggregate the output
                    JSON.stringify(value)  // converting template to JavaScript with JSON
                    .replace(/{{=(.+?)}}/g, '"+($1)+"')   // allow to print data: {{= name || 'No name' }}
                    .replace(/{{(.+?)}}/g, '";$1;o+="') /* For logic */ + ";}return o;" // return the evaluated template
                );
            } catch (e) {
                throw e;
            }
            return data ? render(data) : render;
        },
        getParameter: function(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        debounce: function(fn, delay) {
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
        },
        each: function(value, cb) {
            for (var i = 0, len = value.length; i < len; i++) {
                cb(value[i], i);
            }
        },
        cookie: {
            add: function(name, value, days) {
                var expires = '';
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    expires = '; expires='+date.toGMTString();
                }
                document.cookie = name+'='+value+expires+'; path=/';
            },
            read: function(name) {
                return (document.cookie.match('(^|; )'+name+'=([^;]*)')||0)[2];
            },
            remove: function(name) {
                this.add(name, "", -1);
            }
        },
        viewport: function() {
            return {
                width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
            };
        }
    });

    window.svelte = Svelte;
    if(!window.$) {
        window.$ = Svelte;
    }

}(window, document));
