define([
	'dv'
], function () {
	'use strict';
	//set up homeview
	var reinforce = TP.defaultView.extend({
		el: 'page',
		events: {
			'click .setpin .digit': 'checkdigit',
		},
		currentPw: "",
		template: JST['templates/observation/reinforce.ejs'],
		render: function () {
			this.$el.html(this.template());
			TP.UI.setTitle('Reinforce Positive Behaviour');
		},
	});
	return reinforce;
});