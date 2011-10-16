/*
Script: Tips.js
	Class for creating nice tips that follow the mouse cursor when hovering an element.

License:
	MIT-style license.
*/
//MooTools More, <http://mootools.net/more>. Copyright (c) 2006-2008 Valerio Proietti, <http://mad4milk.net>, MIT Style License.
//edited Eric Schrijver 12-08

var Tips = new Class({

	Implements: [Events, Options],

	options: {
		onShow: function(tip){
			tip.setStyle('visibility', 'visible');
		},
		onHide: function(tip){
			tip.setStyle('visibility', 'hidden');
		},
		showDelay: 100,
		hideDelay: 100,
		className: null,
		offsets: {x: 16, y: 16},
		fixed: false
	},

	initialize: function(){
		var params = Array.link(arguments, {options: Object.type, elements: $defined});
		this.setOptions(params.options || null);
		
		this.tip = new Element('div').inject(document.body);
		
		if (this.options.className) this.tip.addClass(this.options.className);
		
//		var top = new Element('div', {'class': 'tip-top'}).inject(this.tip);
		this.container = new Element('div', {'class': 'tip'}).inject(this.tip);
//		var bottom = new Element('div', {'class': 'tip-bottom'}).inject(this.tip);

		this.tip.setStyles({position: 'absolute', top: 0, left: 0, visibility: 'hidden'});
		
		if (params.elements) this.attach(params.elements);
	},
	
	attach: function(elements){
		$$(elements).each(function(element){
			var title = element.retrieve('tip:title', element.get('title'));
			//			var text = element.retrieve('tip:text', element.get('rel') || element.get('href'));
			var text = element.retrieve('tip:text', element.get('href'));
/*E think its stupid that the script wants to use the rel value as a descriptive text. It might be a good plan to -determine- the descriptive text from the rel value, but the rel value in your html should be an abstraction that can be put to different uses, not text presented to the end user. */
			var enter = element.retrieve('tip:enter', this.elementEnter.bindWithEvent(this, element));
			var leave = element.retrieve('tip:leave', this.elementLeave.bindWithEvent(this, element));
			element.addEvents({mouseenter: enter, mouseleave: leave});
			if (!this.options.fixed){
				var move = element.retrieve('tip:move', this.elementMove.bindWithEvent(this, element));
				element.addEvent('mousemove', move);
			}
			element.store('tip:native', element.get('title'));
			element.erase('title');
		}, this);
		return this;
	},
	
	detach: function(elements){
		$$(elements).each(function(element){
			element.removeEvent('mouseenter', element.retrieve('tip:enter') || $empty);
			element.removeEvent('mouseleave', element.retrieve('tip:leave') || $empty);
			element.removeEvent('mousemove', element.retrieve('tip:move') || $empty);
			element.eliminate('tip:enter').eliminate('tip:leave').eliminate('tip:move');
			var original = element.retrieve('tip:native');
			if (original) element.set('title', original);
		});
		return this;
	},
	
	elementEnter: function(event, element){
		
		$A(this.container.childNodes).each(Element.dispose);
		
		var title = element.retrieve('tip:title');
		
		if (title){
			this.titleElement = new Element('div', {'class': 'tip-title'}).inject(this.container);
			this.fill(this.titleElement, title);
		}
		
		var text = element.retrieve('tip:text');
		if (text){
			this.textElement = new Element('div', {'class': 'tip-text'}).inject(this.container);
			this.fill(this.textElement, text);
		}
		
		this.timer = $clear(this.timer);
		this.timer = this.show.delay(this.options.showDelay, this);

		this.position((!this.options.fixed) ? event : {page: element.getPosition()});
	},
	
	elementLeave: function(event){
		$clear(this.timer);
		this.timer = this.hide.delay(this.options.hideDelay, this);
	},
	
	elementMove: function(event){
		this.position(event);
	},
	
	position: function(event){
		var size = window.getSize(), scroll = window.getScroll();
		var tip = {x: this.tip.offsetWidth, y: this.tip.offsetHeight};
		var props = {x: 'left', y: 'top'};
		for (var z in props){
			var pos = event.page[z] + this.options.offsets[z];
			if ((pos + tip[z] - scroll[z]) > size[z]) pos = event.page[z] - this.options.offsets[z] - tip[z];
			this.tip.setStyle(props[z], pos);
		}
	},
	
	fill: function(element, contents){
		(typeof contents == 'string') ? element.set('html', contents) : element.adopt(contents);
	},

	show: function(){
		this.fireEvent('show', this.tip);
	},

	hide: function(){
		this.fireEvent('hide', this.tip);
	}

});


/*
Script: Clientcide.js
	The Clientcide namespace.

License:
	http://www.clientcide.com/wiki/cnet-libraries#license
*/
var Clientcide = {
	version: '765',
	setAssetLocation: function(baseHref) {
		if (window.StickyWin && StickyWin.ui) {
			StickyWin.UI.refactor({
				options: {
					baseHref: baseHref + '/stickyWinHTML/'
				}
			});
			if (StickyWin.alert) {
				var CGFsimpleErrorPopup = StickyWin.alert.bind(window);
				StickyWin.alert = function(msghdr, msg, base) {
				    return CGFsimpleErrorPopup(msghdr, msg, base||baseHref + "/simple.error.popup");
				};
			}
		}
		if (window.TagMaker) {
			TagMaker = TagMaker.refactor({
			    options: {
			        baseHref: baseHref + '/tips/'
			    }
			});
		}
		if (window.ProductPicker) {
			ProductPicker.refactor({
			    options:{
			        baseHref: baseHref + '/Picker'
			    }
			});
		}

		if (window.Autocompleter) {
			var AcClientcide = {
					options: {
						baseHref: baseHref + '/autocompleter/'
					}
			};
			Autocompleter.Base.refactor(AcClientcide);
			if (Autocompleter.Ajax) {
				["Base", "Xhtml", "Json"].each(function(c){
					if(Autocompleter.Ajax[c]) Autocompleter.Ajax[c].refactor(AcClientcide);
				});
			}
			if (Autocompleter.Local) Autocompleter.Local.refactor(AcClientcide);
			if (Autocompleter.JsonP) Autocompleter.JsonP.refactor(AcClientcide);
		}

		if (window.Lightbox) {
			Lightbox.refactor({
			    options: {
			        assetBaseUrl: baseHref + '/slimbox/'
			    }
			});
		}

		if (window.Waiter) {
			Waiter.refactor({
				options: {
					baseHref: baseHref + '/waiter/'
				}
			});
		}
	},
	preLoadCss: function(){
		if (window.DatePicker) new DatePicker();
		if (window.ProductPicker) new ProductPicker();
		if (window.TagMaker) new TagMaker();
		if (window.StickyWin && StickyWin.ui) StickyWin.ui();
		if (window.StickyWin && StickyWin.pointy) StickyWin.pointy();
		Clientcide.preloaded = true;
		return true;
	},
	preloaded: false
};
(function(){
	if (!window.addEvent) return;
	var preload = function(){
		if (window.dbug) dbug.log('preloading clientcide css');
		if (!Clientcide.preloaded) Clientcide.preLoadCss();
	};
	window.addEvent('domready', preload);
	window.addEvent('load', preload);
})();
setCNETAssetBaseHref = Clientcide.setAssetLocation;

/*
Script: Chain.Wait.js
	Adds a method to inject pauses between chained events.

License:
	http://www.clientcide.com/wiki/cnet-libraries#license
*/
(function(){
	var wait = {
		wait: function(duration){
			return this.chain(function(){
				this.callChain.delay($pick(duration, 500), this);
			}.bind(this));
		}
	};
	Chain.implement(wait);
	if (window.Fx) {
		Fx.implement(wait);
		['Css', 'Tween', 'Elements'].each(function(cls) {
			if (Fx[cls]) Fx[cls].implement(wait);
		});
	}

	try {
		Element.implement({
			chains: function(effects){
				$splat($pick(effects, ['tween', 'morph', 'reveal'])).each(function(effect){
					this.get(effect).setOptions({
						link:'chain'
					});
				}, this);
				return this;
			},
			pauseFx: function(duration, effect) {
				this.chains(effect).get($pick(effect, 'tween')).wait(duration);
				return this;
			}
		});
	} catch(e){}
})();

/*--------------------------------------------------------------------------
 *  Smooth Scroller Script, version 1.0.1
 *  (c) 2007 Dezinerfolio Inc. <midart@gmail.com>
 *
 *  For details, please check the website : http://dezinerfolio.com/
 *
/*--------------------------------------------------------------------------*/

Scroller = {
	// control the speed of the scroller.
	// dont change it here directly, please use Scroller.speed=50;
	speed:10,

	// returns the Y position of the div
	gy: function (d) {
		gy = d.offsetTop
		if (d.offsetParent) while (d = d.offsetParent) gy += d.offsetTop
		return gy
	},

	// returns the current scroll position
	scrollTop: function (){
		body=document.body
	    d=document.documentElement
	    if (body && body.scrollTop) return body.scrollTop
	    if (d && d.scrollTop) return d.scrollTop
	    if (window.pageYOffset) return window.pageYOffset
	    return 0
	},

	// attach an event for an element
	// (element, type, function)
	add: function(event, body, d) {
	    if (event.addEventListener) return event.addEventListener(body, d,false)
	    if (event.attachEvent) return event.attachEvent('on'+body, d)
	},

	// kill an event of an element
	end: function(e){
		if (window.event) {
			window.event.cancelBubble = true
			window.event.returnValue = false
      		return;
    	}
	    if (e.preventDefault && e.stopPropagation) {
	      e.preventDefault()
	      e.stopPropagation()
	    }
	},
	
	// move the scroll bar to the particular div.
	scroll: function(d){
		i = window.innerHeight || document.documentElement.clientHeight;
		h=document.body.scrollHeight;
		a = Scroller.scrollTop()
		if(d>a)
			if(h-d>i)
				a+=Math.ceil((d-a)/Scroller.speed)
			else
				a+=Math.ceil((d-a-(h-d))/Scroller.speed)
		else
			a = a+(d-a)/Scroller.speed;
		window.scrollTo(0,a)
	  	if(a==d || Scroller.offsetTop==a)clearInterval(Scroller.interval)
	  	Scroller.offsetTop=a
	},
	// initializer that adds the renderer to the onload function of the window
	init: function(){
		Scroller.add(window,'load', Scroller.render)
	},

	// this method extracts all the anchors and validates then as # and attaches the events.
render: function(){
var a = document.getElementsByTagName('a');
Scroller.end(this);
for (var i=0, size=a.length;i<size;i++) {
var l = a[i];
if(l.href && l.href.indexOf('#') != -1 && ((l.pathname==location.pathname) || ('/'+l.pathname==location.pathname)) ){
Scroller.add(l,'click',Scroller.end);
l.onclick = function(){
Scroller.end(this);
var l=this.hash.substr(1),
a = document.getElementsByTagName('a');
for (var i=0, size=a.length;i<size;i++) {
if
(document.getElementById(l)) {
clearInterval(Scroller.interval);
Scroller.interval=setInterval('Scroller.scroll('+Scroller.gy(document.getElementById(l))+')',10);
}
}
}
}
}
}
}
// invoke the initializer of the scroller
Scroller.init();


/*------------------------------------------------------------
 *						END OF CODE
/*-----------------------------------------------------------*/

/*-----------------------------------------------------------------------*/

/*--- Eric 2009: ----*/

WordCrop = {

    numberOfWords: 9,
    
    operatesOn: 'blockquote',
    
    cropWords: function(){
        $$(WordCrop.operatesOn).each(function(crop) {
            var wholeText = crop.get('text');
            var croppedText = '';
            allWords = wholeText.split(' ');
            for (x=0; x<=WordCrop.numberOfWords; x++) {
            croppedText += allWords[x] + ' ';
            };
            croppedText += '(…)';
            crop.set('text',croppedText);
            });
    }
};
/*-------------------------*/