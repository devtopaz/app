define([
	'dv'
], function () {
	'use strict';
	//set up homeview
	var comments = TP.defaultView.extend({
		el: 'page',
		template: JST['templates/observation/comments.ejs'],
		events: {
			'keyup #comment': 'saveText',
		},
		saveText: function(el){
			var textarea = $(el.currentTarget).val();
			TP.OBDEFAULTS.comment = textarea;
		},
		render: function () {
			this.$el.html(this.template());
			TP.UI.setTitle('Comments');
		},
	});
	return comments;
});