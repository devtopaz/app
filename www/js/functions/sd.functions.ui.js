/*
 ==================================================
 Table of Contents - Created by Hutber on 17/05/14.
 ==================================================
 */
define([
], function () {

	TP.UI = {};

	/*==================================================
	Display functions
	================================================== */
	//#Update title
	TP.UI.setTitle = function(title){
		$('.title').html(title);
	};

	/*==================================================
	Dialogs
	================================================== */
	TP.UI.Dialog = function(title, message, button, callback, type){
		if(typeof type === "undefined"){
			type = 'alert';
		}
		if(typeof navigator.notification !== "undefined"){
			navigator.notification[type](message, function(button){
				if(button===2){
					callback();
				}
			}, title, button);
		}else{
			if(type === "alert"){
				alert(title + ' '+ message);
			}else if (type === "confirm"){
				if(confirm(title + ' '+ message)){
					callback();
				}
			}
		}
	};

	/*==================================================
	Loading
	================================================== */
	TP.UI.spinner = {
		timer: null,
		overlay: $('overlay'),
		showme: function(message, title, timer){
			if(message === null){
				message = 'Loading...';
			}
			if(timer){
				TP.UI.spinner.timer = window.setTimeout(TP.UI.spinner.displayCloseButton , 5000);
			}
			this.overlay.find('span').text(message);
			this.overlay.addClass('display');
		},
		hideme: function(){
			window.clearTimeout(TP.UI.spinner.timer);
			this.overlay.removeClass('display');
		},
		displayCloseButton: function(){
			TP.UI.spinner.showme();
		}
	};

	//update details on page load
	TP.UI.pageLoad = function(pageToLoad){
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

	TP.UI.message = {
		timer: null,
		showMessage: function(message, type, duration){
			if(typeof duration === "undefined") duration = 5000;
			$('messageBox message').find('div').html(message);
			$('messageBox').removeAttr('class').attr('class',type+' show');
			this.timer = setTimeout(this.hideMessage, duration);
		},
		hideMessage: function(){
			$('messageBox').removeClass('show');
			clearTimeout(this.timer);
		}
	};

	//set up click event to hide
	$('messageBox').on('click', TP.UI.message.hideMessage);

	/*==================================================
	Formatting Results
	================================================== */
	//#SEXNUMBERS ------------------------------------------------------
	TP.format = {
		toString: function(sex){
			var val = 'Anything';
			switch (sex) {
				case (1):
					val = 'Wank';
					break;
				case (2):
					val = 'Hands';
					break;
				case (3):
					val = 'Oral';
					break;
				case (4):
					val = 'Sex';
					break;
				case (5):
					val = 'Anything';
					break;
			}
			return val;
		},
		convertToLocal: function(item, target){
			if(typeof item !=="undefined"){
				JSON.parse(item).forEach(function(me){
					if(typeof me==="object"){
						var sexName = me.sexType,
							sexNumber = +me.no;

						switch (sexName){
							case "1":
								target.Wank = sexNumber;
								break;
							case "2":
								target.Hands = sexNumber;
								break;
							case "3":
								target.Oral = sexNumber;
								break;
							case "4":
								target.Sex = sexNumber;
								break;
							case "5":
								target.Anything = sexNumber;
								break;
						}
					}else{
						target.total = me;
					}
				});
			}
		}
	};

	TP.changeHeightofContent = function(){
		if($('footer').is(':visible')){
			TP.pageHeight = $('body').outerHeight() - ($('header').outerHeight() + $('footer').outerHeight());
		}else{
			TP.pageHeight = $('body').outerHeight() - ($('header').outerHeight());
		}
		$('page').css({height:TP.pageHeight});
	};

	return TP;
});