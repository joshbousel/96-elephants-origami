/*
  edited by Doug Avery to include Android detection

	conditionizr v2.2.0
	conditionizr.com
	by Todd Motto & Mark Goodyear
	@toddmotto    & @markgdyr
	Latest version: https://github.com/conditionizr/conditionizr

	Conditionizr, the conditional free legacy, retina, touch, script and style loader.
*/

; var conditionizr = function (options) {

	var doc = document;
	var docEl = doc.documentElement;

	docEl.id = 'conditionizr';

	var settings = {
		debug     : false,
		scriptSrc : 'js/conditionizr/',
		styleSrc  : 'css/conditionizr/',
		ieLessThan: { active: false, version: '9', scripts: false, styles: false, classes: true, customScript: false },
		chrome    : { scripts: false, styles: false, classes: true, customScript: false },
		safari    : { scripts: false, styles: false, classes: true, customScript: false },
		opera     : { scripts: false, styles: false, classes: true, customScript: false },
		firefox   : { scripts: false, styles: false, classes: true, customScript: false },
		ie10      : { scripts: false, styles: false, classes: true, customScript: false },
		ie9       : { scripts: false, styles: false, classes: true, customScript: false },
		ie8       : { scripts: false, styles: false, classes: true, customScript: false },
		ie7       : { scripts: false, styles: false, classes: true, customScript: false },
		ie6       : { scripts: false, styles: false, classes: true, customScript: false },
		retina    : { scripts: false, styles: false, classes: true, customScript: false },
		touch     : { scripts: false, styles: false, classes: true, customScript: false },
		mac       : true,
		win       : true,
		x11       : true,
		linux     : true,
		android   : true
	};

	function conditionizrMerge(obj1, obj2) {
		for (var p in obj2) {
			try {
				if (obj2[p].constructor == Object) {
					obj1[p] = conditionizrMerge(obj1[p], obj2[p]);
				} else {
					obj1[p] = obj2[p];
				}
			} catch (e) {
				obj1[p] = obj2[p];
			}
		}
		return obj1;
	}

	if (options) {
		conditionizrMerge(settings, options);
	}

	function conditionizrLoader() {

		for (var resourceType in browserSettings) {
			var val = browserSettings[resourceType];
			var head = doc.getElementsByTagName('head')[0];

			if (resourceType === 'classes' && val) {
				docEl.className += ' ' + theBrowser;
			}

			if (resourceType === 'scripts' && val) {
				var scriptTag = doc.createElement('script');
				scriptTag.src = settings.scriptSrc + theBrowser + '.js';
				head.appendChild(scriptTag);
			}

			if (resourceType === 'styles' && val) {
				var linkTag = doc.createElement('link');
				linkTag.rel = 'stylesheet';
				linkTag.href = settings.styleSrc + theBrowser + '.css';
				head.appendChild(linkTag);
			}

			if (resourceType === 'customScript' && val ) {
				var strip = browserSettings.customScript.replace(/\s/g, '');
				var customSplit = strip.split(',');
				for(var i = 0; i < customSplit.length; i++) {
					var customScriptTag = doc.createElement('script');
					customScriptTag.src = customSplit[i];
					head.appendChild(customScriptTag);
				}
			}
		}
	}

	var actualBrowser = '';

	var browsers = [
		{ 'testWith': 'chrome', 'testSettings': settings.chrome },
		{ 'testWith': 'safari', 'testSettings': settings.safari },
		{ 'testWith': 'firefox', 'testSettings': settings.firefox },
		{ 'testWith': 'opera', 'testSettings': settings.opera }
	];

	for (var i = 0; i < browsers.length; i++) {
		var currentBrowser = browsers[i];

		if (navigator.userAgent.toLowerCase().indexOf(currentBrowser.testWith) > -1) {
			var browserSettings = currentBrowser.testSettings;
			var theBrowser = currentBrowser.testWith;
			conditionizrLoader();
			actualBrowser	= theBrowser;
			break;
		}
	}

	function getIEVersion() {
		var rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');

			if (re.exec(ua) != null) {
				rv = parseFloat(RegExp.$1);
			}
		}
		return rv;
	}

	var version = getIEVersion();

	if (version > -1) {

		if (version < settings.ieLessThan.version + '.0') {
			var theBrowser = 'lt-ie' + settings.ieLessThan.version;
			var browserSettings = settings.ieLessThan;
			conditionizrLoader();
		}

		if (version === 10.0) {
			var browserSettings = settings.ie10;
		}
		else if (version === 9.0) {
			var browserSettings = settings.ie9;
		}
		else if (version === 8.0) {
			var browserSettings = settings.ie8;
		}
		else if (version === 7.0) {
			var browserSettings = settings.ie7;
		}
		else if (version === 6.0) {
			var browserSettings = settings.ie6;
		}

		var theBrowser = 'ie' + version;

		conditionizrLoader();

		actualBrowser	= theBrowser;

	}

	var browserExtras = '';

	if (window.devicePixelRatio >= 2) {

		var browserSettings = settings.retina;
		var theBrowser = 'retina';

		conditionizrLoader();

		browserExtras	+= ' ' + theBrowser;
		theBrowser 		= actualBrowser;

	} else {
		docEl.className += ' no-retina';
	}

	if('ontouchstart' in window) {

		var browserSettings = settings.touch,
			theBrowser = 'touch';

		conditionizrLoader();

		browserExtras	+= ' ' + theBrowser;
		theBrowser 		= actualBrowser;

	} else {
		docEl.className += ' no-touch';
	}

	var oSys = [
		{ 'testWith': 'Win', 'testSettings': settings.win },
		{ 'testWith': 'Mac', 'testSettings': settings.mac },
		{ 'testWith': 'X11', 'testSettings': settings.x11 },
		{ 'testWith': 'Android', 'testSettings': settings.android },
		{ 'testWith': 'Linux', 'testSettings': settings.linux }
	];

	for (var i = 0; i < oSys.length; i++) {

		var currentPlatform = oSys[i];

		if (navigator.appVersion.indexOf(currentPlatform.testWith) > -1) {
			var osSettings = currentPlatform.testSettings;
			var theOS = currentPlatform.testWith;

			if (osSettings) {
				docEl.className += ' ' + currentPlatform.testWith.toLowerCase();
			}
			break;
		}
	}

	if (settings.debug) {
		console.log('Start Conditionizr Debug\n');
		console.log('Script location: ' + settings.scriptSrc);
		console.log('Style location: ' + settings.styleSrc);
		console.log('Browser: ' + theBrowser);
		if(browserExtras) {
			console.log('Browser Extras: ' + browserExtras);
		}
		console.log('OS: ' + theOS);
		console.log('End Conditionizr Debug\n');
	}
};
/* Modernizr 2.7.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-backgroundsize-rgba-cssanimations-csstransforms-csstransforms3d-shiv-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-network_connection
 */

;window.Modernizr=function(a,b,c){function A(a){j.cssText=a}function B(a,b){return A(m.join(a+";")+(b||""))}function C(a,b){return typeof a===b}function D(a,b){return!!~(""+a).indexOf(b)}function E(a,b){for(var d in a){var e=a[d];if(!D(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function F(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:C(f,"function")?f.bind(d||b):f}return!1}function G(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return C(b,"string")||C(b,"undefined")?E(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),F(e,b,c))}var d="2.7.1",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=C(e[d],"function"),C(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),y={}.hasOwnProperty,z;!C(y,"undefined")&&!C(y.call,"undefined")?z=function(a,b){return y.call(a,b)}:z=function(a,b){return b in a&&C(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.rgba=function(){return A("background-color:rgba(150,255,150,.5)"),D(j.backgroundColor,"rgba")},q.backgroundsize=function(){return G("backgroundSize")},q.cssanimations=function(){return G("animationName")},q.csstransforms=function(){return!!G("transform")},q.csstransforms3d=function(){var a=!!G("perspective");return a&&"webkitPerspective"in g.style&&w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a};for(var H in q)z(q,H)&&(v=H.toLowerCase(),e[v]=q[H](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)z(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},A(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.hasEvent=x,e.testProp=function(a){return E([a])},e.testAllProps=G,e.testStyles=w,e.prefixed=function(a,b,c){return b?G(a,b,c):G(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),Modernizr.addTest("lowbandwidth",function(){var a=navigator.connection||{type:0};return a.type==3||a.type==4||/^[23]g$/.test(a.type)});
(function() {
  var s, wf;

  conditionizr();

  window.WebFontConfig = {
    typekit: {
      id: 'pqo6eww'
    },
    custom: {
      families: ['merriam']
    },
    timeout: 2000
  };

  wf = document.createElement('script');

  wf.src = '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';

  wf.async = 'true';

  s = document.getElementsByTagName('script')[0];

  s.parentNode.insertBefore(wf, s);

}).call(this);
