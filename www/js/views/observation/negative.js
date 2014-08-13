define([
	'dov'
], function () {
    'use strict';

	//set up homeview
    var wank = TP.defaultObservationView.extend({
		events: {
			"click sexform.blocks > *" : 'openASex',
			"click save" : 'openASex',
		},
		render: function () {
			//Give the non-default values
			var data = this.dataChecker({
				sextype: 'wank',
			});

			//Update the current sex
			TP.CURRENTSEX = 'wank';

			TP.DOV.render(data);

			//Set the page's title
			TP.UI.setTitle('New Observation');
        }
    });
    return wank;
});