/**
 * Created by Hutber on 04/02/14.
 */
define([
	'dv',
	'date'
], function () {
	'use strict';

	var Date = arguments[1];

	// The default view ----------------------------------------------------------
	TP.defaultObservationView = function(){
		//set up homeview
		var observationView = TP.defaultView.extend({
			el: 'page',
			template: JST['templates/observation/observationTemplate.ejs'],
			ownView: JST['templates/observation/observation.ejs'],
			events: {
				'click observation .observationselector li': 'openAOption',
				'click observation .detailsbox li': 'checkABox',
				'click observation .detailsbox li input': 'checkAInput',
				'click .done': 'render'
			},
			openAOption: function(el){
				var myself = this,
					item = $(el.currentTarget);
					TP.DEFAULTS.title = item.find('span').html(),
					TP.DEFAULTS.name = item.find('input').attr('name'),
				TP.pageLoad(TP.DEFAULTS.name);
			},
			checkAInput: function(el){
				var inputMe =  $(el.currentTarget),
					name = inputMe.attr('name'),
					inputs = $('input[type=checkbox]');

				//Do we tick the box or not
				if(inputMe.prop('checked')===true){
					inputMe.prop('checked', false);
					TP.CHECKLIST[TP.DEFAULTS.type][TP.DEFAULTS.name].details[name] = false;
					//loop through all of the inputs to see if any are unticked,
					// if they are remove their value from TP.CHECKLIST
					var isChecked = 0;
					inputs.each(function(){
						if($(this).prop('checked')===true) isChecked += 1;
					});
					if(isChecked===0) TP.CHECKLIST[TP.DEFAULTS.type][TP.DEFAULTS.name]['state'] = false;
				}else {
					inputMe.prop('checked', true);
					TP.CHECKLIST[TP.DEFAULTS.type][TP.DEFAULTS.name]['state'] = true;
					TP.CHECKLIST[TP.DEFAULTS.type][TP.DEFAULTS.name].details[name] = true;
				}

				el.preventDefault();
				el.stopPropagation();
			},
			checkABox: function(el){
				var currentMe = $(el.currentTarget),
					inputMe = currentMe.find('input'),
					name = inputMe.attr('name'),
					inputs = $('input[type=checkbox]'),
					inputState = currentMe.data('checked');

				//Do we tick the box or not
				if(inputMe.prop('checked')===true){
					inputMe.prop('checked', false);
					TP.CHECKLIST[TP.DEFAULTS.type][TP.DEFAULTS.name].details[name] = false;
					//loop through all of the inputs to see if any are unticked,
					// if they are remove their value from TP.CHECKLIST
					var isChecked = 0;
					inputs.each(function(){
						if($(this).prop('checked')===true) isChecked += 1;
					});
					if(isChecked===0) TP.CHECKLIST[TP.DEFAULTS.type][TP.DEFAULTS.name]['state'] = false;
				}else {
					inputMe.prop('checked', true);
					TP.CHECKLIST[TP.DEFAULTS.type][TP.DEFAULTS.name]['state'] = true;
					TP.CHECKLIST[TP.DEFAULTS.type][TP.DEFAULTS.name].details[name] = true;
				}
			},
			loadPrevious: {
				that: this,
				pre: function(){
				},
				post: function(){
				}
			},
			render: function (data) {
				//update the website with the current view
				var compiled = this.template();
				this.$el.html(compiled);
				TP.OB.setPagination(1);

				//Update generated html with new updated details
				this.loadPrevious.pre();
				$('observation').html(TP.DOV.ownView(data));
				this.loadPrevious.post();
				//Remove Classes and then readd them
				$('html').removeClass('positive').removeClass('negative').addClass(TP.DEFAULTS.type);
				$('page').animate({
					scrollTop: 0
				}, 500);
			}
		});

		TP.DOV = new observationView();
		return observationView;
	}();
});