define([
	'dv',
], function () {
	'use strict';
	//set up homeview
	var observationdetails = TP.defaultView.extend({
		el: 'page',
		template: JST['templates/observation/detailTemplate.ejs'],
		render: function () {
			this.$el.html(this.template());
			TP.UI.setTitle(TP.DEFAULTS.type + ' Observation');
		}
	});
	return observationdetails;
});