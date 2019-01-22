'use strict';


$(function(){

	//configuration
	var width = 450;
	var animationSpeed = 1000;
	var pause = 3000;
	var currentSlide = 1;

	//cache DOM
	var $slider = $('#slider');
	var $slideContainer = $slider.find('.slides');
	var $slides = $slideContainer.find('.slide');

	var interval;

	function startSlider(){
		    console.log("interval STARTED");
		    interval = setInterval(function(){
					$slideContainer.animate({'margin-left': '-='+width}, animationSpeed, function(){
						console.log("animation DONE");
						currentSlide++;
						if (currentSlide === $slides.length){
							currentSlide = 1;
							$slideContainer.css('margin-left', 0);
						}
					});
				}, pause);
	}

	function stopSlider(){
		clearInterval(interval);
		console.log("interval STOPED");
	}

	$slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);

	startSlider();
});
