define([
	'dv',
], function () {
    'use strict';

	//set up homeview
    var HomeView = TP.defaultView.extend({
		el: 'page',
		events: {

		},
        template: JST[
			'templates/home.ejs'
		],
        render: function () {
			$('body').removeClass('edit');
			this.$el.html(this.template);
        }
    });
    return HomeView;
});