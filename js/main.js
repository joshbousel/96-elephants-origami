$(function(){
	var $htmlBody = $('html, body');
	var donationLevelId;
	
	// Scroll from hero to start of challenge
	$('.yoga-hero .yoga-button').not('.yoga-form__panel .yoga-button').on('click touchend',function(e){
		e.preventDefault();
		
		var offset = $('.yoga-content--challenge').offset();
		$('html, body').animate({ scrollTop: offset.top }, 250);
	});
	
	// Scroll to supporters section
	$('.yoga-supporters-link').on('click touchend',function(e){
		e.preventDefault();
		
		var offset = $('.yoga-supporters').parent().offset();
		$('html, body').animate({ scrollTop: offset.top }, 250);
	});
		
	// Video toggler
	$('.yoga-content__pose-nav__item').on('click touchend',function(e){
		e.preventDefault();
		
		var index = $(this).index();
		var navActiveClass = 'yoga-content__pose-nav__item--is-active';
		var embedActiveClass = 'yoga-content__video__embed--is-active';
		
		
		$('.yoga-content__pose-nav__item').each(function(i){
			if (i == index) {
				$(this).addClass(navActiveClass);
			} else {
				$(this).removeClass(navActiveClass);
			}
		});
		
		$('.yoga-content__video__embed').each(function(i){
			if (i == index) {
				$(this).addClass(embedActiveClass);
			} else {
				$(this).removeClass(embedActiveClass);
			}
		});
	});

	// Donation selection
	$('.yoga-donate__levels__level').on('click touchend',function(e){
		e.preventDefault();
		
		var index = $(this).index();
		donationLevelId = $(this).data("id");
		var activeClass = 'yoga-donate__levels__level--is-active';
				
		$('.yoga-donate__levels__level').each(function(i){
			if (i == index) {
				$(this).addClass(activeClass);
			} else {
				$(this).removeClass(activeClass);
			}
		});
	});
	
	$('.yoga-donate .yoga-button').on('click touchend',function(e){
		e.preventDefault();
		
		var donationLink = 'https://secure3.convio.net/wcs/site/Donation2?df_id=10241&mfc_pref=T&10241.donation=form1&set.DonationLevel='+donationLevelId;
		window.location.href = donationLink;
	});
	
	// Lightbox Functions
	function toggleLightbox(visible) {
		var lightboxClass = 'yoga-lightbox-visible';
		var $body = $('body');
				
		if (visible) {
			$body.addClass(lightboxClass);
		} else {
			$body.removeClass(lightboxClass);
		}
	}
	
	function toggleLightboxContent(selectedClass) {
		$('.yoga-lightbox__content').each(function(e){
			var activeContentClass = 'yoga-lightbox__content--active';
			
			var $lightboxContent = $(this);
			
			if ($lightboxContent.hasClass(selectedClass)) {
				$lightboxContent.addClass(activeContentClass);
			} else {
				$lightboxContent.removeClass(activeContentClass);
			}
		});
	}
	
	$('.yoga-legal-notice').on('click touchend',function(e){
		e.preventDefault();
		toggleLightboxContent('yoga-lightbox__content--legal-notice');
		toggleLightbox(true);
	});
	
	$('.yoga-privacy-notice').on('click touchend',function(e){
		e.preventDefault();
		toggleLightboxContent('yoga-lightbox__content--privacy-notice');
		toggleLightbox(true);
	});
	
	$('.yoga-lightbox__close-button').on('click touchend',function(e){
		e.preventDefault();
		toggleLightbox(false);
	});
	
	//Toggle Placeholder Class on Select Field
	function togglePlaceholderClass($field) {
		if ($field.val() == '') {
			$field.addClass('yoga-input--placeholder');
		} else {
			$field.removeClass('yoga-input--placeholder');
		}
	}
	
	togglePlaceholderClass($('#state'));
	
	$('#state').on('change',function(){
		togglePlaceholderClass($(this));
	});
	
	//Studio Form Toggles
	$('#materials-stickers').on('change',function(){
		toggleFieldGroupVisibility($(this),$('.yoga-form__group--for-quantity'));
	});
	
	$('#materials-shirt').on('change',function(){
		toggleFieldGroupVisibility($(this),$('.yoga-form__group--for-size'));
	});
	
	function toggleFieldGroupVisibility($field,$group) {
		if ($field.is(':checked')) {
			$group.removeClass('yoga-form__group--is-hidden');
		} else {
			$group.addClass('yoga-form__group--is-hidden');
		}
	}
	
	togglePlaceholderClass($('#size'));
	
	$('#size').on('change',function(){
		togglePlaceholderClass($(this));
	});	
		
	//Origami Form Submission
	$('.origami-signup .origami-button').on('click',function(e) {
		e.preventDefault();
		
		var email = $('#email');
		var errorClass = 'origami-input--error';
		var errorBlock = $('.origami-form__panel--first .origami-body-text--error');
		var errorCount = 0;
		var offset = $('.origami-signup').offset();
		
		email.removeClass(errorClass);
		
		if (email.val() == '' || email.val() == 'Email') {
			email.addClass(errorClass);
			errorCount++;
			}
		if (errorCount != 0) {
			errorBlock.html('Please enter an email address.');
			$('html, body').animate({ scrollTop: offset.top }, 250);
			}
		else {
			if ((email.val() != '') && (!isValidEmail(email.val()))) {
				email.addClass(errorClass);
				errorBlock.html('That email address is not valid!');
			} else {
				var url = 'http://e.wcs.org/site/Survey?cons_info_component=t&cons_email='+email.val()+'&SURVEY_ID=14969&ACTION_SUBMIT_SURVEY_RESPONSE=Submit';				
				url = encodeURI(url)
				url = url.replace('#','%23');
				
				$.ajax({
					  type: "POST",
					  url: url
					}).always(function(){
						offset = $('.origami-signup').offset();
						
						$('.origami-form__panel--first').removeClass('origami-form__panel--active');
						$('.origami-form__panel--second').addClass('origami-form__panel--active');
						$('html, body').animate({ scrollTop: offset.top }, 250);
					});
				}
			}
		});	
		
	function isValidEmail(str) {
		var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
		if (filter.test(str)) {
			return true;
		} else {
			return false;
		}
	}
});