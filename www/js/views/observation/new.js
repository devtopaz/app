define([
	'dv',
], function () {
	'use strict';
	//set up homeview
	var newNew = TP.defaultView.extend({
		el: 'page',
		events: {
			'click .newBtn a': 'openType',
			'change #vesselselector': 'selectRegion',
			'change #vessel': 'changeItem',
		},
		selectRegion: function(el){
			var vessel = $('#vessel')
			TP.VESSELS[$(el.currentTarget).val()].forEach(function(info){
				vessel.append('<option value="'+info+'">'+info+'</opion>');
			});
			vessel.removeClass('hide');
		},
		changeItem: function(el){
			TP.DEFAULTS.vessel = $(el.currentTarget).val();
			$('.new .hide').removeClass('hide');
			//document.querySelector('page').scrollTop = 300;
			$('page').animate({
				scrollTop: 300
			}, 1000);
		},
		openType: function(el){
			TP.DEFAULTS.type = $(el.currentTarget).data('type');
		},
		template: JST['templates/observation/new.ejs'],
		render: function () {
			//reset everything for the fresh observation
			TP.save.reset();

			//set current Time
			TP.DEFAULTS.time = new Date();

			this.$el.html(this.template());
			TP.UI.setTitle('New Observation');
		},
	});
	return newNew;
});