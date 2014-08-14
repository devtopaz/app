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
            'selector': 'index',
            'home': 'home',
			'forgotten': 'forgotten',
			'signup': 'signup',
			'settings': 'settings',

			//Observtion
			'new':'new',
			'review':'review',
			'positive':'observation',
			'negative':'observation',
			'reinforce':'reinforce',
			'observationdetails':'observationdetails',
			'comments':'comments',
			'success':'success',
			'failed':'failed',
			'pending':'pending',

			//Observation Details
			'procedures':'observationdetails',
			'preparation':'observationdetails',
			'lineoffire':'observationdetails',
			'ppe':'observationdetails',
			'tools':'observationdetails',

			//Users
			'setpin' : 'setpin',
			'confirmpin' : 'confirmpin',
			'pinsave' : 'pinsave',
			'pin' : 'pin',

        }
    });

    return Router;
});