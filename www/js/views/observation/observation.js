define([
	'dov'
], function () {
    'use strict';

	//set up homeview
    var observation = TP.defaultView.extend({
	    events: {
		    'click observation a': 'checkIfWeHaveAnyObservations'
	    },
	    checkIfWeHaveAnyObservations: function(el){
		    var checker = true;

		    Object.keys(TP.CHECKLIST[TP.DEFAULTS.type]).forEach(function(me) {
			    var item = TP.CHECKLIST[TP.DEFAULTS.type][me];
			    Object.keys(item.details).forEach(function(him){
				    var itemList = item.details[him];
				    if(itemList === true) {
					    checker = false;
					    c(itemList);
				    }
			    });
		    });
		    if(checker) {
			    TP.UI.message.showMessage('Please select at least 1 observation', 'bad')
			    el.preventDefault();
		    }
	    },
		render: function () {
			TP.DOV.render();

			//Set the page's title
			TP.UI.setTitle(TP.DEFAULTS.type + ' Observation');
        }
    });
    return observation;
});