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
			TP.OBDEFAULTS.vessel = $(el.currentTarget).val();
			$('.new .hide').removeClass('hide');
		},
		openType: function(el){
			TP.OBDEFAULTS.type = $(el.currentTarget).data('type');
		},
		template: JST['templates/observation/new.ejs'],
		render: function () {
			var rightNow = new Date();
			//reset everything for the fresh observation
			TP.OBDEFAULTS.type = '';
			TP.OBDEFAULTS.time = rightNow;

			$('html').removeClass('positive').removeClass('negative');

			this.$el.html(this.template());
			TP.UI.setTitle('New Observation');
		},
	});
	return newNew;
});