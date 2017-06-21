//***********************************
//jquery.ui.totop.js
//***********************************
(function ($) {
    $.fn.UItoTop = function (options) {

        var defaults = {
            text: '',
            min: 200,
            scrollSpeed: 800,
            containerID: 'toTop',
            containerHoverID: 'toTopHover',
            easingType: 'linear',
            min_width: parseInt($('body').css("min-width"), 10),
            main_width: parseInt($('body').css("min-width"), 10) / 2

        };

        var settings = $.extend(defaults, options);
        var containerIDhash = '#' + settings.containerID;
        var containerHoverIDHash = '#' + settings.containerHoverID;

        $('body').append('<a href="#" id="' + settings.containerID + '">' + settings.text + '</a>');

        var button_width = parseInt($(containerIDhash).css("width")) + 90
        var button_width_1 = parseInt($(containerIDhash).css("width")) + 20
        var max_width = defaults.min_width + button_width;
        var margin_right_1 = -(defaults.main_width + button_width_1)
        var margin_right_2 = -(defaults.main_width - 20)

        function top() {
            if (($(window).width() <= max_width) && ($(window).width() >= defaults.min_width)) $(containerIDhash).stop().animate({ marginRight: margin_right_2, right: '50%' })
            else if ($(window).width() <= defaults.min_width) $(containerIDhash).stop().css({ marginRight: 0, right: 10 })
            else $(containerIDhash).stop().animate({ marginRight: margin_right_1, right: '50%' })
        }
        top()
        $(containerIDhash).hide().click(function () {
            $('html, body').stop().animate({ scrollTop: 0 }, settings.scrollSpeed, settings.easingType);
            $('#' + settings.containerHoverID, this).stop().animate({ 'opacity': 0 }, settings.inDelay, settings.easingType);
            return false;
        })

		.prepend('<span id="' + settings.containerHoverID + '"></span>')
		.hover(function () {
		    $(containerHoverIDHash, this).stop().animate({
		        'opacity': 1
		    }, 600, 'linear');
		}, function () {
		    $(containerHoverIDHash, this).stop().animate({
		        'opacity': 0
		    }, 700, 'linear');
		});

        $(window).scroll(function () {
            var sd = $(window).scrollTop();
            if (typeof document.body.style.maxHeight === "undefined") {
                $(containerIDhash).css({
                    'position': 'absolute',
                    'top': $(window).scrollTop() + $(window).height() - 50
                });
            }
            if (sd > settings.min)
                $(containerIDhash).css({ display: 'block' });
            else
                $(containerIDhash).css({ display: 'none' });
        });
        $(window).resize(function () { top() })
    };
})(jQuery);

//***********************************
//script.js
//***********************************

$(function () {
// IPad/IPhone
  var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
  ua = navigator.userAgent,

  gestureStart = function () {viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";},

  scaleFix = function () {
    if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
      viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
      document.addEventListener("gesturestart", gestureStart, false);
    }
  };
  
  scaleFix();
  // Menu Android
  if(window.orientation!=undefined){
  var regM = /ipod|ipad|iphone/gi,
   result = ua.match(regM)
  if(!result) {
   $('.sf-menu li').each(function(){
    if($(">ul", this)[0]){
     $(">a", this).toggle(
      function(){
       return false;
      },
      function(){
       window.location.href = $(this).attr("href");
      }
     );
    } 
   })
  }
 }
});
var ua=navigator.userAgent.toLocaleLowerCase(),
 regV = /ipod|ipad|iphone/gi,
 result = ua.match(regV),
 userScale="";
if(!result){
 userScale=",user-scalable=0"
}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0'+userScale+'">')

var currentYear = (new Date).getFullYear();
  $(document).ready(function() {
  $("#copyright-year").text( (new Date).getFullYear() );
  });

  $(function(){
  $('.sf-menu').superfish({autoArrows: true})
})



// DEVICE.JS AND SMOOTH SCROLLIG

function include(url){document.write('<script type="text/javascript" src="'+url+'"></script>')}
include('js/device.js');
include('js/jquery.mousewheel.js');
include('js/jquery.simplr.smoothscroll.js');

  $(function () { 
    if ($('html').hasClass('desktop')) {
        $.srSmoothscroll();
    }
  });

//***********************************
//superfish.js
//***********************************

  (function ($) {
      "use strict";

      var methods = (function () {
          // private properties and methods go here
          var c = {
              bcClass: 'sf-breadcrumb',
              menuClass: 'sf-js-enabled',
              anchorClass: 'sf-with-ul',
              menuArrowClass: 'sf-arrows'
          },
              ios = (function () {
                  var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
                  if (ios) {
                      // iOS clicks only bubble as far as body children
                      $(window).load(function () {
                          $('body').children().on('click', $.noop);
                      });
                  }
                  return ios;
              })(),
              wp7 = (function () {
                  var style = document.documentElement.style;
                  return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
              })(),
              toggleMenuClasses = function ($menu, o) {
                  var classes = c.menuClass;
                  if (o.cssArrows) {
                      classes += ' ' + c.menuArrowClass;
                  }
                  $menu.toggleClass(classes);
              },
              setPathToCurrent = function ($menu, o) {
                  return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
                      .addClass(o.hoverClass + ' ' + c.bcClass)
                          .filter(function () {
                              return ($(this).children(o.popUpSelector).hide().show().length);
                          }).removeClass(o.pathClass);
              },
              toggleAnchorClass = function ($li) {
                  $li.children('a').toggleClass(c.anchorClass);
              },
              toggleTouchAction = function ($menu) {
                  var touchAction = $menu.css('ms-touch-action');
                  touchAction = (touchAction === 'pan-y') ? 'auto' : 'pan-y';
                  $menu.css('ms-touch-action', touchAction);
              },
              applyHandlers = function ($menu, o) {
                  var targets = 'li:has(' + o.popUpSelector + ')';
                  if ($.fn.hoverIntent && !o.disableHI) {
                      $menu.hoverIntent(over, out, targets);
                  }
                  else {
                      $menu
                          .on('mouseenter.superfish', targets, over)
                          .on('mouseleave.superfish', targets, out);
                  }
                  var touchevent = 'MSPointerDown.superfish';
                  if (!ios) {
                      touchevent += ' touchend.superfish';
                  }
                  if (wp7) {
                      touchevent += ' mousedown.superfish';
                  }
                  $menu
                      .on('focusin.superfish', 'li', over)
                      .on('focusout.superfish', 'li', out)
                      .on(touchevent, 'a', o, touchHandler);
              },
              touchHandler = function (e) {
                  var $this = $(this),
                      $ul = $this.siblings(e.data.popUpSelector);

                  if ($ul.length > 0 && $ul.is(':hidden')) {
                      $this.one('click.superfish', false);
                      if (e.type === 'MSPointerDown') {
                          $this.trigger('focus');
                      } else {
                          $.proxy(over, $this.parent('li'))();
                      }
                  }
              },
              over = function () {
                  var $this = $(this),
                      o = getOptions($this);
                  clearTimeout(o.sfTimer);
                  $this.siblings().superfish('hide').end().superfish('show');
              },
              out = function () {
                  var $this = $(this),
                      o = getOptions($this);
                  if (ios) {
                      $.proxy(close, $this, o)();
                  }
                  else {
                      clearTimeout(o.sfTimer);
                      o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
                  }
              },
              close = function (o) {
                  o.retainPath = ($.inArray(this[0], o.$path) > -1);
                  this.superfish('hide');

                  if (!this.parents('.' + o.hoverClass).length) {
                      o.onIdle.call(getMenu(this));
                      if (o.$path.length) {
                          $.proxy(over, o.$path)();
                      }
                  }
              },
              getMenu = function ($el) {
                  return $el.closest('.' + c.menuClass);
              },
              getOptions = function ($el) {
                  return getMenu($el).data('sf-options');
              };

          return {
              // public methods
              hide: function (instant) {
                  if (this.length) {
                      var $this = this,
                          o = getOptions($this);
                      if (!o) {
                          return this;
                      }
                      var not = (o.retainPath === true) ? o.$path : '',
                          $ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),
                          speed = o.speedOut;

                      if (instant) {
                          $ul.show();
                          speed = 0;
                      }
                      o.retainPath = false;
                      o.onBeforeHide.call($ul);
                      $ul.stop(true, true).animate(o.animationOut, speed, function () {
                          var $this = $(this);
                          o.onHide.call($this);
                      });
                  }
                  return this;
              },
              show: function () {
                  var o = getOptions(this);
                  if (!o) {
                      return this;
                  }
                  var $this = this.addClass(o.hoverClass),
                      $ul = $this.children(o.popUpSelector);

                  o.onBeforeShow.call($ul);
                  $ul.stop(true, true).animate(o.animation, o.speed, function () {
                      o.onShow.call($ul);
                  });
                  return this;
              },
              destroy: function () {
                  return this.each(function () {
                      var $this = $(this),
                          o = $this.data('sf-options'),
                          $hasPopUp;
                      if (!o) {
                          return false;
                      }
                      $hasPopUp = $this.find(o.popUpSelector).parent('li');
                      clearTimeout(o.sfTimer);
                      toggleMenuClasses($this, o);
                      toggleAnchorClass($hasPopUp);
                      toggleTouchAction($this);
                      // remove event handlers
                      $this.off('.superfish').off('.hoverIntent');
                      // clear animation's inline display style
                      $hasPopUp.children(o.popUpSelector).attr('style', function (i, style) {
                          return style.replace(/display[^;]+;?/g, '');
                      });
                      // reset 'current' path classes
                      o.$path.removeClass(o.hoverClass + ' ' + c.bcClass).addClass(o.pathClass);
                      $this.find('.' + o.hoverClass).removeClass(o.hoverClass);
                      o.onDestroy.call($this);
                      $this.removeData('sf-options');
                  });
              },
              init: function (op) {
                  return this.each(function () {
                      var $this = $(this);
                      if ($this.data('sf-options')) {
                          return false;
                      }
                      var o = $.extend({}, $.fn.superfish.defaults, op),
                          $hasPopUp = $this.find(o.popUpSelector).parent('li');
                      o.$path = setPathToCurrent($this, o);

                      $this.data('sf-options', o);

                      toggleMenuClasses($this, o);
                      toggleAnchorClass($hasPopUp);
                      toggleTouchAction($this);
                      applyHandlers($this, o);

                      $hasPopUp.not('.' + c.bcClass).superfish('hide', true);

                      o.onInit.call(this);
                  });
              }
          };
      })();

      $.fn.superfish = function (method, args) {
          if (methods[method]) {
              return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
          }
          else if (typeof method === 'object' || !method) {
              return methods.init.apply(this, arguments);
          }
          else {
              return $.error('Method ' + method + ' does not exist on jQuery.fn.superfish');
          }
      };

      $.fn.superfish.defaults = {
          popUpSelector: 'ul,.sf-mega', // within menu context
          hoverClass: 'sfHover',
          pathClass: 'overrideThisToUse',
          pathLevels: 1,
          delay: 800,
          animation: { opacity: 'show' },
          animationOut: { opacity: 'hide' },
          speed: 'normal',
          speedOut: 'fast',
          cssArrows: true,
          disableHI: false,
          onInit: $.noop,
          onBeforeShow: $.noop,
          onShow: $.noop,
          onBeforeHide: $.noop,
          onHide: $.noop,
          onIdle: $.noop,
          onDestroy: $.noop
      };

      // soon to be deprecated
      $.fn.extend({
          hideSuperfishUl: methods.hide,
          showSuperfishUl: methods.show
      });

  })(jQuery);

//***********************************
//jquery.equalheights.js
//***********************************

  /*parsed HTML*/

  $(function () {
      $(".maxheight").each(function () {
          $(this).contents().wrapAll("<div class='box_inner'></div>");
      })
      $(".maxheight1").each(function () {
          $(this).contents().wrapAll("<div class='box_inner'></div>");
      })
      $(".maxheight2").each(function () {
          $(this).contents().wrapAll("<div class='box_inner'></div>");
      })
  })
  /*add event*/
  $(window).bind("resize", height_handler).bind("load", height_handler)
  function height_handler() {
      if ($(window).width() > 767) {
          $(".maxheight").equalHeights();
      } else {
          $(".maxheight").css({ 'height': 'auto' });
      }
      if ($(window).width() > 767) {
          $(".maxheight1").equalHeights();
      } else {
          $(".maxheight1").css({ 'height': 'auto' });
      }
      if ($(window).width() > 767) {
          $(".maxheight2").equalHeights();
      } else {
          $(".maxheight2").css({ 'height': 'auto' });
      }
  }
  /*glob function*/
  (function ($) {
      $.fn.equalHeights = function (minHeight, maxHeight) {
          tallest = (minHeight) ? minHeight : 0;
          this.each(function () {
              if ($(">.box_inner", this).outerHeight() > tallest) {
                  tallest = $(">.box_inner", this).outerHeight()
              }
          });
          if ((maxHeight) && tallest > maxHeight) tallest = maxHeight;
          return this.each(function () { $(this).height(tallest) })
      }
  })(jQuery)
