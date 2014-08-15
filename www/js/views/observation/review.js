define([
	'dv',
	'save'
], function () {
	'use strict';
	//set up homeview
	var newNew = TP.defaultView.extend({
		el: 'page',
		template: JST['templates/observation/review.ejs'],
		events: {
			'click .deleteObservation':'deleteObservation',
			'click .submitObservation':'submitObservation',
		},
		deleteObservation: function(){
			TP.UI.Dialog('Remove Observation?', 'Are you sure you want to permanently delete this Observation?', ['No', 'Yes'], function(){
				TP.save.removeFromStorage();
				TP.pageLoad('home');
			}, 'confirm');
		},
		submitObservation: function(el){
			var dataToSend = TP.save.prepareDataForSave();

			$.ajax({
				url: TP.AJAX + 'users/addobservation',
				type: 'POST',
				dataType: 'json',
				data: dataToSend,
				error: function (data) {
					TP.save.saveToStoreage(dataToSend);
					TP.pageLoad('failed');
					TP.UI.spinner.hideme();
				},
				success: function (data) {
					//TODO display the error
					if (data.error) {
						TP.UI.spinner.hideme();
						TP.save.saveToStoreage(dataToSend);
						TP.pageLoad('failed');
					} else {
						TP.UI.spinner.hideme();
						TP.save.removeFromStorage();
						TP.pageLoad('success');
					}
				}
			});
		},
		render: function () {
			this.$el.html(this.template());
			TP.UI.setTitle('Review');
		},
	});
	return newNew;
});