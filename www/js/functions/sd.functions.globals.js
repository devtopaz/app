/*
 ==================================================
 Table of Contents - Created by Hutber on 13/09/13.
 ==================================================
 #Definitions from require
 #Globals
 #Routes/Views
 #Display functions
 #Networking functions
 */
define([
	'fastclick',
], function (fastclick) {
	'use strict';

	//Straight up just start fastclick if needed
	fastclick.attach(document.body);

	$.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};

/*==================================================
Globals
================================================== */

// #Globals for TP ------------------------------------------------------
	//Setup fullsex so we can build other numbers from this.
	TP.VERSION = '0.0.1';
	TP.ENVIROMENT = 'liveApp';
	TP.CDN = 'www.topazmarinesafetyapp.com/';
	TP.HTTP = 'https://www.topazmarinesafetyapp.com/';
	TP.STATE = function(){
		if(localStorage.getItem('privateKey')===null){
			return false;
		}else{
			$('body').data('state','loggedin');
			return true;
		}
	}();
	TP.CURRENTLOG = 'na';
	TP.TEMPLATE = 'footerout';
	TP.HASH = '';
	TP.PREVIOUSHASH = '';
	TP.VIEWS = {};
	TP.ROUTER = false;

// #Build up Stats for TP ------------------------------------------------------

//Setup TP vars for ajax requests
	TP.AJAX = TP.HTTP+'app/';

//check type of envoiment we are in
	var checkEnvio = function () {
		switch (window.location.hostname) {
			case "topaz.local":
					TP.ENVIROMENT = 'localApp',
					TP.CDN = 'topaz.local/',
					TP.HTTP = 'http://topaz.local/',
					TP.AJAX = TP.HTTP+'app/';
				break;
			case "192.168.0.25":
					TP.ENVIROMENT = 'mobilePhone',
					TP.AJAX = TP.HTTP+ 'app/';
				break;
		}
	};

// #define the globals depending on place we are ------------------------------------------------------
	TP.globals = function () {
		if(window.location.protocol === "file:"){
			$.ajax({
				url:'icon-76-2x.png',
				type:'HEAD',
				error: function()
				{
					checkEnvio();
				},
				success: function()
				{
//					c('//file exists');
				}
			});
		}else{
			checkEnvio();
		}
	};


/*==================================================
localStorage - TP Gloabls
================================================== */
	TP.saveVar = function(variable) {
		localStorage[variable] = JSON.stringify(TP[variable]);
	};

/*==================================================
Networking functions
================================================== */
	TP.checkConnection = function () {
		var networkState = navigator.connection.type;

		var states = {};
		if(typeof Connection!=="undefined"){
			states[Connection.UNKNOWN]  = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI]     = 'WiFi connection';
			states[Connection.CELL_2G]  = 'Cell 2G connection';
			states[Connection.CELL_3G]  = 'Cell 3G connection';
			states[Connection.CELL_4G]  = 'Cell 4G connection';
			states[Connection.CELL]     = 'Cell generic connection';
			states[Connection.NONE]     = 'No network connection';
//			c('Connection type: ' + states[networkState]);
		}else{
			c('Connection not ready yet');
		}
	};

	/*==================================================
	Init for TP
	================================================== */
	TP.init = function () {

		//Try and make clicks faster
		FastClick.attach(document.body);

		TP.globals(); //set up our global variables

		//Set up scripts to get loaded depending on envoiment
		if(TP.isMobile || TP.ENVIROMENT==="liveApp"){

			//This checker will active when the app is closed, on repoen this gets set and user has to enter their pin number
			if(typeof sessionStorage.blockpin === "undefined" ){
				sessionStorage.setItem('appOpenedFirstTime',true);
			}
			sessionStorage.removeItem('blockpin');

			//load in cordova.js if its not already there
			if(typeof cordova === "undefined"){
				var c = document.createElement('script');
				c.setAttribute("src","cordova.js");
				document.body.appendChild(c);
			}

			//add phonegap debugging script
			//var d = document.createElement('script');
			//d.setAttribute("src","http://debug.build.phonegap.com/target/target-script-min.js#hutber");
			//document.getElementsByTagName('body')[0].appendChild(d);
		}else{
			$.getScript('http://localhost:35729/livereload.js');
		}

		//Set up hash change for every time it changes
		TP.globalEvents.onHashChange();
		window.addEventListener("hashchange", TP.globalEvents.onHashChange, false);

		//Remove debugs if they are there
		$('debug').on('click', 'li:first', function(){ $('debug li').remove(); });

		//add TP.changeHeightofContent(); to window resize
		$( window ).resize(function() {
			TP.changeHeightofContent();
		});

		//add click to hide overlay button on click
		$('overlay .icon-cancel-circled').click(TP.spinner.hideme);
	};
});
