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
				'click .done': 'render'
			},
			openAOption: function(el){
				var myself = this,
					item = $(el.currentTarget);
					TP.DEFAULTS.title = item.find('span').html(),
					TP.DEFAULTS.name = item.find('input').attr('name'),
				TP.pageLoad(TP.DEFAULTS.name);
			},
			checkABox: function(el){
				var currentMe = $(el.currentTarget),
					inputMe = currentMe.find('input'),
					name = inputMe.attr('name');
					inputMe.attr('checked', 'checked');
					TP.CHECKLIST[TP.DEFAULTS.type][TP.DEFAULTS.name]['state'] = true;
					TP.CHECKLIST[TP.DEFAULTS.type][TP.DEFAULTS.name].details[name] = true;
				//TP.save.prepareDataForSave()
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

				//Update generated html with new updated details
				this.loadPrevious.pre();
				$('observation').html(TP.DOV.ownView(data));
				this.loadPrevious.post();
				//Remove Classes and then readd them
				$('html').removeClass('positive').removeClass('negative').addClass(TP.DEFAULTS.type);
			}
		});

		TP.DOV = new observationView();
		return observationView;
	}();
});