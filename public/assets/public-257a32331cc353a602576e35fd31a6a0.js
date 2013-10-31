!function(e,t){var i=function(){var t=e(document).data("events");return t&&t.click&&e.grep(t.click,function(e){return"rails"===e.namespace}).length};i()&&e.error("jquery-ujs has already been loaded!");var n;e.rails=n={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input:file",linkDisableSelector:"a[data-disable-with]",CSRFProtection:function(t){var i=e('meta[name="csrf-token"]').attr("content");i&&t.setRequestHeader("X-CSRF-Token",i)},fire:function(t,i,n){var a=e.Event(i);return t.trigger(a,n),a.result!==!1},confirm:function(e){return confirm(e)},ajax:function(t){return e.ajax(t)},href:function(e){return e.attr("href")},handleRemote:function(i){var a,s,r,o,l,d,c,u;if(n.fire(i,"ajax:before")){if(o=i.data("cross-domain"),l=o===t?null:o,d=i.data("with-credentials")||null,c=i.data("type")||e.ajaxSettings&&e.ajaxSettings.dataType,i.is("form")){a=i.attr("method"),s=i.attr("action"),r=i.serializeArray();var p=i.data("ujs:submit-button");p&&(r.push(p),i.data("ujs:submit-button",null))}else i.is(n.inputChangeSelector)?(a=i.data("method"),s=i.data("url"),r=i.serialize(),i.data("params")&&(r=r+"&"+i.data("params"))):(a=i.data("method"),s=n.href(i),r=i.data("params")||null);u={type:a||"GET",data:r,dataType:c,beforeSend:function(e,a){return a.dataType===t&&e.setRequestHeader("accept","*/*;q=0.5, "+a.accepts.script),n.fire(i,"ajax:beforeSend",[e,a])},success:function(e,t,n){i.trigger("ajax:success",[e,t,n])},complete:function(e,t){i.trigger("ajax:complete",[e,t])},error:function(e,t,n){i.trigger("ajax:error",[e,t,n])},xhrFields:{withCredentials:d},crossDomain:l},s&&(u.url=s);var m=n.ajax(u);return i.trigger("ajax:send",m),m}return!1},handleMethod:function(i){var a=n.href(i),s=i.data("method"),r=i.attr("target"),o=e("meta[name=csrf-token]").attr("content"),l=e("meta[name=csrf-param]").attr("content"),d=e('<form method="post" action="'+a+'"></form>'),c='<input name="_method" value="'+s+'" type="hidden" />';l!==t&&o!==t&&(c+='<input name="'+l+'" value="'+o+'" type="hidden" />'),r&&d.attr("target",r),d.hide().append(c).appendTo("body"),d.submit()},disableFormElements:function(t){t.find(n.disableSelector).each(function(){var t=e(this),i=t.is("button")?"html":"val";t.data("ujs:enable-with",t[i]()),t[i](t.data("disable-with")),t.prop("disabled",!0)})},enableFormElements:function(t){t.find(n.enableSelector).each(function(){var t=e(this),i=t.is("button")?"html":"val";t.data("ujs:enable-with")&&t[i](t.data("ujs:enable-with")),t.prop("disabled",!1)})},allowAction:function(e){var t,i=e.data("confirm"),a=!1;return i?(n.fire(e,"confirm")&&(a=n.confirm(i),t=n.fire(e,"confirm:complete",[a])),a&&t):!0},blankInputs:function(t,i,n){var a,s,r=e(),o=i||"input,textarea";return t.find(o).each(function(){a=e(this),s=a.is(":checkbox,:radio")?a.is(":checked"):a.val(),s==!!n&&(r=r.add(a))}),r.length?r:!1},nonBlankInputs:function(e,t){return n.blankInputs(e,t,!0)},stopEverything:function(t){return e(t.target).trigger("ujs:everythingStopped"),t.stopImmediatePropagation(),!1},callFormSubmitBindings:function(i,n){var a=i.data("events"),s=!0;return a!==t&&a.submit!==t&&e.each(a.submit,function(e,t){return"function"==typeof t.handler?s=t.handler(n):void 0}),s},disableElement:function(e){e.data("ujs:enable-with",e.html()),e.html(e.data("disable-with")),e.bind("click.railsDisable",function(e){return n.stopEverything(e)})},enableElement:function(e){e.data("ujs:enable-with")!==t&&(e.html(e.data("ujs:enable-with")),e.data("ujs:enable-with",!1)),e.unbind("click.railsDisable")}},n.fire(e(document),"rails:attachBindings")&&(e.ajaxPrefilter(function(e,t,i){e.crossDomain||n.CSRFProtection(i)}),e(document).delegate(n.linkDisableSelector,"ajax:complete",function(){n.enableElement(e(this))}),e(document).delegate(n.linkClickSelector,"click.rails",function(i){var a=e(this),s=a.data("method"),r=a.data("params");return n.allowAction(a)?(a.is(n.linkDisableSelector)&&n.disableElement(a),a.data("remote")!==t?!i.metaKey&&!i.ctrlKey||s&&"GET"!==s||r?(n.handleRemote(a)===!1&&n.enableElement(a),!1):!0:a.data("method")?(n.handleMethod(a),!1):void 0):n.stopEverything(i)}),e(document).delegate(n.inputChangeSelector,"change.rails",function(t){var i=e(this);return n.allowAction(i)?(n.handleRemote(i),!1):n.stopEverything(t)}),e(document).delegate(n.formSubmitSelector,"submit.rails",function(i){var a=e(this),s=a.data("remote")!==t,r=n.blankInputs(a,n.requiredInputSelector),o=n.nonBlankInputs(a,n.fileInputSelector);return n.allowAction(a)?r&&a.attr("novalidate")==t&&n.fire(a,"ajax:aborted:required",[r])?n.stopEverything(i):s?o?(setTimeout(function(){n.disableFormElements(a)},13),n.fire(a,"ajax:aborted:file",[o])):!e.support.submitBubbles&&e().jquery<"1.7"&&n.callFormSubmitBindings(a,i)===!1?n.stopEverything(i):(n.handleRemote(a),!1):(setTimeout(function(){n.disableFormElements(a)},13),void 0):n.stopEverything(i)}),e(document).delegate(n.formInputClickSelector,"click.rails",function(t){var i=e(this);if(!n.allowAction(i))return n.stopEverything(t);var a=i.attr("name"),s=a?{name:a,value:i.val()}:null;i.closest("form").data("ujs:submit-button",s)}),e(document).delegate(n.formSubmitSelector,"ajax:beforeSend.rails",function(t){this==t.target&&n.disableFormElements(e(this))}),e(document).delegate(n.formSubmitSelector,"ajax:complete.rails",function(t){this==t.target&&n.enableFormElements(e(this))}),e(function(){csrf_token=e("meta[name=csrf-token]").attr("content"),csrf_param=e("meta[name=csrf-param]").attr("content"),e('form input[name="'+csrf_param+'"]').val(csrf_token)}))}(jQuery),function(e){e(document).ready(function(){}),e.supersized=function(t){e("body").append('<div id="supersized-loader"></div><ul id="supersized"></ul>');var i="#supersized",n=this;n.$el=e(i),n.el=i,vars=e.supersized.vars,n.$el.data("supersized",n),api=n.$el.data("supersized"),n.init=function(){e.supersized.vars=e.extend(e.supersized.vars,e.supersized.themeVars),e.supersized.vars.options=e.extend({},e.supersized.defaultOptions,e.supersized.themeOptions,t),n.options=e.supersized.vars.options,n._build()},n._build=function(){for(var t,i,a=0,s="",r="",o="";a<=n.options.slides.length-1;){switch(n.options.slide_links){case"num":t=a;break;case"name":t=n.options.slides[a].title;break;case"blank":t=""}s=s+'<li class="slide-'+a+'"></li>',a==n.options.start_slide-1?(n.options.slide_links&&(r=r+'<li class="slide-link-'+a+' current-slide"><a>'+t+"</a></li>"),n.options.thumb_links&&(i=n.options.slides[a].thumb?n.options.slides[a].thumb:n.options.slides[a].image,o=o+'<li class="thumb'+a+' current-thumb"><img src="'+i+'"/></li>')):(n.options.slide_links&&(r=r+'<li class="slide-link-'+a+'" ><a>'+t+"</a></li>"),n.options.thumb_links&&(i=n.options.slides[a].thumb?n.options.slides[a].thumb:n.options.slides[a].image,o=o+'<li class="thumb'+a+'"><img src="'+i+'"/></li>')),a++}n.options.slide_links&&e(vars.slide_list).html(r),n.options.thumb_links&&vars.thumb_tray.length&&e(vars.thumb_tray).append('<ul id="'+vars.thumb_list.replace("#","")+'">'+o+"</ul>"),e(n.el).append(s),n.options.thumbnail_navigation&&(prevThumb=vars.current_slide-1<0?n.options.slides.length-1:vars.current_slide-1,e(vars.prev_thumb).show().html(e("<img/>").attr("src",n.options.slides[prevThumb].image)),nextThumb=vars.current_slide==n.options.slides.length-1?0:vars.current_slide+1,e(vars.next_thumb).show().html(e("<img/>").attr("src",n.options.slides[nextThumb].image))),n._start()},n._start=function(){vars.current_slide=n.options.start_slide?n.options.start_slide-1:Math.floor(Math.random()*n.options.slides.length);var t=n.options.new_window?' target="_blank"':"";if(3==n.options.performance?n.$el.addClass("speed"):(1==n.options.performance||2==n.options.performance)&&n.$el.addClass("quality"),n.options.random){arr=n.options.slides;for(var i,a,s=arr.length;s;i=parseInt(Math.random()*s),a=arr[--s],arr[s]=arr[i],arr[i]=a);n.options.slides=arr}if(n.options.slides.length>1){if(n.options.slides.length>2){loadPrev=vars.current_slide-1<0?n.options.slides.length-1:vars.current_slide-1;var r=n.options.slides[loadPrev].url?"href='"+n.options.slides[loadPrev].url+"'":"",o=e('<img src="'+n.options.slides[loadPrev].image+'"/>'),l=n.el+" li:eq("+loadPrev+")";o.appendTo(l).wrap("<a "+r+t+"></a>").parent().parent().addClass("image-loading prevslide"),o.load(function(){e(this).data("origWidth",e(this).width()).data("origHeight",e(this).height()),n.resizeNow()})}}else n.options.slideshow=0;r=api.getField("url")?"href='"+api.getField("url")+"'":"";var d=e('<img src="'+api.getField("image")+'"/>'),c=n.el+" li:eq("+vars.current_slide+")";if(d.appendTo(c).wrap("<a "+r+t+"></a>").parent().parent().addClass("image-loading activeslide"),d.load(function(){n._origDim(e(this)),n.resizeNow(),n.launch(),"undefined"!=typeof theme&&"function"==typeof theme._init&&theme._init()}),n.options.slides.length>1){loadNext=vars.current_slide==n.options.slides.length-1?0:vars.current_slide+1,r=n.options.slides[loadNext].url?"href='"+n.options.slides[loadNext].url+"'":"";var u=e('<img src="'+n.options.slides[loadNext].image+'"/>'),p=n.el+" li:eq("+loadNext+")";u.appendTo(p).wrap("<a "+r+t+"></a>").parent().parent().addClass("image-loading"),u.load(function(){e(this).data("origWidth",e(this).width()).data("origHeight",e(this).height()),n.resizeNow()})}n.$el.css("visibility","hidden"),e(".load-item").hide()},n.launch=function(){n.$el.css("visibility","visible"),e("#supersized-loader").remove(),"undefined"!=typeof theme&&"function"==typeof theme.beforeAnimation&&theme.beforeAnimation("next"),e(".load-item").show(),n.options.keyboard_nav&&e(document.documentElement).keyup(function(e){return vars.in_animation?!1:(37==e.keyCode||40==e.keyCode?(clearInterval(vars.slideshow_interval),n.prevSlide()):39==e.keyCode||38==e.keyCode?(clearInterval(vars.slideshow_interval),n.nextSlide()):32!=e.keyCode||vars.hover_pause||(clearInterval(vars.slideshow_interval),n.playToggle()),void 0)}),n.options.slideshow&&n.options.pause_hover&&e(n.el).hover(function(){return vars.in_animation?!1:(vars.hover_pause=!0,vars.is_paused||(vars.hover_pause="resume",n.playToggle()),void 0)},function(){"resume"==vars.hover_pause&&(n.playToggle(),vars.hover_pause=!1)}),n.options.slide_links&&e(vars.slide_list+"> li").click(function(){return index=e(vars.slide_list+"> li").index(this),targetSlide=index+1,n.goTo(targetSlide),!1}),n.options.thumb_links&&e(vars.thumb_list+"> li").click(function(){return index=e(vars.thumb_list+"> li").index(this),targetSlide=index+1,api.goTo(targetSlide),!1}),n.options.slideshow&&n.options.slides.length>1&&(n.options.autoplay&&n.options.slides.length>1?vars.slideshow_interval=setInterval(n.nextSlide,n.options.slide_interval):vars.is_paused=!0,e(".load-item img").bind("contextmenu mousedown",function(){return!1})),e(window).resize(function(){n.resizeNow()})},n.resizeNow=function(){return n.$el.each(function(){return e("img",n.el).each(function(){function t(e){e?(thisSlide.width()<s||thisSlide.width()<n.options.min_width)&&(thisSlide.width()*a>=n.options.min_height?(thisSlide.width(n.options.min_width),thisSlide.height(thisSlide.width()*a)):i()):n.options.min_height>=r&&!n.options.fit_landscape?s*a>=n.options.min_height||s*a>=n.options.min_height&&1>=a?(thisSlide.width(s),thisSlide.height(s*a)):a>1?(thisSlide.height(n.options.min_height),thisSlide.width(thisSlide.height()/a)):thisSlide.width()<s&&(thisSlide.width(s),thisSlide.height(thisSlide.width()*a)):(thisSlide.width(s),thisSlide.height(s*a))}function i(e){e?thisSlide.height()<r&&(thisSlide.height()/a>=n.options.min_width?(thisSlide.height(n.options.min_height),thisSlide.width(thisSlide.height()/a)):t(!0)):n.options.min_width>=s?r/a>=n.options.min_width||a>1?(thisSlide.height(r),thisSlide.width(r/a)):1>=a&&(thisSlide.width(n.options.min_width),thisSlide.height(thisSlide.width()*a)):(thisSlide.height(r),thisSlide.width(r/a))}thisSlide=e(this);var a=(thisSlide.data("origHeight")/thisSlide.data("origWidth")).toFixed(2),s=n.$el.width(),r=n.$el.height();n.options.fit_always?r/s>a?t():i():r<=n.options.min_height&&s<=n.options.min_width?r/s>a?n.options.fit_landscape&&1>a?t(!0):i(!0):n.options.fit_portrait&&a>=1?i(!0):t(!0):s<=n.options.min_width?r/s>a?n.options.fit_landscape&&1>a?t(!0):i():n.options.fit_portrait&&a>=1?i():t(!0):r<=n.options.min_height?r/s>a?n.options.fit_landscape&&1>a?t():i(!0):n.options.fit_portrait&&a>=1?i(!0):t():r/s>a?n.options.fit_landscape&&1>a?t():i():n.options.fit_portrait&&a>=1?i():t(),thisSlide.parents("li").hasClass("image-loading")&&e(".image-loading").removeClass("image-loading"),n.options.horizontal_center&&e(this).css("left",(s-e(this).width())/2),n.options.vertical_center&&e(this).css("top",(r-e(this).height())/2)}),n.options.image_protect&&e("img",n.el).bind("contextmenu mousedown",function(){return!1}),!1})},n.nextSlide=function(){if(vars.in_animation||!api.options.slideshow)return!1;vars.in_animation=!0,clearInterval(vars.slideshow_interval);var t=(n.options.slides,n.$el.find(".activeslide"));e(".prevslide").removeClass("prevslide"),t.removeClass("activeslide").addClass("prevslide"),vars.current_slide+1==n.options.slides.length?vars.current_slide=0:vars.current_slide++;var i=e(n.el+" li:eq("+vars.current_slide+")");n.$el.find(".prevslide"),1==n.options.performance&&n.$el.removeClass("quality").addClass("speed"),loadSlide=!1,loadSlide=vars.current_slide==n.options.slides.length-1?0:vars.current_slide+1;var a=n.el+" li:eq("+loadSlide+")";if(!e(a).html()){var s=n.options.new_window?' target="_blank"':"";imageLink=n.options.slides[loadSlide].url?"href='"+n.options.slides[loadSlide].url+"'":"";var r=e('<img src="'+n.options.slides[loadSlide].image+'"/>');r.appendTo(a).wrap("<a "+imageLink+s+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden"),r.load(function(){n._origDim(e(this)),n.resizeNow()})}switch(1==n.options.thumbnail_navigation&&(prevThumb=vars.current_slide-1<0?n.options.slides.length-1:vars.current_slide-1,e(vars.prev_thumb).html(e("<img/>").attr("src",n.options.slides[prevThumb].image)),nextThumb=loadSlide,e(vars.next_thumb).html(e("<img/>").attr("src",n.options.slides[nextThumb].image))),"undefined"!=typeof theme&&"function"==typeof theme.beforeAnimation&&theme.beforeAnimation("next"),n.options.slide_links&&(e(".current-slide").removeClass("current-slide"),e(vars.slide_list+"> li").eq(vars.current_slide).addClass("current-slide")),i.css("visibility","hidden").addClass("activeslide"),n.options.transition){case 0:case"none":i.css("visibility","visible"),vars.in_animation=!1,n.afterAnimation();break;case 1:case"fade":i.animate({opacity:0},0).css("visibility","visible").animate({opacity:1,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 2:case"slideTop":i.animate({top:-n.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 3:case"slideRight":i.animate({left:n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 4:case"slideBottom":i.animate({top:n.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 5:case"slideLeft":i.animate({left:-n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 6:case"carouselRight":i.animate({left:n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()}),t.animate({left:-n.$el.width(),avoidTransforms:!1},n.options.transition_speed);break;case 7:case"carouselLeft":i.animate({left:-n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()}),t.animate({left:n.$el.width(),avoidTransforms:!1},n.options.transition_speed)}return!1},n.prevSlide=function(){if(vars.in_animation||!api.options.slideshow)return!1;vars.in_animation=!0,clearInterval(vars.slideshow_interval);var t=(n.options.slides,n.$el.find(".activeslide"));e(".prevslide").removeClass("prevslide"),t.removeClass("activeslide").addClass("prevslide"),0==vars.current_slide?vars.current_slide=n.options.slides.length-1:vars.current_slide--;var i=e(n.el+" li:eq("+vars.current_slide+")");n.$el.find(".prevslide"),1==n.options.performance&&n.$el.removeClass("quality").addClass("speed"),loadSlide=vars.current_slide;var a=n.el+" li:eq("+loadSlide+")";if(!e(a).html()){var s=n.options.new_window?' target="_blank"':"";imageLink=n.options.slides[loadSlide].url?"href='"+n.options.slides[loadSlide].url+"'":"";var r=e('<img src="'+n.options.slides[loadSlide].image+'"/>');r.appendTo(a).wrap("<a "+imageLink+s+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden"),r.load(function(){n._origDim(e(this)),n.resizeNow()})}switch(1==n.options.thumbnail_navigation&&(prevThumb=0==loadSlide?n.options.slides.length-1:loadSlide-1,e(vars.prev_thumb).html(e("<img/>").attr("src",n.options.slides[prevThumb].image)),nextThumb=vars.current_slide==n.options.slides.length-1?0:vars.current_slide+1,e(vars.next_thumb).html(e("<img/>").attr("src",n.options.slides[nextThumb].image))),"undefined"!=typeof theme&&"function"==typeof theme.beforeAnimation&&theme.beforeAnimation("prev"),n.options.slide_links&&(e(".current-slide").removeClass("current-slide"),e(vars.slide_list+"> li").eq(vars.current_slide).addClass("current-slide")),i.css("visibility","hidden").addClass("activeslide"),n.options.transition){case 0:case"none":i.css("visibility","visible"),vars.in_animation=!1,n.afterAnimation();break;case 1:case"fade":i.animate({opacity:0},0).css("visibility","visible").animate({opacity:1,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 2:case"slideTop":i.animate({top:n.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 3:case"slideRight":i.animate({left:-n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 4:case"slideBottom":i.animate({top:-n.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 5:case"slideLeft":i.animate({left:n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()});break;case 6:case"carouselRight":i.animate({left:-n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()}),t.animate({left:0},0).animate({left:n.$el.width(),avoidTransforms:!1},n.options.transition_speed);break;case 7:case"carouselLeft":i.animate({left:n.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:!1},n.options.transition_speed,function(){n.afterAnimation()}),t.animate({left:0},0).animate({left:-n.$el.width(),avoidTransforms:!1},n.options.transition_speed)}return!1},n.playToggle=function(){return vars.in_animation||!api.options.slideshow?!1:(vars.is_paused?(vars.is_paused=!1,"undefined"!=typeof theme&&"function"==typeof theme.playToggle&&theme.playToggle("play"),vars.slideshow_interval=setInterval(n.nextSlide,n.options.slide_interval)):(vars.is_paused=!0,"undefined"!=typeof theme&&"function"==typeof theme.playToggle&&theme.playToggle("pause"),clearInterval(vars.slideshow_interval)),!1)},n.goTo=function(t){if(vars.in_animation||!api.options.slideshow)return!1;var i=n.options.slides.length;return 0>t?t=i:t>i&&(t=1),t=i-t+1,clearInterval(vars.slideshow_interval),"undefined"!=typeof theme&&"function"==typeof theme.goTo&&theme.goTo(),vars.current_slide==i-t?(vars.is_paused||(vars.slideshow_interval=setInterval(n.nextSlide,n.options.slide_interval)),!1):(i-t>vars.current_slide?(vars.current_slide=i-t-1,vars.update_images="next",n._placeSlide(vars.update_images)):i-t<vars.current_slide&&(vars.current_slide=i-t+1,vars.update_images="prev",n._placeSlide(vars.update_images)),n.options.slide_links&&(e(vars.slide_list+"> .current-slide").removeClass("current-slide"),e(vars.slide_list+"> li").eq(i-t).addClass("current-slide")),n.options.thumb_links&&(e(vars.thumb_list+"> .current-thumb").removeClass("current-thumb"),e(vars.thumb_list+"> li").eq(i-t).addClass("current-thumb")),void 0)},n._placeSlide=function(t){var i=n.options.new_window?' target="_blank"':"";if(loadSlide=!1,"next"==t){loadSlide=vars.current_slide==n.options.slides.length-1?0:vars.current_slide+1;var a=n.el+" li:eq("+loadSlide+")";if(!e(a).html()){var i=n.options.new_window?' target="_blank"':"";imageLink=n.options.slides[loadSlide].url?"href='"+n.options.slides[loadSlide].url+"'":"";var s=e('<img src="'+n.options.slides[loadSlide].image+'"/>');s.appendTo(a).wrap("<a "+imageLink+i+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden"),s.load(function(){n._origDim(e(this)),n.resizeNow()})}n.nextSlide()}else if("prev"==t){loadSlide=vars.current_slide-1<0?n.options.slides.length-1:vars.current_slide-1;var a=n.el+" li:eq("+loadSlide+")";if(!e(a).html()){var i=n.options.new_window?' target="_blank"':"";imageLink=n.options.slides[loadSlide].url?"href='"+n.options.slides[loadSlide].url+"'":"";var s=e('<img src="'+n.options.slides[loadSlide].image+'"/>');s.appendTo(a).wrap("<a "+imageLink+i+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden"),s.load(function(){n._origDim(e(this)),n.resizeNow()})}n.prevSlide()}},n._origDim=function(e){e.data("origWidth",e.width()).data("origHeight",e.height())},n.afterAnimation=function(){return 1==n.options.performance&&n.$el.removeClass("speed").addClass("quality"),vars.update_images&&(setPrev=vars.current_slide-1<0?n.options.slides.length-1:vars.current_slide-1,vars.update_images=!1,e(".prevslide").removeClass("prevslide"),e(n.el+" li:eq("+setPrev+")").addClass("prevslide")),vars.in_animation=!1,!vars.is_paused&&n.options.slideshow&&(vars.slideshow_interval=setInterval(n.nextSlide,n.options.slide_interval),n.options.stop_loop&&vars.current_slide==n.options.slides.length-1&&n.playToggle()),"undefined"!=typeof theme&&"function"==typeof theme.afterAnimation&&theme.afterAnimation(),!1},n.getField=function(e){return n.options.slides[vars.current_slide][e]},n.init()},e.supersized.vars={thumb_tray:"#thumb-tray",thumb_list:"#thumb-list",slide_list:"#slide-list",current_slide:0,in_animation:!1,is_paused:!1,hover_pause:!1,slideshow_interval:!1,update_images:!1,options:{}},e.supersized.defaultOptions={slideshow:1,autoplay:1,start_slide:1,stop_loop:0,random:0,slide_interval:5e3,transition:1,transition_speed:750,new_window:1,pause_hover:0,keyboard_nav:1,performance:1,image_protect:1,fit_always:0,fit_landscape:0,fit_portrait:1,min_width:0,min_height:0,horizontal_center:1,vertical_center:1,slide_links:1,thumb_links:1,thumbnail_navigation:0},e.fn.supersized=function(t){return this.each(function(){new e.supersized(t)})}}(jQuery),window.console||(console={log:function(){}}),jQuery(function(e){"use strict";var t=window.THEME||{};t.fix=function(){if(navigator.userAgent.match(/IEMobile\/10\.0/)){var e=document.createElement("style");e.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")),document.getElementsByTagName("head")[0].appendChild(e)}},t.carousel=function(){e(".carousel").each(function(){var t=e(this);t.find(".item").length>1?t.carousel({interval:3e3}):(t.find(".carousel-control").each(function(){e(this).css({display:"none"})}),t.find(".carousel-indicators").each(function(){e(this).css({display:"none"})}))})},t.supersized=function(){e.supersized({slide_interval:3e3,transition:3,transition_speed:1200,slides:supersized_slides})},e(document).ready(function(){t.fix(),t.carousel(),t.supersized(),e("#contact_us").on("click",function(e){window.open("https://www.formstack.com/forms/?1464607-UGKf87Ck2h"),e.preventDefault()}),e("#table-booking").on("click",function(e){window.open("http://www.formstack.com/forms/?1464587-Dog5K8aIvq"),e.preventDefault()})})});