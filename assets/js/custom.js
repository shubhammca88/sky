(function($){
	"use strict";

	// Mean Menu
	$('.mean-menu').meanmenu({
		meanScreenWidth: "991"
	});

	// Header Sticky
	$(window).on('scroll',function() {
		if ($(this).scrollTop() > 0){
			$('.navbar-area').addClass("is-sticky");
		}
		else{
			$('.navbar-area').removeClass("is-sticky");
		}
	});

	// Magnific Popup
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	// Upcoming Courses Slides
	$('.upcoming-courses-slides').owlCarousel({
		nav: true,
		loop: true,
		margin: 25,
		dots: false,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='fa-solid fa-chevron-left'></i>",
			"<i class='fa-solid fa-chevron-right'></i>"
		],
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 1
			},
			768: {
				items: 2
			},
			992: {
				items: 2
			},
			1200: {
				items: 2
			}
		}
	});

	// Feedback Slides
	$('.feedback-slides').owlCarousel({
		items: 1,
		nav: false,
		loop: true,
		margin: 25,
		dots: true,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='fa-solid fa-chevron-left'></i>",
			"<i class='fa-solid fa-chevron-right'></i>"
		]
	});
	$('.feedback-slides2').owlCarousel({
		items: 1,
		nav: true,
		loop: true,
		margin: 25,
		dots: false,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='fa-solid fa-arrow-left'></i>",
			"<i class='fa-solid fa-arrow-right'></i>"
		]
	});

	// Testimonials Slides
	$('.testimonials-slides').owlCarousel({
		nav: false,
		loop: true,
		margin: 25,
		dots: true,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='fa-solid fa-chevron-left'></i>",
			"<i class='fa-solid fa-chevron-right'></i>"
		],
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 2
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			},
			1200: {
				items: 3
			},
			1600: {
				items: 4
			}
		}
	});


	// Partners Slides
	$('.partners-slides').owlCarousel({
		nav: false,
		loop: true,
		margin: 25,
		dots: false,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='fa-solid fa-chevron-left'></i>",
			"<i class='fa-solid fa-chevron-right'></i>"
		],
		responsive: {
			0: {
				items: 2
			},
			576: {
				items: 4
			},
			768: {
				items: 3
			},
			992: {
				items: 4
			},
			1200: {
				margin: 40,
				items: 4
			},
			1400: {
				margin: 40,
				items: 5
			},
			1600: {
				margin: 50,
				items: 6
			}
		}
	});



	// scrollCue
	scrollCue.init();

	// Password Show/Hide
	$('#togglePassword').on('click', function() {
        let passwordInput = $('#passwordInput');
        let icon = $(this).find('i');
        
        // Toggle the password field type
        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        } else {
            passwordInput.attr('type', 'password');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        }
    });


	// Go to Top
	$(function(){
		// Scroll Event
		$(window).on('scroll', function(){
			var scrolled = $(window).scrollTop();
			if (scrolled > 600) $('.go-top').addClass('active');
			if (scrolled < 600) $('.go-top').removeClass('active');
		});  
		// Click Event
		$('.go-top').on('click', function() {
			$("html, body").animate({ scrollTop: "0" },  0);
		});
	});

	// Hero Slideshow
	document.addEventListener('DOMContentLoaded', function () {
		const slides = document.querySelectorAll('.hero-slide');
		let currentSlide = 0;

		function showNextSlide() {
			slides[currentSlide].classList.remove('active');
			currentSlide = (currentSlide + 1) % slides.length;
			slides[currentSlide].classList.add('active');
		}

		// Change slide every 3 seconds
		setInterval(showNextSlide, 3000);
	});


	// Registration form handling
	document.addEventListener('DOMContentLoaded', function() {
		const registrationForm = document.querySelector('.registration-form');
		if (registrationForm) {
			registrationForm.addEventListener('submit', function(e) {
				const submitBtn = document.querySelector('button[type="submit"]');
				const originalText = submitBtn.textContent;
				submitBtn.textContent = 'Submitting...';
				submitBtn.disabled = true;

				const hiddenIframe = document.querySelector('iframe[name="hidden_iframe"]');
				if (hiddenIframe) {
					hiddenIframe.addEventListener('load', function() {
						document.querySelector('.registration-form').style.display = 'none';
						document.querySelector('#success-message').style.display = 'block';
						window.scrollTo(0, 0);
					});
				} else {
					// Fallback if iframe not found
					setTimeout(function() {
						document.querySelector('.registration-form').style.display = 'none';
						document.querySelector('#success-message').style.display = 'block';
						window.scrollTo(0, 0);
					}, 2000);
				}
			});

			// File handling with base64 encoding and size validation (max 1MB)
			['id_proof', 'qualification_cert', 'supporting_docs'].forEach(function(name) {
				const input = document.querySelector('input[name="' + name + '"]');
				if (input) {
					input.addEventListener('change', function() {
						var file = this.files[0];
						if (file) {
							if (file.size > 1048576) {
								alert('File size must be less than 1MB');
								this.value = '';
								return;
							}
							var reader = new FileReader();
							reader.onload = function(e) {
								var data = e.target.result;
								var base64 = data.split(',')[1];
								document.querySelector('input[name="' + name + '_data"]').value = base64;
								document.querySelector('input[name="' + name + '_filename"]').value = file.name;
								document.querySelector('input[name="' + name + '_type"]').value = file.type;
							};
							reader.readAsDataURL(file);
						}
					});
				}
			});
		}
	});

}(jQuery));