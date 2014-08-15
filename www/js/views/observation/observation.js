define([
	'dov'
], function () {
    'use strict';

	//set up homeview
    var observation = TP.defaultView.extend({
		render: function () {
			TP.DOV.render();

			//Set the page's title
			TP.UI.setTitle(TP.DEFAULTS.type + ' Observation');
        }
    });
    return observation;
});