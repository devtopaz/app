/*global define*/
define([
    'jquery',
    'backbone',
], function () {
    'use strict';

	//routes from the home page
    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
			'forgotten': 'forgotten',
			'signup': 'signup',

        }
    });

    return Router;
});