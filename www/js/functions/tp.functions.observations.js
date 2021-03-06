/*
 ==================================================
 Table of Contents - Created by Hutber on 12/08/14.
 ==================================================
 */
define([
	'date'
], function () {
	"use strict";

	/*==================================================
	Pbservation functions
	================================================== */
	TP.OB = {
		defaults:function() {
			return {
				type: null,
				title: null,
				name: null,
				time: null,
				comment: null,
				region: null,
				vessel: null,
				edit: false
			}
		},
		reBuild:function(data) {

			var item = JSON.parse(localStorage.pending)[data],
				info = {};
			info = {
				type:item.type,
				time: new Date(item.time),
				comment: item.comment,
				region: item.region,
				vessel: item.vessel,
				edit: true,
			};
			this.buildList(item);
			return info;
		},
		buildList: function(data){
			//get the correct top level observations from localstorage
			var observations = JSON.parse(data.observations);
			//Now loop through all of the checklist's top level items
			Object.keys(observations).forEach(function(me){
				//now build each cetagory so we can work with them
				var listItem = TP.CHECKLIST[data.type][me],
					//take the previously selected observation items into one var
					observationItem = observations[me];
				//loop through every single individual possible observation if the top level item has been selected
				Object.keys(listItem.details).forEach(function(him){
					//now loop through each of the previously selected observation items from the old observation
					Object.keys(observationItem).forEach(function(observationFromLocalStorage){
						//if it has been selected make it = true
						if(him===observationFromLocalStorage){
							TP.CHECKLIST[data.type][me].state = true;
							TP.CHECKLIST[data.type][me].details[observationFromLocalStorage] = true;
						}
					});
				});
			});
		},
		setPagination: function(howMany){
			var happened = 0;
			$('.pagination .circle').each(function(){
				$(this).removeClass('selected');
				if(happened<howMany){
					$(this).addClass('selected');
				}
				happened += 1;
			});
		},
		checkListDefault:function(){
			return {
				positive: TP.OB.checkList.positive(),
				negative: TP.OB.checkList.negative(),
			}
		},
		checkList:{
			positive: function() {
				return {
					procedures: {
						title: 'Control of Work &amp; Safety Standards',
						state: false,
						details: {
							'CoW procedures were fully applied before work commenced': false,
							'The purpose of CoW procedures were fully understood': false,
							'CoW procedures were successfully applied &amp; closed': false,
							'Safety Standards &amp; housekeeping were applied before work commenced': false,
							'The purpose of Safety Standards &amp; housekeeping were fully understood': false,
							'Safety Standards &amp; housekeeping were followed throughout': false,
						}
					},
					preparation: {
						title: 'Actions to improve Safety',
						state: false,
						details: {
							'Stopped a job safely': false,
							'Adjusted or improved application of control measures': false,
							'Adjusted working position to improve safety': false,
							'Rearranged a task or work site to improve safety': false,
							'Revised CoW procedures &amp; documents following task/environmental change': false,
							'Re­briefed Work Party following task/environmental change': false,
						}
					},
					ppe: {
						title: 'Use of PPE',
						state: false,
						details: {
							'Wore head safety equipment correctly': false,
							'Protected eyes and face correctly': false,
							'Protected ears correctly': false,
							'Wore appropriate respiratory protection equipment': false,
							'Protected hands correctly': false,
							'Wore appropriate fall­prevention equipment': false,
							'Used appropriate protective footwear': false,
						}
					},
					tools: {
						title: 'Use of Tools &amp; Equipment',
						state: false,
						details: {
							'Correct tools &amp; equipment were selected for the task': false,
							'Tools &amp; equipment were used safely throughout': false,
							'All tools &amp; equipment were in a safe, well&#8211;maintained condition': false,
						}
					}
				}
			},
			negative: function() {
				return {
					procedures: {
						title: 'Control of Work &amp; Safety Standards',
						state: false,
						dbname: false,
						details: {
							'CoW procedures were not applied before work commenced': false,
							'The purpose of CoW procedures were not fully understood': false,
							'CoW procedures were not successfully applied or closed': false,
							'Safety Standards &amp; housekeeping were not applied before work commenced': false,
							'The purpose of Safety Standards &amp; housekeeping were not fully understood': false,
							'Safety Standards &amp; housekeeping were not followed throughout': false
						}
					},
					preparation: {
						title: 'Actions affecting Safety',
						state: false,
						details: {
							'Failed to stop a job safely': false,
							'Ineffective or incorrect application of control measures': false,
							'Working position was unsafe': false,
							'Task or work site was not arranged safely': false,
							'Failed to revised CoW procedures &amp; documents following task/environmental change': false,
							'Failed to re­brief Work Party following task/environmental change': false
						}
					},
					lineoffire: {
						title: "Position of Personnel",
						state: false,
						details: {
							'Person struck an object': false,
							'Person was struck by an object': false,
							'Person was caught in / on / between objects': false,
							'Person fell': false,
							'Person contacted extreme temperatures': false,
							'Person contacted electric current': false,
							'Person was exposed to a hazardous substance': false,
							'Person over-exerted': false,
							'Person suffered injury due to repetitive motion': false,
							'Person suffered injury due to awkward position / static posture': false,
						}
					},
					ppe: {
						title: 'Use of PPE',
						state: false,
						details: {
							'Did not wear head safety equipment correctly': false,
							'Did not protect eyes and face correctly': false,
							'Did not protect ears correctly': false,
							'Did not wear appropriate respiratory protection equipment': false,
							'Did not protected hands correctly': false,
							'Did not wear appropriate fall­prevention equipment': false,
							'Did not use appropriate protective footwear': false,
						}
					},
					tools: {
						title: 'Use of Tools &amp; Equipment',
						state: false,
						details: {
							'Incorrect or insufficient tools &amp; equipment were selected for the task': false,
							'Tools &amp; equipment were not used safely': false,
							'Tools &amp; equipment were not in a safe or well&#8211;maintained condition': false,
						}
					}
				}
			}
		}
	};

	return TP;
});