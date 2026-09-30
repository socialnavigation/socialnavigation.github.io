window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}

////// New Functions ////////////


  document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('#results-carousel video');

    // Function to play a video
    function playVideo(video) {
      if (video && video.paused) {
        video.play();
      }
    }

    // Function to pause a video
    function pauseVideo(video) {
      if (video && !video.paused) {
        video.pause();
        video.currentTime = 0; // Reset to start
      }
    }

    // Intersection Observer options
    const options = {
      root: document.querySelector('#results-carousel'),
      rootMargin: '0px',
      threshold: 0.5 // Adjust based on when you consider a video "visible"
    };

    // Callback for Intersection Observer
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // When video is in view, set preload to auto and play
          const video = entry.target;
          video.setAttribute('preload', 'auto');
          playVideo(video);
        } else {
          // When video is out of view, pause and set preload to none
          const video = entry.target;
          pauseVideo(video);
          video.setAttribute('preload', 'none');
        }
      });
    };

    // Create the Intersection Observer
    const observer = new IntersectionObserver(callback, options);

    // Observe each video element
    videos.forEach(video => {
      observer.observe(video);
    });

    // Optional: Play the initial visible videos on page load
    // This ensures that if videos are already in view when the page loads, they start playing
    videos.forEach(video => {
      const rect = video.getBoundingClientRect();
      const carouselRect = document.querySelector('#results-carousel').getBoundingClientRect();
      const isVisible = (
        rect.top >= carouselRect.top &&
        rect.bottom <= carouselRect.bottom &&
        rect.left >= carouselRect.left &&
        rect.right <= carouselRect.right
      );
      if (isVisible) {
        video.setAttribute('preload', 'auto');
        playVideo(video);
      }
    });
  });

////// New Functions ////////////



$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
	
	// Below slider commented
    //preloadInterpolationImages();

    //$('#interpolation-slider').on('input', function(event) {
    //  setInterpolationImage(this.value);
    //});
    //setInterpolationImage(0);
    //$('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    //bulmaSlider.attach();

})
