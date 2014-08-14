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
		ui : 'functions/tp.functions.ui',
		tp : 'functions/tp.functions.globals',
		ge : 'functions/tp.functions.globalEvents',
		tpl : 'functions/tp.functions.login',
		ob : 'functions/tp.functions.observations',
		save : 'functions/tp.functions.save',
		dv : 'views/defaultView',
		dov : 'views/defaultObservationView',
		ldv : 'views/loggedinView',
		JST : 'templates'
	}
});

/*==================================================
Routers
==================================================*/
// Requires -----------------------
require([
		'backbone',
		'modernizr',
// Routes -------------------------
		'routes/router',
// Views --------------------------
		'views/indexView',
		'views/homeView',
		'views/signUpView',
		'views/forgottenView',

// Users----------------------------
		'views/users/setpin',
		'views/users/confirmpin',
		'views/users/pinsave',
		'views/users/pin',
		'views/users/settings',

// Observations---------------------
		'views/observation/new',
		'views/observation/observation',
		'views/observation/reinforce',
		'views/observation/review',
		'views/observation/observationdetails',
		'views/observation/comments',
		'views/observation/success',
		'views/observation/failed',

// Functions -----------------------
		'tp',
		'tpl',
		'ob',
		'dv',
		'dov',
		'ldv',
		'ui',
		'save',
		'ge',
		'date',

], function () {
/*==================================================
set arguments to values for ease of reading arguments
================================================== */
    var Backbone = arguments[0],
        Router = arguments[2],
		IndexView = arguments[3],
		HomeView = arguments[4],
		TP = arguments[27],
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
		names[5] = 'signup';
		names[6] = 'forgotten';
		names[7] = 'setpin';
		names[8] = 'confirmpin';
		names[9] = 'pinsave';
		names[10] = 'pin';
		names[11] = 'settings';
		names[12] = 'new';
		names[13] = 'observation';
		names[14] = 'reinforce';
		names[15] = 'review';
		names[16] = 'observationdetails';
		names[17] = 'comments';
		names[18] = 'success';
		names[19] = 'failed';
		var myArgs = myself;

		names.forEach(function(me, key){
			var functionName = me+"View";
			TP.VIEWS[functionName] = new myArgs[key]();
			TP.ROUTER.on('route:'+me, function(){
				if(TP.OBDEFAULTS.type===null && (
						me === "observation" ||me === "reinforce" ||me === "review" ||me === "observationdetails" || me === "comments"
					)
				){
					TP.pageLoad('new');
				}else {
					TP.VIEWS[functionName].render(); // succeeds
				}
			});
		});

		TP.ROUTER.on('route:positive route:negative', function(){
			if(TP.OBDEFAULTS.type===null){
				TP.pageLoad('new');
			}else {
				TP.VIEWS.observation.render(); // succeeds
			}
		});

	//# Details Routers ----------------------------------------------------------------
	var details = []
		details[0] = 'procedures';
		details[1] = 'preparation';
		details[2] = 'lineoffire';
		details[3] = 'ppe';
		details[4] = 'tools';

	details.forEach(function(me){
		TP.ROUTER.on('route:'+me, function(){
			if(TP.OBDEFAULTS.type===null){
				TP.pageLoad('new');
			}else {
				TP.VIEWS.observationdetails.render(); // succeeds
			}
		});
	});


	//# Default router ----------------------------------------------------------------
		TP.ROUTER.on('route:index route:home', function(){
			if(localStorage.getItem('uid')!==null){
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