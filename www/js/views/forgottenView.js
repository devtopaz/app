/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'dv',
], function ($, _, Backbone, JST) {
    'use strict';

    var ForgottenView = TP.defaultView.extend({
		el: 'page',

        template: JST['templates/login/forgotten.ejs'],

        render: function () {
            this.$el.html(this.template);
			$('#forgotten').forms({required: 'all'});
        },

        events: {
            'submit #forgotten': 'forgotten',
        },

		forgotten: function (elem) {
			if($(elem.currentTarget).find('.error').length !== true){
				TP.spinner.showme();
				var values = $(elem.currentTarget).serializeObject();
				$.ajax({
					url: TP.AJAX+'users/forgotten',
					type: 'POST',
					dataType: 'json',
					data: {
						'email': values.email,
					},
					error: function(data){
						TP.message.showMessage('Sorry, there is an error on the server. Please report this bug. Email is below', 'bad');
						TP.spinner.hideme();
					},
					success: function(data){
						TP.spinner.hideme();
						if(data.good){
							TP.message.showMessage(data.good);
						}else{
							TP.message.showMessage(data.bad, 'bad');
						}
					}
				});
			}
			return false;
        }
    });
    return ForgottenView;
});