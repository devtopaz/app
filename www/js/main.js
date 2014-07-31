/*
==================================================
Table of Contents - Created by Hutber on 04/10/13.
==================================================
 #Require JS Config
 #Require Routes set up
 #Arguments
 #isMobile If
 #TP init
 #Route Vars
 #Routes
 #On Ready
 */

'use strict';
/*==================================================
 Require JS Config
==================================================*/
require.config({
	waitSeconds: 200,
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		date: {
			exports: 'date'
		},
		ui: {
			deps: ['jquery']
		},
		tp: {
			deps: ['ui']
		},
		JST: {
			deps: ['underscore'],
			exports: 'JST'
		},
		dv: {
			deps: ['jquery', 'JST']
		},
		forms: {
			deps: ['jquery']
		},
	},
	paths: {
		jquery: 'libs/jquery.min',
		backbone: 'libs/backbone-min',
		underscore: 'libs/underscore-min',
		modernizr: 'libs/modernizr-dev',
		fastclick: 'libs/plugins/FastClick',
		hammerjs: 'libs/plugins/hammer.min',
		date: 'libs/plugins/date',
		forms: 'libs/plugins/hutber.forms',
		ui : 'functions/sd.functions.ui',
		tp : 'functions/sd.functions.globals',
		ge : 'functions/sd.functions.globalEvents',
		tpl : 'functions/sd.functions.login',
		dv : 'views/defaultView',
		ldv : 'views/loggedinView',
		JST : 'templates'
	}
});

/*==================================================
Routers
==================================================*/
// Requires ----------------
require([
		'backbone',
		'modernizr',
// Routes ----------------
		'routes/router',
// Views ----------------
		'views/indexView',
		'views/homeView',

// Functions -----------------------
		'tp',
		'tpl',
		'dv',
		'ldv',
		'ui',
		'ge',

], function () {
/*==================================================
set arguments to values for ease of reading arguments
================================================== */
    var Backbone = arguments[0],
        Router = arguments[2],
		IndexView = arguments[3],
		HomeView = arguments[4],
		TP = arguments[9],
		myself = arguments;

	/*==================================================
	Start up TP global object.
	================================================== */
	TP.init();

	var runEverthing = function(){
		/*==================================================
		Routes Vars
		================================================== */
		// initiate routers ----------------
		TP.ROUTER = new Router();

		// views ---------------------------
		TP.VIEWS.indexView = new IndexView();
		TP.VIEWS.homeView = new HomeView();

		/*==================================================
		Routes
		================================================== */
		var names = [];
//		names[6] = 'login';
//		names[7] = 'forgotten';
//		names[8] = 'signup';
		var myArgs = myself;

		names.forEach(function(me, key){
			var functionName = me+"View";
			TP.VIEWS[functionName] = new myArgs[key]();
			TP.ROUTER.on('route:'+me, function(){
				TP.VIEWS[functionName].render(); // succeeds
			});
		});

	//# Default router ----------------------------------------------------------------
		TP.ROUTER.on('route:index route:home', function(){
			if(localStorage.getItem('privateKey')!==null){
				TP.VIEWS.homeView.render();
			}else{
				TP.VIEWS.indexView.render();
			}
		});


		TP.DEVICE = function(){
			if(typeof window.device !== "undefined"){
				return window.device.platform;
			}else{
				return 'Android';
			}
		}();

        if(TP.DEVICE)
        //Add which device we are on into the html
            $('html').addClass(TP.DEVICE);
	};

/*==================================================
On Device Ready
================================================== */
	if(TP.isMobile){
		document.addEventListener("deviceready", function(){
			runEverthing();
			Backbone.history.start();
			TP.checkConnection();
		}, true);
	}else{
		$(document).ready(function() {
			runEverthing();
			Backbone.history.start();
		});
	}
});