/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'dv',
], function ($, _, Backbone, JST) {
    'use strict';

    var SignUpView = TP.defaultView.extend({
		el: 'page',
		events: {
			'submit .signupForm': 'signupForm',
		},
        template: JST['templates/login/signup.ejs'],
        checkmail: JST['templates/login/checkmail.ejs'],
        render: function () {
            this.$el.html(this.template);
			TP.UI.setTitle('Sign Up');
        },
		signupForm: function (el) {
			var me = $(el.currentTarget),
				values = me.serializeObject(),
				noerror = true,
				myself = this;

			//check for all errors
			me.find('.error').removeClass('error');

			Object.keys(values).forEach(function(item){
				var element = values[item];
				if(element.length===0){
					$('input[name='+item+'], select[name='+item+']').parent().addClass('error');
					noerror = false;
				}
			});

			if(noerror){
				TP.UI.spinner.showme();
				var values = $(el.currentTarget).serializeObject();

				//Turn off signup button
				$('.btn.signup').attr('disabled','disabled');
				$.ajax({
					url: TP.AJAX + 'users/reg',
					type: 'POST',
					dataType: 'json',
					data: values,
					error: function (data) {
						$('.btn.signup').removeAttr('disabled');
						TP.UI.spinner.hideme();
						TP.UI.message.showMessage('Opps, sorry! The registration failed. Please try again?!... - ' + data.bad, 'bad');
					},
					success: function (data) {
						//TODO display the error
						if (data.error) {
							TP.UI.spinner.hideme();
							TP.UI.message.showMessage(data.error, 'bad');
							$('.btn.signup').removeAttr('disabled');
						} else {
							TP.UI.spinner.hideme();
							TP.UI.message.showMessage(data.good);
							if($('.signup').html() !== "Done") {
								myself.$el.html(myself.checkmail({email: values.email}));
								TP.UI.setTitle('Sign Up Complete');
							}
							$('.btn.signup').removeAttr('disabled');
						}
					}
				});
			}
            return false;
        }
    });
    return SignUpView;
});