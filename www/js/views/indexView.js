/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'dv',
], function ($, _, Backbone, JST) {
    'use strict';

    var IndexView = TP.defaultView.extend({
		el: 'page',
		events: {
			'submit .loginForm ': 'logUserIn',
		},
        template: JST['templates/index.ejs'],
		logUserIn: function (el) {

			var me = $(el.currentTarget),
				values = me.serializeObject(),
				noerror = true;

			//check for all errors
			me.find('.error').removeClass('error');

			//add errors
			if(values.email === ""){
				$('#email').parent().addClass('error');
				noerror = false;
			}
			if(values.pword === ""){
				$('#pword').parent().addClass('error');
				noerror = false;
			}

			if(noerror){
				TP.login.doLogin.doAjax(values);
			}
			return false;
		},
        render: function () {
            this.$el.html(this.template);
        }
    });
    return IndexView;
});