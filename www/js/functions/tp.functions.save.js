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
			var tmpObject = {},
				//stringData = '{"type":"positive","comment":"as","vessel":"Titanic","time":"2014-08-14 11:21:01Z","user":"22","pkey":"374ca085f7d86291ee3389fc5e2fd331"}',
				//tmp = JSON.parse(stringData),
				tempStorage = JSON.parse(localStorage.pending);
			if(tmp){data = tmp};
			if(typeof tempStorage === "object"){
				tmpObject = tempStorage;
			}
			//write to an object if we do more than one observation without internet
			tmpObject[tmp.time] = data;
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
			Object.keys(TP.CHECKLIST[TP.OBDEFAULTS.type]).forEach(function(me) {
				var item = TP.CHECKLIST[TP.OBDEFAULTS.type][me];
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
				type: TP.OBDEFAULTS.type,
				comment: TP.OBDEFAULTS.comment,
				vessel: TP.OBDEFAULTS.vessel,
				time: TP.OBDEFAULTS.time.toString('u'),
				user: localStorage.uid,
				pkey: localStorage.pkey
			};

			data.observations = JSON.stringify(this.getCurrentlySelected());
			c(data);
			return data;
		},
		reset: function(){
			TP.CHECKLIST = TP.OB.checkListDefault();
			TP.OBDEFAULTS = TP.OB.defaults();
		}
	};

	return TP;
});