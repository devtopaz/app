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
			c(localStorage.pending)
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
			var myself = this,
				data = {
				type: TP.DEFAULTS.type,
				comment: TP.DEFAULTS.comment,
				vessel: TP.DEFAULTS.vessel,
				time: TP.DEFAULTS.time.toString('u'),
				user: localStorage.uid,
				pkey: localStorage.pkey
			};

			data.observations = JSON.stringify(this.getCurrentlySelected());
			c(data);
			return data;
		},
		reset: function(){
			TP.CHECKLIST = TP.OB.checkListDefault();
			TP.DEFAULTS = TP.OB.defaults();
		}
	};

	return TP;
});