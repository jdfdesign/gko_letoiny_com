//= require jquery_ujs
//= require bootstrap-datepicker
//= require remote_form
//= require supersized.3.2.7.js

// make console.log safe to use
window.console || (console = {
  log: function() {}
});

jQuery(function($) {
  'use strict';
  var THEME = window.THEME || {};
  
  /* ==================================================
  	Fix
  ================================================== */

  THEME.fix = function(){
    // fix for ie device_width bug 
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement("style");
      msViewportStyle.appendChild(
      document.createTextNode("@-ms-viewport{width:auto!important}"));
      document.getElementsByTagName("head")[0].
      appendChild(msViewportStyle);
    }
  };
  /* ==================================================
  	Formstack
  ================================================== */
  /*THEME.formstack = function(title, source){
    $('<div class="modal fade">' +
      '<div class="modal-dialog">' +
        '<div class="modal-content">' +
          '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title" id="myModalLabel">' + title + '</h4>' +
          '</div>' +
          '<div class="modal-body">' +
            '<iframe src="' + source + '" title="' + title + '" width="' + ($(window).width() - 60) + '" height="' + ($(window).height() - 60) + '" scrolling="yes" frameBorder="0"></iframe>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>').appendTo($('body')).on('show.bs.modal', function(e) {
      $(this).find('.modal-dialog:first').css({'width': $(window).width() - 60, 'height': $(window).height() - 60});
      }).on('hidden.bs.modal', function (e) {
        $(this).remove();
      }).modal( { backdrop: 'static', show: true } );
  };*/
  /* ==================================================
  	Carousel
  ================================================== */

    THEME.carousel = function() {
      // start the carousel if there is more than one image
      // else hide controls
      $('.carousel').each(function(index) {
        var _self = $(this);
        if (_self.find('.item').length > 1) {
          _self.carousel({
            interval: 3000
          });
        } else {
          _self.find('.carousel-control').each(function(index) {
            $(this).css({
              display: 'none'
            })
          })
          _self.find('.carousel-indicators').each(function(index) {
            $(this).css({
              display: 'none'
            })
          })
        }
      })
    };

    /* ==================================================
    	Supersized
    ================================================== */

      THEME.supersized = function() {
      	$.supersized({
      		slide_interval : 3000, // Length between transitions
      		transition : 3, // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
      		transition_speed : 1200, // Speed of transition
      		slides : supersized_slides
        });
      };
      
    /*==================================================
      	Init
    ==================================================*/
    
  $(document).ready(function() {
    THEME.fix();
    THEME.carousel();
    THEME.supersized();
    
    $(".homepage").css('margin-top', $(window).height() + 80);
    $(".homepage.featured").css('margin-top', Math.max(0, $(window).height() - $(".news-wrapper").height() - 80));
    $("#inquiry_services").change(function() {
      if($( this ).val() == "other") {
        $("#inquiry_other_value").parent().removeClass('hidden');
      } else {
        $("#inquiry_other_value").parent().addClass('hidden');
      }
    });
    $('.form-control.date').datepicker({});
    /*$("#contact_us").on("click", function(e) { 
      THEME.formstack($(this).text(), 'https://www.formstack.com/forms/?1464607-UGKf87Ck2h');
      e.preventDefault();
    })
    $("#table-booking").on("click", function(e) {
      THEME.formstack($(this).text(), 'http://www.formstack.com/forms/?1464587-Dog5K8aIvq');
      e.preventDefault();
    })*/
      
    
  })  

})