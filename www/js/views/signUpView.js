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
			'click .elements label a': 'termsPop',
			'click back': 'termsPopClose',
//			'change .uname input': 'forLowerCase'
		},
        template: JST['templates/login/signup.ejs'],
        checkmail: JST['templates/login/checkmail.ejs'],
		terms: JST['templates/login/terms.ejs'],
//		forLowerCase: function(me){
//			var clicked = $(me.currentTarget);
//			clicked.val(clicked.val().toLowerCase());
//		},
        render: function () {
            this.$el.html(this.template);

			$('.signupForm').forms();

			//add terms into the template.
			$('#terms').html(this.terms);

			//Time date picker
			$('#dob').mobiscroll({
				preset: 'date',
				dateFormat: 'yy-mm-dd',
				maxDate: new Date(),
				defaultValue: new Date(1990,1,1),
				headerText: 'Date of Birth',
				ampm: false,
				dateOrder: 'dd mm yy',
				onSelect: function(el) {
					$('#dob').html(el).removeAttr('class');
				},
			});
//			this.$el.html(this.checkmail({email:'aasdas'}));
        },
		termsPop: function(el){
			$('.signupForm').hide();
			$('#terms').show();
		},
		termsPopClose: function(){
			$('.signupForm').show();
			$('#terms').hide();
		},
		signupForm: function (elem) {
			var myself = this;
			if($(elem.currentTarget).find('.error').length !== true){
				TP.spinner.showme();
				var values = $(elem.currentTarget).serializeObject();
				//Turn off signup button
				$('.btn.signup').attr('disabled','disabled');
				$.ajax({
					url: TP.AJAX+'users/reg',
					type: 'POST',
					dataType: 'json',
					data: values,
					error: function(data){
						TP.spinner.hideme();
						TP.message.showMessage('Opps, sorry! The registration failed. Please try again?!... - '+data.bad, 'bad');
					},
					success: function(data){
						//TODO display the error
						if(data.error){
							TP.spinner.hideme();
							TP.message.showMessage(data.error, 'bad');
							$('.btn.signup').removeAttr('disabled');
						}else{

							$.ajax({
								url: TP.AJAX+'users/login',
								type: 'POST',
								dataType: "json",
								data: {
									'uname': values.uname,
									'pword': values.pw
								},
								error: function(data){
									if(data.status === 200){
										TP.message.showMessage('Opps, sorry just hit login one more time.');
									}else{
										TP.message.showMessage('Sorry Login Failed: '+data.status, 'bad');
									}
									TP.spinner.hideme();
								},
								success: function(data){
									TP.login.doLogin(data);
									TP.spinner.hideme();
								}
							});
//							TP.spinner.hideme();
//
//							TP.message.showMessage(data.good);
//							myself.$el.html(myself.checkmail({email:values.email}));
						}
					}
				});
			}
            return false;
        }
    });
    return SignUpView;
});