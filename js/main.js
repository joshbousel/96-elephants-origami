$(function(){
	window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

	var $htmlBody = $('html, body');
	var $win = $(window);
	var exhibitPlayer;
	var introPlayer;
	var foldingPlayer;
	var imgUrl;
	var facebookShareUrl;
	var playerTimer;
	var isMobile = false;
	var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	    isMobile = true;
	    }
	   
	if (isSafari) {
		$('.origami-content__video').addClass('origami-content__video--has-background');
		$('.origami-content__video__frame').hide();
	}
	
	//Fix the position of footer on larger screens	
	function fixedFooter() {
		if ($('.origami-content').outerHeight() + $('.footer').outerHeight() < $win.height()) {
			$('.footer').addClass('footer--is-fixed');
		} else {
			$('.footer').removeClass('footer--is-fixed');
		}
	}
	
	fixedFooter();
	
	$win.on('resize',function(){
		fixedFooter();
	});
	
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
			$('.origami-paper-list').addClass('origami-paper-list--error');
			errorCount++;
			}
		if (errorCount != 0) {
			errorBlock.removeClass('origami-hidden').html('Please complete the following fields:');
			$('html, body').animate({ scrollTop: offset.top }, 250);
			}
		else {
			imgUrl = 'http://iwizz4823.imagewizz.com/A010B7C58D4E97300D427E25103A0354/';
			
			if (color == 'green') {
				imgUrl = 'http://iwizz4823.imagewizz.com/1157C3E629648C5BD65FF134E37910DB/';
			} else if (color == 'blue') {
				imgUrl = 'http://iwizz4823.imagewizz.com/03C1D92EADE5D94AFFB66ED4D6429D7B/';
			}
			
			imgUrl = imgUrl+$elephant.val();
			imgUrl = imgUrl.replace(' ','');
			imgUrl = imgUrl.replace('+','');
			
			facebookShareUrl = 'https://www.facebook.com/dialog/feed?app_id=966242223397117&link=http%3A%2F%2Fpages.96elephants.org%2Forigami%2F&picture='+imgUrl+'&name=Join%20the%20Fold&caption=%20&description=Meet%20my%20origami%20elephant%2C%20'+$elephant.val()+'.%20It%20represents%20one%20of%20the%2096%20elephants%20who%20are%20killed%20every%20day%20in%20Africa%20for%20their%20ivory.%20Create%20your%20own%20digital%20ellie%20and%20join%20%4096Elephants%20to%20stop%20the%20poaching%20crisis.%20&redirect_uri=http%3A%2F%2Fwww.facebook.com%2F&display=popup';
			
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
					$('html, body').animate({ scrollTop: offset.top }, 250);
					$('.origami-form__panel--second').removeClass('origami-form__panel--active');
					
					if (isMobile) {
						$('.origami-form__panel--fourth').addClass('origami-form__panel--active');
					} else {
						$('.origami-form__panel--third').addClass('origami-form__panel--active');
						loadAndPlayFoldingVideo(color);	
					}
				});
			}
		});	
	
	function loadAndPlayFoldingVideo(color) {
		var videoID = 'JRwXR2IoYEk';
		
		if (color == 'green') {
			videoID = 'qn2u_3zi1mw'
		} else if (color == 'blue') {
			videoID = 'SUduOhRLzxk'
		}
		
		foldingPlayer.loadVideoById(videoID);
		foldingPlayer.mute();
		foldingPlayer.playVideo();
	}
	
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
	    if (!isMobile) {
		    exhibitPlayer = new YT.Player('exhibitVideo', {
		        events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onExhibitPlayerStateChange
		        }
		    });
		}
	    
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
	
	function checkTime() {
	   if ( exhibitPlayer.getCurrentTime() >= 1 ) {
	      clearInterval(playerTimer);
	      exhibitPlayer.pauseVideo();
		} else {
	      playerTimer = setInterval(checkTime, 500);
		}
	}
	
	function onPlayerReady(event) {
	    exhibitPlayer.mute();
	    exhibitPlayer.playVideo();
	    checkTime();
	}	
	
	function onIntroPlayerReady(event) {
	    if (!isMobile) {
		    introPlayer.mute();
		    introPlayer.playVideo();
		}
	}
	
	function onExhibitPlayerStateChange(event) {
		if(event.data === 0) {          
	    	exhibitPlayer.playVideo();
	    }
	}
	
	function onPlayerStateChange(event) {        
	    if(event.data === 0) {          
	       showFourthPanel();
	    }
	}	
});
