document.addEventListener('DOMContentLoaded',function() {
	const slide = document.querySelectorAll('.slide');
	const fullscreenKeyPressed = code => code === 70;
	const leftKeyPressed = code => code === 37;
	const rightKeyPressed = code => code === 39;
	let isfullScreen = false;
	document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;

	/*Fullscreen Code Copied From Online*/

	function requestFullscreen(element) {
	    if (element.requestFullscreen) {
	        element.requestFullscreen();
	    } else if (element.mozRequestFullScreen) {
	        element.mozRequestFullScreen();
	    } else if (element.webkitRequestFullScreen) {
	        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	    }
	}

	function exitFullscreen() {
		if (document.exitFullscreen) {
		    document.exitFullscreen();
		}
		else if (document.mozCancelFullScreen) {
		    document.mozCancelFullScreen();
		}
		else if (document.webkitCancelFullScreen) {
		    document.webkitCancelFullScreen();
		}
		else if (document.msExitFullscreen) {
		    document.msExitFullscreen();
		}
	}

	function handleHashChange() {
		const getSlideNumber = window.location.hash === '' ? 0 : (window.location.hash.slice(1) - 1);
		return getSlideNumber;
	}

	let CURRENT_SLIDE = handleHashChange() || 0;

	function showCurrentSlideOnly(index) {
		slide.forEach(a => {
			a.classList.remove('show');
			a.classList.add('hide');
		});
		slide[index].classList.remove('hide');
		slide[index].classList.add('show');
	}

	document.addEventListener('keyup', function(e) {
		if (document.fullscreenEnabled && fullscreenKeyPressed(e.keyCode)) {
		    if(!isfullScreen)
		    	requestFullscreen(document.documentElement);
		    else exitFullscreen();
		    isfullScreen = !isfullScreen;

		}

		if (leftKeyPressed(e.keyCode)) {
			if(CURRENT_SLIDE > 0) {
				window.location.hash = `#${CURRENT_SLIDE}`;
				CURRENT_SLIDE -= 1;
				showCurrentSlideOnly(CURRENT_SLIDE);
			}

		}
		if (rightKeyPressed(e.keyCode)) {
			if(CURRENT_SLIDE < slide.length-1) {
				CURRENT_SLIDE += 1;
				showCurrentSlideOnly(CURRENT_SLIDE);
				window.location.hash = `#${CURRENT_SLIDE + 1}`;
			}
		}
	});

	showCurrentSlideOnly(handleHashChange());
});
