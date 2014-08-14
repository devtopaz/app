define([
	'dv'
], function () {
	'use strict';
	//set up homeview
	var success = TP.defaultView.extend({
		el: 'page',
		template: JST['templates/observation/success.ejs'],
		render: function () {
			this.$el.html(this.template());
			TP.UI.setTitle('Success');
		},
	});
	return success;
});