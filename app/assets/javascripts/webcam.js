$(document).ready(function() {
    /////////////////////////////////////////////////
    init_webcam = function() {

	    $('#webcam').bind('click', function(e) {  
			webcam_container = $('#modal-webcam').modal({});
			e.preventDefault();
	    });
    }

	loadImage = function() { 
		clearTimeout();
		var	$img = webcam_container.find("img:first"),
			now = new Date(),
			uniq_stamp = now.getHours()+'-'+now.getMinutes()+'-'+now.getSeconds();
				
		$('<img/>').load(function() {
			var $theImage = $(this);
			
			$theImage.css({position:'absolute', width:320, height:240, left: 10, top:10}).fadeIn('slow', function() {
				$img.remove();
				setTimeout ("loadImage()", 10 );
			});
			$theImage.appendTo(webcam_container); 
      }).attr('src', 'http://64.117.46.71:4554/-wvhttp-01-/GetStillImage?'+ uniq_stamp);
    };

    /////////////////////////////////////////////////
    var clickevent = ($.support.touch ? 'touchstart': 'click'),
		webcam_container,
		uniq_stamp;

    /////////////////////////////////////////////////
    init_webcam();
});