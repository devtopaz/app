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
	//Setup so we can build other numbers from this.
	TP.VERSION = '0.0.1';
	TP.ENVIROMENT = 'liveApp';
	TP.CDN = 'www.topazmarinesafetyapp.com/';
	TP.HTTP = 'http://www.topazmarinesafetyapp.com/';
	TP.STATE = function(){
		if(localStorage.getItem('pkey')===null){
			return false;
		}else{
			$('body').data('state','loggedin');
			return true;
		}
	}();
	TP.CURRENTLOG = 'na';
	TP.DEFAULTS = TP.OB.defaults();
	TP.CHECKLIST = TP.OB.checkListDefault();
	TP.CONNECTION = null;
	TP.HASH = '';
	TP.PREVIOUSHASH = '';
	TP.VIEWS = {};
	TP.VESSELS = [
		'Addax',
		'Amani',
		'Captain',
		'Commander',
		'Faye',
		'Fujairah',
		'Installer',
		'Johor',
		'Jurong',
		'Oryx',
		'Seema',
		'Sophie',
		'Xara'
	];
	TP.RANKS = [
		'Master',
		'Chief Officer',
		'Deck Officer',
		'Chief Engineer',
		'Engineering Officer',
		'E.T.O.',
		'Bosun',
		'A.B. / Deckhand',
		'Oiler / Motorman',
		'Cadet / Trainee',
		'Interpreter',
		'Medical Staff',
		'Galley Staff',
		'Messman',
		'Shore Management',
		'Shore Staff',
		'Other'
	]
	TP.ROUTER = false;

// #Build up Stats for TP ------------------------------------------------------

//Setup TP vars for ajax requests
	TP.AJAX = TP.HTTP+'app/';

//check type of envoiment we are in
	var checkEnvio = function () {
		switch (window.location.hostname) {
			case "topaz.local" :
					TP.ENVIROMENT = 'localApp',
					TP.CDN = 'topaz.local/',
					TP.HTTP = 'http://topaz.local/',
					TP.AJAX = TP.HTTP+'app/';
				break;
			case "www.topazmarinesafetyapp.com" :
					TP.WEBSITE = 'website';
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
 Navigation - update details on page load
 ================================================== */
TP.pageLoad = function(pageToLoad){
	var useme;

	//Simple check if we have been given a string
	if(typeof pageToLoad === "string"){
		useme = pageToLoad;
	}else if(document.location.hash){
		useme = TP.HASH;
	}else{
//			c('Nothing was given in the pageLoad');
	}
	//Update the current view, don't re-redner it
	TP.ROUTER.navigate(useme, true);
};
/*==================================================
Networking functions
================================================== */
	TP.checkConnection = function (){
		if(TP.ENVIROMENT==="liveApp") {
			TP.CONNECTION = navigator.connection.type;

			var states = {};
			states[Connection.UNKNOWN] = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI] = 'WiFi connection';
			states[Connection.CELL_2G] = 'Cell 2G connection';
			states[Connection.CELL_3G] = 'Cell 3G connection';
			states[Connection.CELL_4G] = 'Cell 4G connection';
			states[Connection.CELL] = 'Cell generic connection';
			states[Connection.NONE] = 'No network connection';

			//alert('Connection type: ' + states[networkState]);

			if (
				TP.CONNECTION !== "none" && localStorage.getItem('uid') !== null
				&& TP.HASH!=="notactive"
				&& TP.HASH!=="pin"
				) {
				TP.ROUTER.navigate('notactive', true);
			};
		}
	}

	/*==================================================
	Init for TP
	================================================== */
	TP.init = function () {

		//Try and make clicks faster
		FastClick.attach(document.body);

		TP.globals(); //set up our global variables

		TP.login.lookIfWeNeedPin();

		//Set up scripts to get loaded depending on envoiment
		if(TP.isMobile || TP.ENVIROMENT==="liveApp"){
			if(!TP.WEBSITE) {
				//load in cordova.js if its not already there
				if (typeof cordova === "undefined") {
					var c = document.createElement('script');
					c.setAttribute("src", "cordova.js");
					document.body.appendChild(c);
				}

				//add phonegap debugging script
				//var d = document.createElement('script');
				//d.setAttribute("src","http://debug.build.phonegap.com/target/target-script-min.js#hutber");
				//document.getElementsByTagName('body')[0].appendChild(d);
			}
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
		$('overlay .icon-cancel-circled').click(TP.UI.spinner.hideme);


		//create defaults for all ajax calls within sp
		$( document ).ajaxStart(function() {
			TP.UI.spinner.showme('Loading...');
		});

		$( document ).ajaxComplete(function( event,request, settings ) {
			TP.UI.spinner.hideme();
		});
		$( document ).ajaxError(function( event, request, settings ) {
			TP.UI.spinner.hideme();
			//TP.UI.message.showMessage('An error occured, sorry', 'bad', 1000);
		});
	};
});
