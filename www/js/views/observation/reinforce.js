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
			if(TP.DEFAULTS.type==="positive") {
				TP.UI.setTitle('Reinforce Positive Behaviour');
			}else{
				TP.UI.setTitle('Correct Negative Behaviours');
			}
			TP.OB.setPagination(2);
		},
	});
	return reinforce;
});