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
	TP.PAGINATION = 1;
	TP.HASH = '';
	TP.PREVIOUSHASH = '';
	TP.VIEWS = {};
	TP.VESSELS = {
		MENA: [
			'DMS Challenger 1',
			'DMS Challenger 2',
			'DMS Challenger 3',
			'DMS Conqueror',
			'DMS Courageous',
			'DMS Fortune',
			'TEAM Muscat',
			'TOPAZ Addax',
			'TOPAZ Jaddaf',
			'TOPAZ Jafiliya',
			'TOPAZ Jebel Ali',
			'TOPAZ Jumeirah',
			'TOPAZ Karama',
			'TOPAZ Karzakkan',
			'TOPAZ Khalidiya',
			'TOPAZ Khobar',
			'TOPAZ Khubayb',
			'TOPAZ Khuwair',
			'TOPAZ Rayyan',
			'TOPAZ Salalah',
			'TOPAZ Shaheen',
			'TOPAZ Zenith',
			'TOPAZ Zephyr',
			'Doha Office',
			'Doha Workshop / Stores',
		],
		Global: [
			'TOPAZ Amani',
			'TOPAZ Captain',
			'TOPAZ Commander',
			'TOPAZ Faye',
			'TOPAZ Fujairah',
			'TOPAZ Installer',
			'TOPAZ Johor',
			'TOPAZ Jurong',
			'TOPAZ Oryx',
			'TOPAZ Seema',
			'TOPAZ Sophie',
			'TOPAZ Xara',
			'Jebel Ali Office',
			'Port Harcourt Office',
		],
		Caspian: [
			'BUE Chu',
			'BUE Darya',
			'BUE Emba',
			'BUE Ili',
			'BUE Irtysh',
			'BUE Ishim',
			'BUE Naryn',
			'BUE Ob',
			'BUE Tekes',
			'BUE Tobol',
			'Caspian Challenger',
			'Caspian Endeavour',
			'Caspian Power',
			'Caspian Pride',
			'Caspian Protector',
			'Caspian Provider',
			'Caspian Qala',
			'Caspian Reliance',
			'Caspian Server',
			'Caspian Supplier',
			'Caspian Supporter',
			'Caspian Voyager',
			'Citadel',
			'DMS 2000',
			'Fortress',
			'Islay',
			'Jura',
			'Sanmar 1',
			'TOPAZ Arrow',
			'TOPAZ Dignity',
			'TOPAZ Glory',
			'TOPAZ Legend',
			'TOPAZ Triumph',
			'Tulpar',
			'Aktau Office',
			'Astrakhan Office',
			'Baki',
			'Baku Office',
			'Bautino Base',
		],
		Corporate: [
			'Almas Office',
			'Jebel Ali Office',
		]
	};
	/*
	 [
	 'TOPAZ Jumeirah',
	 'TOPAZ Khuwair',
	 'TOPAZ Zephyr',
	 'DMS Courageous',
	 'TOPAZ Zenith',
	 'DMS Conqueror',
	 'DMS Challenger 1',
	 'DMS Challenger 2',
	 'DMS Challenger 3',
	 'DMS Fortune',
	 'TOPAZ Jaddaf',
	 'TOPAZ Jebel Ali',
	 'TOPAZ Karama',
	 'TOPAZ Karzakkan',
	 'TOPAZ Khalidiya',
	 'TOPAZ Khobar',
	 'TOPAZ Khubayb',
	 'TOPAZ Rayyan',
	 'TOPAZ Shaheen',
	 'TOPAZ Salalah',
	 'TOPAZ Jafiliya',
	 'TEAM Muscat',
	 'NIGERIA – Port Harcourt Office',
	 'UAE - Jebel Ali Office',
	 'UAE – Corporate Office',
	 'QATAR – Doha Office',
	 'QATAR – Warehouse & Stores',
	 ]
	 */
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
				TP.CONNECTION === "none" && localStorage.getItem('uid') !== null
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

		//Set up scripts to get loaded depending on envoiment
		if(TP.isMobile || TP.ENVIROMENT==="liveApp"){
			if(!TP.WEBSITE) {
				TP.login.lookIfWeNeedPin();

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
