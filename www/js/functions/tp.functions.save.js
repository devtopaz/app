/*
 ==================================================
 Table of Contents - Created by Hutber on 21/05/13.
 ==================================================
 */
define([
	'date'
], function () {
	"use strict";
	/*==================================================
	Login functions
	================================================== */
	TP.save = {
		removeFromStorage: function(){
			if(localStorage.pending){
				var tempStorage = JSON.parse(localStorage.pending);
				//remove item
				delete tempStorage[TP.DEFAULTS.time.toString('u')];
				if(Object.keys(tempStorage).length===0){
					localStorage.removeItem('pending');
				}else{
					//finally resave to locastorage
					localStorage.setItem('pending',JSON.stringify(tempStorage));
				}
			}
			TP.save.reset();
		},
		saveToStoreage: function(data){
			var tmpObject = {};
			if(localStorage.pending){
				var tempStorage = JSON.parse(localStorage.pending);
			}
			if(typeof tempStorage === "object"){
				tmpObject = tempStorage;
			}

			//write to an object if we do more than one observation without internet
			tmpObject[data.time] = data;
			localStorage.setItem('pending',JSON.stringify(tmpObject));

			//Now everything has been saved to local storage wipe everything
			TP.save.reset();
		},
		convertObservation: function(name){
			var tmpName;

			tmpName = name;

			return tmpName;
		},
		getCurrentlySelected: function(){
			var myself = this,
				data = {}
			Object.keys(TP.CHECKLIST[TP.DEFAULTS.type]).forEach(function(me) {
				var item = TP.CHECKLIST[TP.DEFAULTS.type][me];
				if (item.state === true) {
					if(typeof data[me] !== "object") {
						data[me] = {};
					}
					Object.keys(item.details).forEach(function(him){
						var itemList = item.details[him];
						if(itemList === true) {
							data[me][myself.convertObservation(him)] = 1;
						}
					});
				}
			});
			return data;
		},
		prepareDataForSave: function(){
			var data = {
				type: TP.DEFAULTS.type,
				comment: TP.DEFAULTS.comment,
				region: TP.DEFAULTS.region,
				vessel: TP.DEFAULTS.vessel,
				time: TP.DEFAULTS.time.toString('u'),
				user: localStorage.uid,
				pkey: localStorage.pkey
			};

			data.observations = JSON.stringify(this.getCurrentlySelected());
			return data;
		},
		reset: function(){
			TP.CHECKLIST = TP.OB.checkListDefault();
			TP.DEFAULTS = TP.OB.defaults();
			$('html').removeClass('positive').removeClass('negative');
		}
	};

	return TP;
});