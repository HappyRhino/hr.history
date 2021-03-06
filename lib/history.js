var $ = require("jquery");
var _ = require("hr.utils");
var Class = require("hr.class");


/**
 * Represent an interface for managing the web navigation in a global way.
 * History uses hash change for triggering navigation event and regex as routes.
 * See Router for a more up level interface.
 *
 * @class History
 * @extends Class
 * @constructor
 */
var History = Class.extend({
    initialize: function() {
        this.handlers = [];
        this.started = false;
    },

    /**
     * Add a new navigation route
     *
     * @method route
     * @param {regex} route regex for the route
     * @param {function} callback function to call as a navigation callback
     * @chainable
     */
    route: function(route, callback) {
        this.handlers.unshift({
            route: route,
            callback: callback
        });

        return this;
    },

    /**
     * Add the navigation handling
     *
     * @method start
     * @chainable
     */
    start: function() {
        if (this.started) return false;

        var self = this;
        var $window = $(window);
        var rootUrl = document.location.protocol+'//'+(document.location.hostname||document.location.host);

        $window.bind('hashchange', _.bind(this._handleCurrentState, this));

        var ret = this._handleCurrentState();
        this.started = true;

        return ret;
    },

    /**
     * Navigation to a specific route
     *
     * @method navigate
     * @param {string} url
     * @chainable
     */
    navigate: function(url) {
        window.location.hash = url;
        return this;
    },

    /*
     *  Handle a state changement in history
     */
    _handleState: function() {
        var url = window.location.hash.slice(1);
        if (url.length > 0 && url[0] == "/") url = url.slice(1);

        this.trigger("change", url);

        var matched = _.any(this.handlers, function(handler) {
            if (handler.route.test(url)) {
                handler.callback(url);
                return true;
            }
            return false;
        });

        return matched;
    },

    /*
     *  Handle current page state
     */
    _handleCurrentState: function() {
        var url = window.location.hash.replace("#", "");
        return this._handleState(url);
    }
});

var history = new History();
module.exports = history;
