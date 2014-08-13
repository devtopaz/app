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
			c(data);
		},
		convertObservation: function(name){
			var tmpName;

			tmpName = name;

			return tmpName;
		},
		prepareDataForSave: function(){
			var myself = this,
				data = {
				type: TP.OBDEFAULTS.type,
				comment: TP.OBDEFAULTS.comment,
				vessel: TP.OBDEFAULTS.vessel,
				time: TP.OBDEFAULTS.time.toString('u'),
				user: localStorage.uid,
				pkey: localStorage.pkey,
				observations: {}
			};

			Object.keys(TP.CHECKLIST[TP.OBDEFAULTS.type]).forEach(function(me) {
				var item = TP.CHECKLIST[TP.OBDEFAULTS.type][me];
				if (item.state === true) {
					if(typeof data.observations[me] !== "object") {
						data.observations[me] = {};
					}
					Object.keys(item.details).forEach(function(him){
						var itemList = item.details[him];
						if(itemList === true) {
							data.observations[me][myself.convertObservation(him)] = 1;
						}
					});
				}
			});
			data.observations = JSON.stringify(data.observations);
			return data;
		}
	};

	return TP;
});