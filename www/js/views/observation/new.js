define([
	'dv',
], function () {
	'use strict';
	//set up homeview
	var newNew = TP.defaultView.extend({
		el: 'page',
		events: {
			'click .newBtn a': 'openType',
			'change #vessel': 'changeItem',
		},
		changeItem: function(el){
			TP.DEFAULTS.vessel = $(el.currentTarget).val();
			$('.new .hide').removeClass('hide');
		},
		openType: function(el){
			TP.DEFAULTS.type = $(el.currentTarget).data('type');
		},
		template: JST['templates/observation/new.ejs'],
		render: function () {
			//reset everything for the fresh observation
			TP.DEFAULTS = TP.OB.defaults();
			//set current Time
			TP.DEFAULTS.time = new Date();

			$('html').removeClass('positive').removeClass('negative');

			this.$el.html(this.template());
			TP.UI.setTitle('New Observation');
		},
	});
	return newNew;
});