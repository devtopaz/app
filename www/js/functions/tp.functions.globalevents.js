/*
 ==================================================
 Table of Contents - Created by Hutber on 17/05/14.
 ==================================================
 */
define([
], function () {


	TP.globalEvents = {};

	TP.globalEvents.onHashChange = function(){
		//make sure we are logged in, if we are not forward back to home page
		TP.login.checkLoginState();

		//Updated previous hash
		TP.PREVIOUSHASH = TP.HASH;

		//Update the new hash
		TP.HASH = window.location.hash.substring(1);

		//On page load update body class with current page
		TP.DV.globalClass();

		//Resize the $('page') element
		TP.changeHeightofContent();

		//update menu items with selected item
		$('menu a.selected').removeAttr('class');
		$('menu a[data-id='+TP.HASH+']').addClass('selected');
	};

	return TP;
});