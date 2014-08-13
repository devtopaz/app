define([
	'dv',
], function () {
	'use strict';

	//set up homeview
	var profile = TP.defaultView.extend({
		el: 'page',
		events: {
			'click delete':'deleteUser',
			'click resetpin':'resetpin'
		},
		template: JST['templates/users/settings.ejs'],
		signup: JST['templates/login/signup.ejs'],
		resetpin: function(){
			TP.UI.Dialog('Reset your pincode?', 'Are you sure you wish to reset your 4 digit pincode?', ['Cancel', 'Yes, reset pincode'], function(){
				localStorage.removeItem('pinNumber');
				//This checker will active when the app is closed, on repoen this gets set and user has to enter their pin number
				sessionStorage.setItem('appOpenedFirstTime',true);
				document.location.replace('#setpin');
			}, 'confirm');
		},
		deleteUser: function(){
			TP.UI.Dialog('Delete Account?', 'Now did you mean to click me? Or did u just mess up?', ['Get me out of here, cancel', 'Yes'], function(){
				TP.UI.Dialog('Delete Account?', 'Ok, cool. Now I just need to check again, because you can only delete this once.', ['Cancel', 'Remove me from all services forever!!'], function(){
					TP.spinner.showme();
					$.ajax({
						url: TP.AJAX+'users/deleteUser',
						type: 'POST',
						dataType: 'json',
						data: {
							'sess': localStorage.uid,
						},
						error: function(data){
							localStorage.clear();
							sessionStorage.clear();
							document.location.replace('');
						},
						success: function(data){
							TP.UI.message.showMessage('Opps, didn\'t work did it', 'bad');
							TP.UI.spinner.hideme();
						}
					});
				}, 'confirm');
			}, 'confirm');
		},
		render: function () {

			var data = {
				gender: function(){
					if(localStorage.gender==="0"){
						return "male";
					}else{
						return "female";
					}
				}(),
				regdate: localStorage.regdate,
				fname: localStorage.fname,
				sname: localStorage.sname,
				email: localStorage.email,
				from: 'edit'
			};

			this.$el.html(this.signup(data));
			TP.UI.setTitle('Edit Profile');
		},
	});
	return profile;
});