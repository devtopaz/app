/**
 * Created by Hutber on 04/02/14.
 */
define([
	'hammerjs',
], function (Hammer) {
	'use strict';
// #Set up the Deult router view ------------------------------------------------------
	TP.defaultView = function(){ //Default controller for all views
		//extend the view with the default home view
		var DefaultView = Backbone.View.extend({
			el: 'body > shell',
			events: { //Add click events for global clicks
				'click logo a': 'goHome',
			},
			doLogOut: function(){
				TP.login.doLogOut();
			},
			goHome: function(){
				TP.ROUTER.navigate('home', true);
				return false;
			},
			globalClass: function(){
				//default class
				var desiredClass = 'selector';


				if(window.location.hash !== ''){
					desiredClass = TP.HASH;
				}

				//Add new class to body
				document.body.removeAttribute('class');
				document.body.setAttribute('class',desiredClass); //Update class on body
			},
			render: function () {
				//Output correct template
				this.$el.html(JST['templates/comp/shell.ejs']);//Add type to html
				$('html').removeClass('positive');
			},
		});
		TP.DV = new DefaultView();
		TP.DV.render();
		return DefaultView;
	}();

});