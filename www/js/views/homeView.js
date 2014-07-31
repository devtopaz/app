define([
	'dv',
], function () {
    'use strict';

	//set up homeview
    var HomeView = TP.defaultView.extend({
		el: 'page',
		events: {

		},
        template: JST[
			'templates/home.ejs'
		],
        render: function () {
			$('body').removeClass('edit');
			TP.setTitle('SELECT SOME SEXYNESS');
			this.$el.html(this.template);

			var sexId = {
				0: 'wank',
				1: 'hands',
				2: 'oral',
				3: 'sex',
				4: 'anything'
			};

			if(typeof jQuery.fn.royalSlider === "function"){
				TP.SLIDER = $('.royalSlider').royalSlider({ //Set up slider
					controlNavigation: 'none',
					arrowsNavHideOnTouch: true,
					globalCaption: true,
					globalCaptionInside: true,
					imageScaleMode: 'fit',
					arrowsNav: false
				}).data('royalSlider');

				//if we have the sex nav open on load select the correct class
				if(TP.SEXDEFAULTS.sextype === "default"){
					//make sure no elements have any selected items
					$('sexnav div.selected').removeClass('selected');
					document.getElementById('navwank').setAttribute('class','selected');
				} else{
					//Now navigate to current selection
					TP.SLIDER.goTo($('sexnav div.selected').index());
				}

				TP.SLIDER.ev.on('rsSlideClick', function(el) { //Add click events to the sex icons
					TP.SEXDEFAULTS = TP.sex.sexDefaults(); //used to reset to default sex
					//TP.pageLoad(sexId[TP.SLIDER.currSlideId]);
					TP.pageLoad($('.rsGCaption').find('anchor').attr('id'));
				});

				TP.SLIDER.ev.on('rsAfterSlideChange', function(event) {
					if(TP.HASH === "home"){
						//make sure no elements have any selected items
						$('sexnav div.selected').removeClass('selected');
						document.getElementById('nav'+sexId[TP.SLIDER.currSlideId]).setAttribute('class','selected');
					}
				});
			}else{
				$('.royalSlider a').each(function(){
					var type = $(this)[0].id,
						copiedContent = $(this).find('anchor').clone(),
						newLink = $('<a href="#'+type+'" ></a>');

					//remove old content
					$(this).remove();
					//add relevent image to copied content
					copiedContent.prepend('<img src="img/sex/full/'+type+'.png" >');
					//Add old content to new link
					newLink.append(copiedContent);
					//Create link
					$('.royalSlider').append(newLink);
				});
			}
        }
    });
    return HomeView;
});