define([
	'dv'
], function () {
	'use strict';
	//set up homeview
	var failed = TP.defaultView.extend({
		el: 'page',
		template: JST['templates/observation/failed.ejs'],
		render: function () {
			this.$el.html(this.template());
			TP.UI.setTitle('Submission failed');
		},
	});
	return failed;
});