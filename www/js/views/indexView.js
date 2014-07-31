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
        template: JST['templates/index.ejs'],
        render: function () {
            this.$el.html(this.template);
			$('.loginForm').submit(function(){
				var values = $(this).serializeObject();
				//check for all errors
				$(this).find('.error').removeClass('error');

				//add errors
				if(values.uname === ""){
					$('#uname').parent().addClass('error');
				}
				if(values.pword === ""){
					$('#pword').parent().addClass('error');
				}

				return false;
			});
        }
    });
    return IndexView;
});