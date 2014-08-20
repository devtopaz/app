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
		checkAgain: function (){
			TP.checkConnection();
			c(TP.CONNECTION);
			if(TP.CONNECTION === "none"){
				TP.UI.Dialog('No Internet', 'Please try again when you have internet', ['Cancel', 'Ok'], function(){
					TP.save.removeFromStorage();
					TP.pageLoad('home');
				}, 'confirm');
			};
		},
        template: JST['templates/notactive.ejs'],
        render: function () {
            this.$el.html(this.template);
        }
    });
    return notActive;
});