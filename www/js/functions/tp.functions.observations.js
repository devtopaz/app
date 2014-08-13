/*
 ==================================================
 Table of Contents - Created by Hutber on 12/08/14.
 ==================================================
 */
define([
], function () {

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
				list: null,
			}
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
						title: 'User of procedures and Standards',
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
						title: 'Tasks Preparation &amp; Planning',
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
						title: 'Use of PPE',
						state: false,
						details: {
							'Word head safety equipment correctly': false,
							'Protected eyes and face correctly': false,
							'Protected ears correctly': false,
							'Wore appropriate breathing protecting kit': false,
							'Protected arm and hands correctly': false,
							'Wore appropriate body protection kit': false,
							'Protected legs and feet correctly': false,
						}
					},
					tools: {
						title: 'Use of Tools & Equipment',
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
						title: 'User of procedures and Standards',
						state: false,
						dbname: false,
						details: {
							'Person used inadequate procedures': false,
							'Person did not know / understand correct procedures': false,
							'Person did not follow procedures': false,
							'Orderly standard were not being met': false,
							'Orderly standards were not known / understood': false,
							'Orderly standards were not followed': false,
						}
					},
					preparation: {
						title: 'Tasks Preparation &amp; Planning',
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
						title: "'Line of Fire' - Position of Personnel",
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
							'Did not wear appropriate breathing protecting kit': false,
							'Did not protect arm and hands correctly': false,
							'Did not wear appropriate body protection kit': false,
							'Did not protect legs and feet correctly': false,
						}
					},
					tools: {
						title: 'Use of Tools & Equipment',
						state: false,
						details: {
							'Person used to wrong tools for the job': false,
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