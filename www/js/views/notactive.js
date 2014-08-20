/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'dv',
], function ($, _, Backbone, JST) {
    'use strict';

    var notActive = TP.defaultView.extend({
		el: 'page',
		events: {
			'click .checkagain': 'checkAgain',
		},
		checkagain: function (){
			c('as');
			TP.checkConnection();
			if(TP.CONNECTION !== "none"){
				TP.UI.spinner.showme('Checking for you...', 'Waiting...', true);
			};
		},
        template: JST['templates/notactive.ejs'],
        render: function () {
            this.$el.html(this.template);
        }
    });
    return notActive;
});