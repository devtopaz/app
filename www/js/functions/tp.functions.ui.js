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

	TP.changeHeightofContent = function(){
		var header = $('.header');
		if(header.is(':visible')) {
			TP.pageHeight = $('body').outerHeight() - header.outerHeight();
		}else{
			TP.pageHeight = $('body').outerHeight();
		}
		$('page').css({height: TP.pageHeight});
	};

	return TP;
});