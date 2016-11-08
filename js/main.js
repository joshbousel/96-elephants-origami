$(function(){
	window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

	var $htmlBody = $('html, body');
	var exhibitPlayer;
	var introPlayer;
	var foldingPlayer;
	var imgUrl;
	var facebookShareUrl;

	//Origami Pledge Submission
	$('.origami-form__panel--first .origami-button').on('click',function(e) {
		e.preventDefault();
		
		var email = $('#email');
		var errorClass = 'origami-input--error';
		var errorBlock = $('.origami-form__panel--first .origami-body-text--error');
		var errorCount = 0;
		
		email.removeClass(errorClass);
		
		if (email.val() == '' || email.val() == 'Email') {
			email.addClass(errorClass);
			errorCount++;
			}
		if (errorCount != 0) {
			errorBlock.removeClass('origami-hidden').html('Please enter an email address.');
			}
		else {
			if ((email.val() != '') && (!isValidEmail(email.val()))) {
				email.addClass(errorClass);
				errorBlock.removeClass('origami-hidden').html('That email address is not valid!');
			} else {
				var url = 'http://e.wcs.org/site/Survey?cons_info_component=t&cons_email='+email.val()+'&SURVEY_ID=15228&ACTION_SUBMIT_SURVEY_RESPONSE=Submit';				
				url = encodeURI(url)
				url = url.replace('#','%23');
				
				$.ajax({
					  type: "POST",
					  url: url
					}).always(function(){
						offset = $('.origami-content').offset();
						
						$('.origami-form__panel--first').removeClass('origami-form__panel--active');
						$('.origami-form__panel--second').addClass('origami-form__panel--active');
						$('html, body').animate({ scrollTop: offset.top }, 250);
					});
				}
			}
		});	
	
	//Paper Color Selection
	$('.origami-paper-list__item').on('click',function(e){
		var selectedClass = 'origami-paper-list__item--selected';
		
		$('.origami-paper-list__item').each(function(){
			$(this).removeClass(selectedClass);
		});
		
		$(this).addClass(selectedClass);
	});
	
	//Origami Elephant Submission
	$('.origami-form__panel--second .origami-button').on('click',function(e) {
		e.preventDefault();
		
		var $first = $('#first');
		var $last = $('#last');
		var $email = $('#email');
		var $elephant = $('#elephant');
		var color = '';
		var errorClass = 'origami-input--error';
		var errorBlock = $('.origami-form__panel--second .origami-body-text--error');
		var errorCount = 0;
		var offset = $('.origami-content__container').offset();
		
		$('.origami-paper-list__item').each(function(){
			if ($(this).hasClass('origami-paper-list__item--selected')) {
				color = $(this).data('color');
			}
		});
						
		$first.removeClass(errorClass);
		$last.removeClass(errorClass);
		$elephant.removeClass(errorClass);
		
		if ($first.val() == '') {
			$first.addClass(errorClass);
			errorCount++;
			}
		if ($last.val() == '') {
			$last.addClass(errorClass);
			errorCount++;
			}
		if ($elephant.val() == '') {
			$elephant.addClass(errorClass);
			errorCount++;
			}
		if (color == '') {
			errorCount++;
			}
		if (errorCount != 0) {
			errorBlock.removeClass('origami-hidden').html('Please complete the following fields:');
			$('html, body').animate({ scrollTop: offset.top }, 250);
			}
		else {
			imgUrl = 'http://iwizz4823.imagewizz.com/A010B7C58D4E97300D427E25103A0354/'+$elephant.val();
			facebookShareUrl = 'https://www.facebook.com/dialog/feed?app_id=966242223397117&link=http%3A%2F%2Fpages.96elephants.org%2Forigami-dev%2F&picture='+imgUrl+'&name=Join%20the%20Fold&caption=%20&description=Meet%20my%20origami%20elephant%2C%20'+$elephant.val()+'.%20It%20represents%20one%20of%2096%2C000%20elephants%20that%20will%20be%20killed%20in%20Africa%20over%20the%20next%20three%20years%20for%20their%20ivory.%20Join%20the%20fold%20to%20help%20protect%20elephants%20by%20creating%20your%20own%20origami%20elephant%20now.&redirect_uri=http%3A%2F%2Fwww.facebook.com%2F&display=popup';
			
			var url = 'http://e.wcs.org/site/Survey?cons_info_component=t&cons_email='+$email.val()+'&cons_first_name='+$first.val()+'&cons_last_name='+$last.val()+'&3255_15229_2_11855='+imgUrl+'&SURVEY_ID=15229&ACTION_SUBMIT_SURVEY_RESPONSE=Submit';				
			url = encodeURI(url)
			url = url.replace('#','%23');
			
			$.ajax({
				  type: "POST",
				  url: url
				}).always(function(){
					offset = $('.origami-content').offset();
					
					$('.origami-share--image').attr('src',imgUrl);
					$('.origami-share--facebook').attr('href',facebookShareUrl);
					$('.origami-form__panel--second').removeClass('origami-form__panel--active');
					$('.origami-form__panel--third').addClass('origami-form__panel--active');
					$('html, body').animate({ scrollTop: offset.top }, 250);
					foldingPlayer.mute();
					foldingPlayer.playVideo();
				});
			}
		});	
	
	function showFourthPanel() {
		$('.origami-form__panel--third').removeClass('origami-form__panel--active');
		$('.origami-form__panel--fourth').addClass('origami-form__panel--active');
	}
	
	$('.origami-skip-video').on('click',function(e){
		e.preventDefault();
		showFourthPanel();
	});
		
	function isValidEmail(str) {
		var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
		if (filter.test(str)) {
			return true;
		} else {
			return false;
		}
	}

	//YouTube Video API
	function onYouTubeIframeAPIReady() {
	    exhibitPlayer = new YT.Player('exhibitVideo', {
	        events: {
	            'onReady': onPlayerReady
	        }
	    });
	    
	    introPlayer = new YT.Player('introVideo', {
	        events: {
	            'onReady': onIntroPlayerReady
	        }
	    });
	    
	    foldingPlayer = new YT.Player('foldingVideo', {
	        events: {
	            'onStateChange': onPlayerStateChange
	        }
	    });
	}
	
	function onPlayerReady(event) {
	    exhibitPlayer.mute();
	    exhibitPlayer.playVideo();
	}	
	
	function onIntroPlayerReady(event) {
	    introPlayer.mute();
	    introPlayer.playVideo();
	}
	
	function onPlayerStateChange(event) {        
	    if(event.data === 0) {          
	       showFourthPanel();
	    }
	}	
});
