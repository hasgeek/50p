/*!
 * jQuery Mousewheel 3.1.12
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
(function(e){typeof define=="function"&&define.amd?define(["jquery"],e):typeof exports=="object"?module.exports=e:e(jQuery)})(function(e){function t(t){var s=t||window.event,a=h.call(arguments,1),r=0,f=0,d=0,c=0,m=0,g=0;if(t=e.event.fix(s),t.type="mousewheel","detail"in s&&(d=s.detail*-1),"wheelDelta"in s&&(d=s.wheelDelta),"wheelDeltaY"in s&&(d=s.wheelDeltaY),"wheelDeltaX"in s&&(f=s.wheelDeltaX*-1),"axis"in s&&s.axis===s.HORIZONTAL_AXIS&&(f=d*-1,d=0),r=d===0?f:d,"deltaY"in s&&(d=s.deltaY*-1,r=d),"deltaX"in s&&(f=s.deltaX,d===0&&(r=f*-1)),d!==0||f!==0){if(s.deltaMode===1){var w=e.data(this,"mousewheel-line-height");r*=w,d*=w,f*=w}else if(s.deltaMode===2){var v=e.data(this,"mousewheel-page-height");r*=v,d*=v,f*=v}if(c=Math.max(Math.abs(d),Math.abs(f)),(!l||l>c)&&(l=c,i(s,c)&&(l/=40)),i(s,c)&&(r/=40,f/=40,d/=40),r=Math[r>=1?"floor":"ceil"](r/l),f=Math[f>=1?"floor":"ceil"](f/l),d=Math[d>=1?"floor":"ceil"](d/l),u.settings.normalizeOffset&&this.getBoundingClientRect){var p=this.getBoundingClientRect();m=t.clientX-p.left,g=t.clientY-p.top}return t.deltaX=f,t.deltaY=d,t.deltaFactor=l,t.offsetX=m,t.offsetY=g,t.deltaMode=0,a.unshift(t,r,f,d),o&&clearTimeout(o),o=setTimeout(n,200),(e.event.dispatch||e.event.handle).apply(this,a)}}function n(){l=null}function i(e,t){return u.settings.adjustOldDeltas&&e.type==="mousewheel"&&t%120===0}var o,l,s=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],a="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],h=Array.prototype.slice;if(e.event.fixHooks)for(var r=s.length;r;)e.event.fixHooks[s[--r]]=e.event.mouseHooks;var u=e.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var n=a.length;n;)this.addEventListener(a[--n],t,!1);else this.onmousewheel=t;e.data(this,"mousewheel-line-height",u.getLineHeight(this)),e.data(this,"mousewheel-page-height",u.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var n=a.length;n;)this.removeEventListener(a[--n],t,!1);else this.onmousewheel=null;e.removeData(this,"mousewheel-line-height"),e.removeData(this,"mousewheel-page-height")},getLineHeight:function(t){var n=e(t),i=n["offsetParent"in e.fn?"offsetParent":"parent"]();return i.length||(i=e("body")),parseInt(i.css("fontSize"),10)||parseInt(n.css("fontSize"),10)||16},getPageHeight:function(t){return e(t).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})});