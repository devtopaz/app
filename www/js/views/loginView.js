/*global define*/
define([
	'dv'
], function () {
    'use strict';

    var LoginView = TP.defaultView.extend({
		el: 'page',

        template: JST['templates/login/login.ejs'],

        render: function () {
            this.$el.html(this.template);
        },
		data: {
			site: TP.liveApp
		},
        events: {
            'submit .loginForm ': 'logUserIn',
        },
        logUserIn: function (elem) {
			var items = $(elem.currentTarget).find('input'),
				noerror = true;
			items.each(function (himself){
				var myDad = $(this).parent();
				if($(this).val()===""){
					myDad.addClass('error');
					noerror = false;
				}else {
					myDad.removeClass('error');
				}
			});

			if(noerror){
				TP.spinner.showme('Logging you in...');
				TP.login.doLogin.doAjax($(elem.currentTarget).serializeObject());
			}
            return false;
        }
    });
    return LoginView;
});