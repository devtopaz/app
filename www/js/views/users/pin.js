define([
	'dv'
], function () {
	'use strict';
	//set up homeview
	var pin = TP.defaultView.extend({
		el: 'page',
		events: {
			'click .checkpin .digit': 'checkdigit',
		},
		currentPw: "",
		template: JST['templates/users/pin.ejs'],
		render: function () {

			var data = {
				text: "Please enter your <span>4-digit passcode</span> to log in ",
				target: 'checkpin'
			};

			this.$el.html(this.template(data));
			TP.UI.setTitle('Log In');
		},
		checkdigit: function(el){
			var myself = this,
				valueReturned = el.currentTarget.innerHTML,
				pins = $('.pininputs'),
				pinInputs = $('.pininputs > div'),
				actives = pins.find('.active');

			if(isNumber(valueReturned)){
				pinInputs.eq(actives.length).addClass('active');
				myself.currentPw += ''+valueReturned;
				if(myself.currentPw.length === 4 && myself.currentPw === localStorage.pinNumber){
					TP.login.checkPrivateKey.makeCall();
				}else if (myself.currentPw.length === 4){
					TP.UI.message.showMessage('Pin incorrect', 'bad', 1000);
					pinInputs.removeAttr('class');
					myself.currentPw = '';
				}
			}else{
				if(valueReturned === "Forgot Pin?"){
					//Forward to forgotten
					TP.UI.Dialog('Pin Reset?', 'Are you sure you have forgotten your pin code? Doing this will reset your pin and log you out', ['Get me out of here, cancel', 'Yes'], function(){
						sessionStorage.clear();
						localStorage.clear();
						document.location.replace('');
					}, 'confirm');
				}else if (valueReturned === ""){
					myself.currentPw = myself.currentPw.substr(0, actives.length-1);
					pinInputs.eq(actives.length-1).removeClass('active');
				}
			}
		}
	});
	return pin;
});