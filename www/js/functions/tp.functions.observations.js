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
						title: 'Procedures and Orderliness',
						state: false,
						details: {
							'Person used adequate procedures': false,
							'Person did know / understand correct procedures': false,
							'Person followed procedures correctly': false,
							'Orderly standards were being met': false,
							'Orderly standards were known / understood': false,
							'Orderly standards were being followed': false,
						}
					},
					preparation: {
						title: 'Reactions of People',
						state: false,
						details: {
							'Adjusted protective equipment safely': false,
							'Changed position safely': false,
							'Rearranged a job safely': false,
							'Stopped a job safely': false,
							'Attached grounds safely': false,
							'Performed Lockouts safely': false,
						}
					},
					ppe: {
						title: 'Personal Protective Equipment',
						state: false,
						details: {
							'Wore head safety equipment correctly': false,
							'Protected eyes and face correctly': false,
							'Protected ears correctly': false,
							'Wore appropriate breathing protecting kit': false,
							'Protected arm and hands correctly': false,
							'Wore appropriate body protection kit': false,
							'Protected legs and feet correctly': false,
						}
					},
					tools: {
						title: 'Tools And Equipment',
						state: false,
						details: {
							'Person used the right tools for the job': false,
							'Person used tools correctly': false,
							'Person used tools in a safe condition': false,
						}
					}
				}
			},
			negative: function() {
				return {
					procedures: {
						title: 'Procedures and Orderliness',
						state: false,
						dbname: false,
						details: {
							'Person used inadequate procedures': false,
							'Person did not know / understand correct procedures': false,
							'Person did not follow procedures': false,
							'Orderly standards were not being met': false,
							'Orderly standards were not known / understood': false,
							'Orderly standards were not followed': false,
						}
					},
					preparation: {
						title: 'Reactions of People',
						state: false,
						details: {
							'Failed to adjust protective equipment safely': false,
							'Failed to change position safely': false,
							'Failed to rearrange a job safely': false,
							'Failed to stop a job safely': false,
							'Failed to attach grounds safely': false,
							'Failed to perform Localouts safely': false,
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
						title: 'Personal Protective Equipment',
						state: false,
						details: {
							'Did not wear head safety equipment correctly': false,
							'Did not protect eyes and face correctly': false,
							'Did not protect ears correctly': false,
							'Did not wear appropriate breathing protecting kit': false,
							'Did not protect arm and hands correctly': false,
							'Did not wear appropriate body protection kit': false,
							'Did not protect legs and feet correctly': false,
						}
					},
					tools: {
						title: 'Tools And Equipment',
						state: false,
						details: {
							'Person used wrong tools for the job': false,
							'Person used tools incorrectly': false,
							'Person used tools in an unsafe condition': false,
						}
					}
				}
			}
		}
	};

	return TP;
});