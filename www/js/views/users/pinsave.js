define([
	'dv'
], function () {
	'use strict';
	//set up homeview
	var pin = TP.defaultView.extend({
		el: 'page',
		template: JST['templates/users/pinsave.ejs'],
		render: function () {
			this.$el.html(this.template);
			TP.UI.setTitle('Pin Saved');
		},
	});
	return pin;
});