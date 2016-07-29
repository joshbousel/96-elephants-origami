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
	
	//Studio Form Submission
	$('.yoga-form--for-studios .yoga-button').on('click',function(e) {
		e.preventDefault();
		
		var $first = $('#first');
		var $last = $('#last');
		var $email = $('#email');
		var studio = $('#studio').val();
		var address = $('#address').val();
		var hearAbout = $('#hear_about').val();
		var materials = $("input[name='materials']:checked").map(function() {
		    return this.value;
		}).get().toString();
		var qty = $('#qty').val();
		var size = $('#size').val();
		var funds = $('input[name=funds]:checked').val();
		var solstice = $('input[name=solstice]:checked').val();
		var communicate = $("input[name='communicate']:checked").map(function() {
		    return this.value;
		}).get().toString();
		var errorClass = 'yoga-input--error';
		var errorBlock = $('.yoga-form__panel--first .yoga-body-text--error');
		var errorCount = 0;
		var offset = $('.yoga-body-text--error').offset();
		
		$first.removeClass(errorClass);
		$last.removeClass(errorClass);
		$email.removeClass(errorClass);
		
		if ($first.val() == '' || $first.val() == 'First Name') {
			$first.addClass(errorClass);
			errorCount++;
			}
		if ($last.val() == '' || $last.val() == 'Last Name') {
			$last.addClass(errorClass);
			errorCount++;
			}
		if ($email.val() == '' || $email.val() == 'Email') {
			$email.addClass(errorClass);
			errorCount++;
			}
		if (errorCount != 0) {
			errorBlock.html('Please complete the following fields:');
			$('html, body').animate({ scrollTop: offset.top }, 250);
			}
		else {
			if (($email.val() != '') && (!isValidEmail($email.val()))) {
				$email.addClass(errorClass);
				errorBlock.html('That email address is not valid!');
			} else {
				var url = 'http://e.wcs.org/site/Survey?cons_info_component=t&cons_email='+$email.val()+'&cons_first_name='+$first.val()+'&cons_last_name='+$last.val()+'&3255_14271_2_11204='+studio+'&3255_14271_3_11205='+address+'&3255_14271_4_11206='+hearAbout+'&3255_14271_5_11207='+materials+'&3255_14271_6_11208='+qty+'&3255_14271_7_11209='+size+'&3255_14271_8_11210='+funds+'&3255_14271_9_11211='+solstice+'&3255_14271_10_11212='+communicate+'&SURVEY_ID=14271&ACTION_SUBMIT_SURVEY_RESPONSE=Submit';				
				url = encodeURI(url)
				url = url.replace('#','%23');
				
				$.ajax({
					  type: "POST",
					  url: url
					}).always(function(){
						offset = $('.yoga-hero').offset();
						
						$('.yoga-form__panel--first').removeClass('yoga-form__panel--active');
						$('.yoga-form__panel--second').addClass('yoga-form__panel--active');
						$('html, body').animate({ scrollTop: offset.top }, 250);
					});
				}
			}
		});	
	
	//Sticker Form Submission
	$('.yoga-form--for-stickers .yoga-button').on('click',function(e) {
		e.preventDefault();
		
		var first = $('#first');
		var last = $('#last');
		var email = $('#email');
		var street = $('#street');
		var street_2 = $('#street_2');
		var city = $('#city');
		var state = $('#state');
		var zip = $('#zip');
		var errorClass = 'yoga-input--error';
		var errorBlock = $('.yoga-form__panel--first .yoga-body-text--error');
		var errorCount = 0;
		var offset = $('.yoga-body-text--error').offset();
		
		first.removeClass(errorClass);
		last.removeClass(errorClass);
		email.removeClass(errorClass);
		street.removeClass(errorClass);
		city.removeClass(errorClass);
		state.removeClass(errorClass);
		zip.removeClass(errorClass);
		
		if (first.val() == '' || first.val() == 'First Name') {
			first.addClass(errorClass);
			errorCount++;
			}
		if (last.val() == '' || last.val() == 'Last Name') {
			last.addClass(errorClass);
			errorCount++;
			}
		if (email.val() == '' || email.val() == 'Email') {
			email.addClass(errorClass);
			errorCount++;
			}
		if (street.val() == '' || street.val() == 'Street 1') {
			street.addClass(errorClass);
			errorCount++;
			}
		if (city.val() == '' || city.val() == 'City') {
			city.addClass(errorClass);
			errorCount++;
			}
		if (state.val() == '' || state.val() == 'State') {
			state.addClass(errorClass);
			errorCount++;
			}
		if (zip.val() == '' || zip.val() == 'Zip') {
			zip.addClass(errorClass);
			errorCount++;
			}
		if (errorCount != 0) {
			errorBlock.html('Please complete the following fields:');
			$('html, body').animate({ scrollTop: offset.top }, 250);
			}
		else {
			if ((email.val() != '') && (!isValidEmail(email.val()))) {
				email.addClass(errorClass);
				errorBlock.html('That email address is not valid!');
			} else {
				var url = 'http://e.wcs.org/site/Survey?cons_info_component=t&cons_email='+email.val()+'&cons_first_name='+first.val()+'&cons_last_name='+last.val()+'&cons_street1='+street.val()+'&cons_street2='+street_2.val()+'&cons_city='+city.val()+'&cons_state='+state.val()+'&cons_zip_code='+zip.val()+'&SURVEY_ID=14227&ACTION_SUBMIT_SURVEY_RESPONSE=Submit';				
				url = encodeURI(url)
				url = url.replace('#','%23');
				
				$.ajax({
					  type: "POST",
					  url: url
					}).always(function(){
						offset = $('.yoga-hero').offset();
						
						$('.yoga-form__panel--first').removeClass('yoga-form__panel--active');
						$('.yoga-form__panel--second').addClass('yoga-form__panel--active');
						$('html, body').animate({ scrollTop: offset.top }, 250);
					});
				}
			}
		});	
		
	//Solstice Form Submission
	$('.yoga-form--for-solstice .yoga-button').on('click',function(e) {
		e.preventDefault();
		
		var first = $('#first');
		var last = $('#last');
		var email = $('#email');
		var errorClass = 'yoga-input--error';
		var errorBlock = $('.yoga-form__panel--first .yoga-body-text--error');
		var errorCount = 0;
		var offset = $('.yoga-body-text--error').offset();
		
		first.removeClass(errorClass);
		last.removeClass(errorClass);
		email.removeClass(errorClass);
		
		if (first.val() == '' || first.val() == 'First Name') {
			first.addClass(errorClass);
			errorCount++;
			}
		if (last.val() == '' || last.val() == 'Last Name') {
			last.addClass(errorClass);
			errorCount++;
			}
		if (email.val() == '' || email.val() == 'Email') {
			email.addClass(errorClass);
			errorCount++;
			}
		if (errorCount != 0) {
			errorBlock.html('Please complete the following fields:');
			$('html, body').animate({ scrollTop: offset.top }, 250);
			}
		else {
			if ((email.val() != '') && (!isValidEmail(email.val()))) {
				email.addClass(errorClass);
				errorBlock.html('That email address is not valid!');
			} else {
				var url = 'http://e.wcs.org/site/Survey?cons_info_component=t&cons_email='+email.val()+'&cons_first_name='+first.val()+'&cons_last_name='+last.val()+'&SURVEY_ID=14390&ACTION_SUBMIT_SURVEY_RESPONSE=Submit';				
				url = encodeURI(url)
				url = url.replace('#','%23');
				
				$.ajax({
					  type: "POST",
					  url: url
					}).always(function(){
						offset = $('.yoga-hero').offset();
						
						$('.yoga-form__panel--first').removeClass('yoga-form__panel--active');
						$('.yoga-form__panel--second').addClass('yoga-form__panel--active');
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