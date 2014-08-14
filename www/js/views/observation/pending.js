define([
	'dv',
	'date'
], function () {
	'use strict';
	//set up homeview
	var newNew = TP.defaultView.extend({
		el: 'page',
		template: JST['templates/observation/pending.ejs'],
		events: {
			'click .pendingItems a':'moveToReview'
		},
		moveToReview: function(el){
			var el = $(el.currentTarget);
			var type = el.data('type'),
				item = el.data('item');
			TP.DEFAULTS = TP.OB.reBuild(item);
			TP.pageLoad('review');
			return false;
		},
		render: function () {
			this.$el.html(this.template());
			TP.UI.setTitle('Pending Observations');
		},
	});
	return newNew;
});