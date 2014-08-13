define([
	'dov'
], function () {
    'use strict';

	//set up homeview
    var observation = TP.defaultObservationView.extend({
		render: function () {
			TP.DOV.render();

			//Set the page's title
			TP.UI.setTitle(TP.OBDEFAULTS.type + ' Observation');
        }
    });
    return observation;
});