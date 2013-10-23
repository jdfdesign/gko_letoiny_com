//= require jquery
//= require jquery_ujs 
//= require jquery.mobile.detection.js
//= require gko/public/jquery.grid.responsive.js
//= require gko/jquery.mobile.events.js
//= require jquery.easing.min.js
//= require jquery.mousewheel.js
//= require jquery.jscrollpane.min.js
//= require flexslider/jquery.flexslider.js
//= require supersized.3.2.7.js
//= require load-image.min.js
//= require twitter.bootstrap.2.2.1/bootstrap/transition.js
//= require twitter.bootstrap.2.2.1/bootstrap/alert.js
//= require twitter.bootstrap.2.2.1/bootstrap/button.js
//= require twitter.bootstrap.2.2.1/bootstrap/collapse.js
//= require twitter.bootstrap.2.2.1/bootstrap/dropdown.js
//= require twitter.bootstrap.2.2.1/bootstrap/modal.js
//= require twitter.bootstrap.2.2.1/bootstrap/tooltip.js
//= require twitter.bootstrap.2.2.1/bootstrap-datepicker.js
//= require twitter.bootstrap.2.2.1/bootstrap-timepicker.js
//= require twitter.bootstrap.2.2.1/bootstrap-image-gallery.js

var available_size = {w: 896,h: 600}, 
	breakpoint = 979;
	$slider = undefined,
	$sliderTab = undefined,
	$body = undefined,
	$scrollpane = undefined,
	colors = ["#b7e9fc","#96daf3","#e6feba", "#EFEBE3"],
	headerHeight = 0,
	footerHeight = 0,
	slide_open = true,
	slide_orientation = "bottom",
	slide_duration = 300,
	isHome = false,
	scrollpaneApi = undefined;

var Site = {
	
	init : function() {
		$slider = $("#content-container");
		$sliderTab = $("#main-column-tab");
		$body = $("body");
		$scrollpane = $('#main-column');
		headerHeight = $('header.navbar').outerHeight();
		footerHeight = $('#footer-container').outerHeight();
		isHome = ($body.attr('id') == 'home');
		
		$('#supersized').addClass('visible-desktop');
		Site.attachEvents();
		Carousel.init();
		Site.rescale();
		
		$('a[rel="tooltip"], a[rel="tooltip nofollow"]').tooltip({html: true});
		$('input.date, input.datetime').datepicker();
		
		if(jQuery.browser.mobile && (link = $("#online-booking"))) { 
		  link.attr("href", "https://mobile.synxis.com/22812?shell=mobile_shared_toiny&template=mobile_shared_toiny");
		}
	},

    attachEvents : function() {
      /*********************/
      /* Left Nav Fly Outs */ 
      /*********************/

      if ( $('.nav-fly-out').size() > 0 ){ 
        $('.nav-fly-out').hide();
        if ($(window).width() > breakpoint) {
          $('.nav-menu > li > a').hover( 
            function(){
              $(this).siblings('.nav-fly-out').show();
            },
            function(){
              $(this).siblings('.nav-fly-out').hide();
            }
          ); 
        }
      }
      	
		$('.nav li.dropdown').on('click.dropdown.data-api', function (e) {
			if ($(window).width() > breakpoint) {
				e.preventDefault();
				e.stopPropagation();
				var url = $(this).find('a:first').attr("href");
				if(window.document.location.host) {
				window.location = "http://" + window.document.location.host + url;	
				}
				else {
					window.location = "http://" + window.location.hostname + url;
				}
				
				return false;
			}
		})
	/*	$("#main-column .carousel").on('click', ' img',  function(e) {
			e.preventDefault();
			Carousel.modal();
		}) */

		$('#newsletter_registration').on('click', function(e) {  
			newsletter_container = $('<div id="newsletter_container" style="width:360px;min-height:30px;padding:14px;"><label for="newsletter_registration_email">Email</label><input id="newsletter_registration_email" maxlength="255" name="newsletter_registration_email" size="50" type="email" value=""><a id="ok_newsletter_registration">OK</a></div>').insertAfter($("#content-container"));
					
		$("#ok_newsletter_registration").on('click', function(e) {
			var email = $("#newsletter_registration_email").val();
			$body.append('<img src="http://app.bronto.com/public/?q=direct_add&fn=Public_DirectAddForm&id=ajxwyhlmsdoqtqrxcnqhcvdxmslabha&email='+email+'" width="0" height="0" border="0" alt=""/>');
			newsletter_container.trigger('close');  
		});
		newsletter_container.lightbox({
			centered: true, 
			onLoad: function() { 
				
			},
			onClose: function() {
				newsletter_container.fadeOut().remove();
			}
		});
			e.preventDefault();
		});


		// Start slideshow button:
		    $('#start-slideshow').button().click(function () {
		        var options = $(this).data(),
		            modal = $(options.target),
		            data = modal.data('modal');
		        if (data) {
		            $.extend(data.options, options);
		        } else {
		            options = $.extend(modal.data(), options);
		        }
		        //modal.find('.modal-slideshow').find('i')
		        //    .removeClass('icon-play')
		        //    .addClass('icon-pause');
		        modal.modal(options);
		    });
		
		// Enable ajax on form to send register user to bronto
		//------------------------------------------------------- 
		$('#table-booking').on('click', function(e) {
			e.preventDefault();
			$('#booking-table-modal').modal({});
		});
		
		$('#inquiry').on('click', function(e) {
			e.preventDefault();
			$('#inquiry-modal').modal({});
		});
		
	/*	$('.modal').on('show', function() {
			Util.getAvailableSize();
			var headerHeight = $(this).find('.modal-header').height(),
				footerHeight = $(this).find('.modal-footer').height();
			
			var modalBody = $(this).find('.modal-body');
			modalBody.css({
				'maxHeight': $("window").height() - headerHeight - footerHeight - 40
			})
		}) */
		
		$("a[data-remote], form[data-remote]")
		.on("ajax:beforeSend", function(evt, xhr, settings) {
		  Util.attachLoading("body")
		})
		.on("ajax:error", function(evt, xhr, status, error) {
			var that = $(this),
				flash = $.parseJSON(xhr.getResponseHeader('X-Flash-Messages')),
				errors = $.parseJSON(xhr.responseText).errors;
			
      // Remove any previous errors messages
			that.find('.control-group').removeClass('error');
			that.find('.help-inline').remove();
			
			if(flash.error) {
				
			}
			for ( error in errors ) {
				var input = that.find('input[name*="'+ error + '"]');
				if(input.length) {
				  // Bootstrap includes validation styles for error, warning, info, and success messages. 
				  // To use, add the appropriate class to the surrounding
					input.closest('.control-group').addClass('error');
					input.after('<span class="help-inline">' + errors[error] + "</span>");
				}
			}
		})
		.on("ajax:success", function(evt, data, status, xhr) {
		  var that = $(this),
          flash = $.parseJSON(xhr.getResponseHeader('X-Flash-Messages'));
      
      // Remove any previous errors messages
      that.find('.control-group').removeClass('error');
      that.find('.help-inline').remove(); 

		  if(flash.success) {
        that.prepend('<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>' + flash.success + '</div>')
			}
    })
		.on("ajax:complete", function(evt, xhr, status){
		  Util.removeLoading("body")
		 });
		
		// Handle window.resize or orientationchange event
		//------------------------------------------------------- 
		$(window).bind("throttledresize", Site.rescale);
    },

	rescale: function() {
		
		Util.getAvailableSize();
		if(available_size.w > breakpoint) {
			if($body.hasClass('breakpoint')) {
				Slide.rescale();
			}
			else {
				if(isHome) {  
					// start the ticker 
				 	Home.init(); 
				} else {
				 	Slide.init();
				
					Site.init_scrollpane();
				}
				$body.addClass('breakpoint');
			}
		}
		else {
			$body.removeClass('breakpoint');
			if(scrollpaneApi) {
				scrollpaneApi.destroy();
				scrollpaneApi = undefined;
			}
			Slide.destroy();
		}
	},

    init_scrollpane: function() {
        $scrollpane.jScrollPane({
            //Needed for mobile device
            showArrows: true,
			autoReinitialise: true
        });
        scrollpaneApi = $scrollpane.data('jsp');
    }
} 


var Slide = {
	
	initialised:false,
	
    init: function() {
		if(!this.initialised) {
			var rand = Math.floor(Math.random()*colors.length);           
			$slider.css("background", colors[rand]);
			$slider.prepend("<div id='main-column-tab'></div");
			$sliderTab = $slider.find("#main-column-tab");
	        $sliderTab.on('click',
	        function() {
	            if (!slide_open) {
	                Slide.show($slider);
	            } else {
	                Slide.hide($slider);
	            }
	        });
       		if ($("#main-scroll").length == 0) {
           		$("#main-column").wrapInner("<div id='main-scroll'></div");
       		}
			$('#main-scroll').css('max-width', '500px');
			Slide.rescale();
			this.initialised = true;
		}
    },
    show: function(el) {
        if (slide_open) {
            return;
        }
        slide_open = !slide_open;
        var pos = {};
        pos[slide_orientation] = footerHeight;
        Slide.move(el, pos);
        $sliderTab.removeClass("closed");
    }
    ,
    hide: function(el) {
        if (!slide_open) {
            return;
        }
        slide_open = !slide_open;

        var dest = {};
        if (slide_orientation == "right" || slide_orientation == "left") {
            dest[slide_orientation] = -el.width();
        }
        else {
            dest[slide_orientation] = parseFloat(el.css(slide_orientation)) - el.height();
        }
        Slide.move(el, dest);
        $sliderTab.addClass("closed");
    },
    move: function(el, options) {
        el.stop().animate(options, {
            queue: false,
            duration: slide_duration
        });
    },
    rescale: function() {
		var h = 0.7 * available_size.h - $sliderTab.height();
	
		$slider.css("height", h);
		$('#main-column').css('width', Math.max(300, available_size.w - 310));
		
    },
	destroy: function() {
		$slider.css({background: 'transparent', height: 'auto'});
		$('#main-column').css('width', 'auto');
		$('#main-scroll').css('max-width', 'none');
		$sliderTab.remove();
		this.initialised = false;
    }
}

var Carousel = {
	
	init : function() {

		$('#carousel').flexslider({
			animation: "slide",
			controlNav: false,
			animationLoop: false,
			itemWidth: 210,
			itemMargin: 5,
			minItems: 2,
			maxItems: 4
		});
	}
}
var Newsletter = {
	
	show : function() {

	}
}

var Home = {
	init : function() {
		setTimeout(function(){
			$('#ticker li:first').animate( {marginTop: '-120px'}, 800, function()
			{
				$(this).detach().appendTo('ul#ticker').removeAttr('style');	
			});
			//ticker();
		}, 3000);
	}
}
var Util = {

    getScreenSize : function() {
        pageSize = {
            w: $(window).width(),
            h: $(window).height()
        };
        return pageSize;
    },

    getAvailableSize : function() {
        var size = Util.getScreenSize();
        available_size.w = size.w;
        available_size.h = size.h - headerHeight - footerHeight;
    },
	attachLoading : function (cont, msg, dur, callback) {
	    if (typeof(cont) == "undefined") {
	        cont = "body";
	    }
	    container = $(cont);
	    if (typeof(callback) == "undefined") {
	        callback = function () {};
	    }
	    if (typeof(dur) == "undefined") {
	        dur = 500;
	    }
	    if (typeof(msg) == "undefined") {
	        msg = "Please wait...";
	    }
	    loader = $(cont + ' .gko-loader');
	    if (loader.length > 0) {
	        loader.fadeIn(callback);
	    }
	    else {
	        container.append("<div class='gko-loader'><div class='progress progress-striped active'><div class='bar' style='width: 100%;'></div></div></div>");
	        loader = $(cont + ' .loader');
	        loader.css({
	            'z-index':10000,
	            'top':100
	        });
	        loader.hide().fadeIn(dur, callback);

	    }
	    $('html').addClass("loading");
	},

	removeLoading : function (cont, dur, callback) {
	    if (typeof(cont) == "undefined") {
	        cont = "body";
	    }
	    if (typeof(dur) == undefined) {
	        dur = 500;
	    }
	    if (typeof(callback) == 'undefined') {
	        callback = function () {
	            $(this).remove();
	        };
	    }

	    $(cont + ' .gko-loader').fadeOut(dur, callback);
	    $('html').removeClass("loading");
	}
}
$(document).ready(function() { 
    Site.init();
});