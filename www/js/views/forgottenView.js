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
        },
        events: {
            'submit #forgotten': 'forgotten',
        },
		forgotten: function (elem) {
			if($(elem.currentTarget).find('.error').length !== true){
				var values = $(elem.currentTarget).serializeObject();
				if(values.email===""){
					$('input[type=email]').parent().addClass('error');
					return false;
				}else{
					TP.UI.spinner.showme();
					$.ajax({
						url: TP.AJAX+'users/forgotten',
						type: 'POST',
						dataType: 'json',
						data: {
							'email': values.email,
						},
						error: function(data){
							TP.UI.message.showMessage('Sorry, there is an error on the server. Please report this bug. Email is below', 'bad');
							TP.UI.spinner.hideme();
						},
						success: function(data){
							TP.UI .spinner.hideme();
							if(data.good){
								TP.UI.message.showMessage(data.good);
							}else{
								TP.UI.message.showMessage(data.bad, 'bad');
							}
						}
					});
				}
			}
			return false;
        }
    });
    return ForgottenView;
});