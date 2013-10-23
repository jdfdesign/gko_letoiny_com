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
  })  

})