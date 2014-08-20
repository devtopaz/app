/*
 ==================================================
 Table of Contents - Created by Hutber on 21/05/13.
 ==================================================
 */
define([
], function () {
	"use strict";
	/*==================================================
	Login functions
	================================================== */
	TP.login = {
		moveToHome: function(reload){
			if(typeof reload === "undefined") {reload = false;} //if no reload is passed make it false
			sessionStorage.removeItem('appOpenedFirstTime');
			if(reload){
				location.reload();
			}else {
				window.location.href = "#home";
			}
		},
		buildLocalStorage: function(data){
			Object.keys(data).forEach(function(key){
				var me = data[key];
				if(typeof me === "string"){ //If I'm a string then just add it to locastorage
					localStorage.setItem(key,me);
				}else if (typeof me === "object"){ //If we are an object then stringify if
					localStorage.setItem(key,JSON.stringify(me));
				}
			});
		},
		doLogin: {
			doAjax: function(values){
				$.ajax({
					url: TP.AJAX+'users/login',
					type: 'POST',
					dataType: "json",
					data: {
						'email': values.email,
						'pword': values.pword
					},
					error: function(data){
						if(data.status === 200){
							TP.UI.spinner.showme('Still Logging you in...');
//							TP.login.doLogin.doAjax(values);
						}else{
							TP.UI.message.showMessage('Sorry Login Failed: '+data.status, 'bad');
						}
					},
					success: function(data){
						TP.login.buildLocalStorage(data);
						TP.login.doLogin.success(data);
					}
				});
				return false;
			},
			success: function(data){
				if(data.uid){
					//we add a session marker to tell the pin view that we are coming from the login and don't display the pin
					sessionStorage.setItem('blockpin',false);
					//Now we load the home page
					TP.login.moveToHome(true);
				}else{
					TP.UI.message.showMessage(data.message, 'bad');
				}
			}
		},
		checkPrivateKey: {
			numberOfTrys: 0,
			doAjax: function(){
				$.ajax({
					url: TP.AJAX+'users/checkKey',
					type: 'POST',
					dataType: "json",
					data: {
						'ierihias': localStorage.uid,
						'adfbse4': localStorage.privateKey
					},
					error: function(data){
						if(TP.login.checkPrivateKey.numberOfTrys===0){
							TP.login.checkPrivateKey.numberOfTrys = 1;
							TP.login.checkPrivateKey.doAjax();
						}else{
							TP.message.showMessage('There was a network error. Please try again.', 'bad');
							TP.spinner.hideme();
						}
					},
					success: TP.login.checkPrivateKey.success
				});
			},
			makeCall: function(){
				TP.UI.spinner.showme('Security Checks', 'Looking up');
				TP.login.checkPrivateKey.doAjax();
			},
			success: function(data){
				if(data.current==="1"){
					TP.login.moveToHome();
					TP.spinner.hideme();
				}else{
					TP.UI.Dialog('Private Session Key has expired.', 'This is often from logging on a different device. We will log you out for security.');
					//alert('You have logged in somewhere else since using this app. For security we\'ll need to log you out, please log back in after.');
					TP.login.doLogOut();
				}
			}
		},
		checkLoginState : function() { //We use this state to enable us to use the function on every page load to check if the user is logged in
			var hash = window.location.hash.substring(1);
			var loggedInState = true;
			if(localStorage.getItem('uid')=== null) {loggedInState = false;}

			if(sessionStorage.tmpPin){
				//Top level, if the user hasn't set a pin number
			}else if(loggedInState && !localStorage.pinNumber){
				window.location.href = "#setpin";
			}else if(sessionStorage.appOpenedFirstTime && hash!=="pin" && loggedInState){
				window.location.href = "#pin";
			}else if( loggedInState && (hash==="" || hash==="signup" || hash==="forgotten" || hash==="login")){
				window.location.href = "#home";
			}else if (!loggedInState && hash==="home" ){
				document.location.replace('');
			}
		},
		doLogOut: function(){
			var tmpPin = localStorage.pinNumber;
			localStorage.clear();
			localStorage.setItem('pinNumber', tmpPin);
			document.location.replace('');
			return false;
		}
	};

	return TP;
});