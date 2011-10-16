/*
Script: dbug.js
	A wrapper for Firebug console.* statements.

License:
	http://clientside.cnet.com/wiki/cnet-libraries#license
*/
var dbug = {
	logged: [],	
	timers: {},
	firebug: false, 
	enabled: false, 
	log: function() {
		dbug.logged.push(arguments);
	},
	nolog: function(msg) {
		dbug.logged.push(arguments);
	},
	time: function(name){
		dbug.timers[name] = new Date().getTime();
	},
	timeEnd: function(name){
		if (dbug.timers[name]) {
			var end = new Date().getTime() - dbug.timers[name];
			dbug.timers[name] = false;
			dbug.log('%s: %s', name, end);
		} else dbug.log('no such timer: %s', name);
	},
	enable: function(silent) { 
		if(dbug.firebug) {
			try {
				dbug.enabled = true;
				dbug.log = function(){
						(console.debug || console.log).apply(console, arguments);
				};
				dbug.time = function(){
					console.time.apply(console, arguments);
				};
				dbug.timeEnd = function(){
					console.timeEnd.apply(console, arguments);
				};
				if(!silent) dbug.log('enabling dbug');
				for(var i=0;i<dbug.logged.length;i++){ dbug.log.apply(console, dbug.logged[i]); }
				dbug.logged=[];
			} catch(e) {
				dbug.enable.delay(400);
			}
		}
	},
	disable: function(){ 
		if(dbug.firebug) dbug.enabled = false;
		dbug.log = dbug.nolog;
		dbug.time = function(){};
		dbug.timeEnd = function(){};
	},
	cookie: function(set){
		var value = document.cookie.match('(?:^|;)\\s*jsdebug=([^;]*)');
		var debugCookie = value ? unescape(value[1]) : false;
		if((!$defined(set) && debugCookie != 'true') || ($defined(set) && set)) {
			dbug.enable();
			dbug.log('setting debugging cookie');
			var date = new Date();
			date.setTime(date.getTime()+(24*60*60*1000));
			document.cookie = 'jsdebug=true;expires='+date.toGMTString()+';path=/;';
		} else dbug.disableCookie();
	},
	disableCookie: function(){
		dbug.log('disabling debugging cookie');
		document.cookie = 'jsdebug=false;path=/;';
	}
};

(function(){
	var fb = typeof console != "undefined";
	var debugMethods = ['debug','info','warn','error','assert','dir','dirxml'];
	var otherMethods = ['trace','group','groupEnd','profile','profileEnd','count'];
	function set(methodList, defaultFunction) {
		for(var i = 0; i < methodList.length; i++){
			dbug[methodList[i]] = (fb && console[methodList[i]])?console[methodList[i]]:defaultFunction;
		}
	};
	set(debugMethods, dbug.log);
	set(otherMethods, function(){});
})();
if (typeof console != "undefined" && console.warn){
	dbug.firebug = true;
	var value = document.cookie.match('(?:^|;)\\s*jsdebug=([^;]*)');
	var debugCookie = value ? unescape(value[1]) : false;
	if(window.location.href.indexOf("jsdebug=true")>0 || debugCookie=='true') dbug.enable();
	if(debugCookie=='true')dbug.log('debugging cookie enabled');
	if(window.location.href.indexOf("jsdebugCookie=true")>0){
		dbug.cookie();
		if(!dbug.enabled)dbug.enable();
	}
	if(window.location.href.indexOf("jsdebugCookie=false")>0)dbug.disableCookie();
}


/*
Script: Element.Measure.js
	Extends the Element native object to include methods useful in measuring dimensions.

License:
	http://clientside.cnet.com/wiki/cnet-libraries#license
*/

Element.implement({

	expose: function(){
		if (this.getStyle('display') != 'none') return $empty;
		var before = {};
		var styles = { visibility: 'hidden', display: 'block', position:'absolute' };
		//use this method instead of getStyles 
		$each(styles, function(value, style){
			before[style] = this.style[style]||'';
		}, this);
		//this.getStyles('visibility', 'display', 'position');
		this.setStyles(styles);
		return (function(){ this.setStyles(before); }).bind(this);
	},
	
	getDimensions: function(options) {
		options = $merge({computeSize: false},options);
		var dim = {};
		function getSize(el, options){
			return (options.computeSize)?el.getComputedSize(options):el.getSize();
		};
		if(this.getStyle('display') == 'none'){
			var restore = this.expose();
			dim = getSize(this, options); //works now, because the display isn't none
			restore(); //put it back where it was
		} else {
			try { //safari sometimes crashes here, so catch it
				dim = getSize(this, options);
			}catch(e){}
		}
		return $chk(dim.x)?$extend(dim, {width: dim.x, height: dim.y}):$extend(dim, {x: dim.width, y: dim.height});
	},
	
	getComputedSize: function(options){
		options = $merge({
			styles: ['padding','border'],
			plains: {height: ['top','bottom'], width: ['left','right']},
			mode: 'both'
		}, options);
		var size = {width: 0,height: 0};
		switch (options.mode){
			case 'vertical':
				delete size.width;
				delete options.plains.width;
				break;
			case 'horizontal':
				delete size.height;
				delete options.plains.height;
				break;
		};
		var getStyles = [];
		//this function might be useful in other places; perhaps it should be outside this function?
		$each(options.plains, function(plain, key){
			plain.each(function(edge){
				options.styles.each(function(style){
					getStyles.push((style=="border")?style+'-'+edge+'-'+'width':style+'-'+edge);
				});
			});
		});
		var styles = this.getStyles.apply(this, getStyles);
		var subtracted = [];
		$each(options.plains, function(plain, key){ //keys: width, height, plains: ['left','right'], ['top','bottom']
			size['total'+key.capitalize()] = 0;
			size['computed'+key.capitalize()] = 0;
			plain.each(function(edge){ //top, left, right, bottom
				size['computed'+edge.capitalize()] = 0;
				getStyles.each(function(style,i){ //padding, border, etc.
					//'padding-left'.test('left') size['totalWidth'] = size['width']+[padding-left]
					if(style.test(edge)) {
						styles[style] = styles[style].toInt(); //styles['padding-left'] = 5;
						if(isNaN(styles[style]))styles[style]=0;
						size['total'+key.capitalize()] = size['total'+key.capitalize()]+styles[style];
						size['computed'+edge.capitalize()] = size['computed'+edge.capitalize()]+styles[style];
					}
					//if width != width (so, padding-left, for instance), then subtract that from the total
					if(style.test(edge) && key!=style && 
						(style.test('border') || style.test('padding')) && !subtracted.contains(style)) {
						subtracted.push(style);
						size['computed'+key.capitalize()] = size['computed'+key.capitalize()]-styles[style];
					}
				});
			});
		});
		if($chk(size.width)) {
			size.width = size.width+this.offsetWidth+size.computedWidth;
			size.totalWidth = size.width + size.totalWidth;
			delete size.computedWidth;
		}
		if($chk(size.height)) {
			size.height = size.height+this.offsetHeight+size.computedHeight;
			size.totalHeight = size.height + size.totalHeight;
			delete size.computedHeight;
		}
		return $extend(styles, size);
	}
});


/*
Script: Element.Shortcuts.js
	Extends the Element native object to include some shortcut methods.

License:
	http://clientside.cnet.com/wiki/cnet-libraries#license
*/

Element.implement({
	isVisible: function() {
		return this.getStyle('display') != 'none';
	},
	toggle: function() {
		return this[this.isVisible() ? 'hide' : 'show']();
	},
	hide: function() {
		var d;
		try {
			//IE fails here if the element is not in the dom
			if ('none' != this.getStyle('display')) d = this.getStyle('display');
		} catch(e){}
		this.store('originalDisplay', d||'block'); 
		this.setStyle('display','none');
		return this;
	},
	show: function(display) {
		original = this.retrieve('originalDisplay')?this.retrieve('originalDisplay'):this.get('originalDisplay');
		this.setStyle('display',(display || original || 'block'));
		return this;
	},
	swapClass: function(remove, add) {
		return this.removeClass(remove).addClass(add);
	},
	//TODO
	//DO NOT USE THIS METHOD
	//it is temporary, as Mootools 1.1 will negate its requirement
	fxOpacityOk: function(){
		return !Browser.Engine.trident4;
	}
});

/*
Script: Fx.Reveal.js
	Defines Fx.Reveal, a class that shows and hides elements with a transition.

License:
	http://clientside.cnet.com/wiki/cnet-libraries#license
*/
Fx.Reveal = new Class({
	Extends: Fx.Morph,
	options: {
		styles: ['padding','border','margin'],
		transitionOpacity: true,
		mode:'vertical',
		heightOverride: null,
		widthOverride: null
/*		onShow: $empty,
		onHide: $empty */
	},
	dissolve: function(){
		try {
			if(!this.hiding && !this.showing) {
				if(this.element.getStyle('display') != 'none'){
					this.hiding = true;
					this.showing = false;
					this.hidden = true;
					var startStyles = this.element.getComputedSize({
						styles: this.options.styles,
						mode: this.options.mode
					});
					var setToAuto = this.element.style.height === ""||this.element.style.height=="auto";
					this.element.setStyle('display', 'block');
					if (this.element.fxOpacityOk() && this.options.transitionOpacity) startStyles.opacity = 1;
					var zero = {};
					$each(startStyles, function(style, name){
						zero[name] = [style, 0]; 
					}, this);
					var overflowBefore = this.element.getStyle('overflow');
					this.element.setStyle('overflow', 'hidden');
					//put the final fx method at the front of the chain
					if (!this.$chain) this.$chain = [];
					this.$chain.unshift(function(){
						if(this.hidden) {
							this.hiding = false;
							$each(startStyles, function(style, name) {
								startStyles[name] = style;
							}, this);
							this.element.setStyles($merge({display: 'none', overflow: overflowBefore}, startStyles));
							if (setToAuto) this.element.setStyle('height', 'auto');
						}
						this.fireEvent('onShow', this.element);
						this.callChain();
					}.bind(this));
					this.start(zero);
				} else {
					this.callChain.delay(10, this);
					this.fireEvent('onComplete', this.element);
					this.fireEvent('onHide', this.element);
				}
			}
		} catch(e) {
			this.hiding = false;
			this.element.hide();
			this.callChain.delay(10, this);
			this.fireEvent('onComplete', this.element);
			this.fireEvent('onHide', this.element);
		}
		return this;
	},
	reveal: function(){
		try {
			if(!this.showing && !this.hiding) {
				if(this.element.getStyle('display') == "none" || 
					 this.element.getStyle('visiblity') == "hidden" || 
					 this.element.getStyle('opacity')==0){
					this.showing = true;
					this.hiding = false;
					this.hidden = false;
					//toggle display, but hide it
					var before = this.element.getStyles('visibility', 'display', 'position');
					this.element.setStyles({
						visibility: 'hidden',
						display: 'block',
						position:'absolute'
					});
					var setToAuto = this.element.style.height === ""||this.element.style.height=="auto";
					//enable opacity effects
					if(this.element.fxOpacityOk() && this.options.transitionOpacity) this.element.setStyle('opacity',0);
					//create the styles for the opened/visible state
					var startStyles = this.element.getComputedSize({
						styles: this.options.styles,
						mode: this.options.mode
					});
					//reset the styles back to hidden now
					this.element.setStyles(before);
					$each(startStyles, function(style, name) {
						startStyles[name] = style;
					}, this);
					//if we're overridding height/width
					if($chk(this.options.heightOverride)) startStyles['height'] = this.options.heightOverride.toInt();
					if($chk(this.options.widthOverride)) startStyles['width'] = this.options.widthOverride.toInt();
					if(this.element.fxOpacityOk() && this.options.transitionOpacity) startStyles.opacity = 1;
					//create the zero state for the beginning of the transition
					var zero = { 
						height: 0,
						display: 'block'
					};
					$each(startStyles, function(style, name){ zero[name] = 0 }, this);
					var overflowBefore = this.element.getStyle('overflow');
					//set to zero
					this.element.setStyles($merge(zero, {overflow: 'hidden'}));
					//start the effect
					this.start(startStyles);
					if (!this.$chain) this.$chain = [];
					this.$chain.unshift(function(){
						if (!this.options.heightOverride && setToAuto) {
							if (["vertical", "both"].contains(this.options.mode)) this.element.setStyle('height', 'auto');
							if (["width", "both"].contains(this.options.mode)) this.element.setStyle('width', 'auto');
						}
						if(!this.hidden) this.showing = false;
						this.element.setStyle('overflow', overflowBefore);
						this.callChain();
						this.fireEvent('onShow', this.element);
					}.bind(this));
				} else {
					this.callChain();
					this.fireEvent('onComplete', this.element);
					this.fireEvent('onShow', this.element);
				}
			}
		} catch(e) {
			this.element.setStyles({
				display: 'block',
				visiblity: 'visible',
				opacity: 1
			});
			this.showing = false;
			this.callChain.delay(10, this);
			this.fireEvent('onComplete', this.element);
			this.fireEvent('onShow', this.element);
		}
		return this;
	},
	toggle: function(){
		try {
			if(this.element.getStyle('display') == "none" || 
				 this.element.getStyle('visiblity') == "hidden" || 
				 this.element.getStyle('opacity')==0){
				this.reveal();
		 	} else {
				this.dissolve();
			}
		} catch(e) { this.show(); }
	 return this;
	}
});

Element.Properties.reveal = {

	set: function(options){
		var reveal = this.retrieve('reveal');
		if (reveal) reveal.cancel();
		return this.eliminate('reveal').store('reveal:options', $extend({link: 'cancel'}, options));
	},

	get: function(options){
		if (options || !this.retrieve('reveal')){
			if (options || !this.retrieve('reveal:options')) this.set('reveal', options);
			this.store('reveal', new Fx.Reveal(this, this.retrieve('reveal:options')));
		}
		return this.retrieve('reveal');
	}

};

Element.Properties.dissolve = Element.Properties.reveal;

Element.implement({

	reveal: function(options){
		this.get('reveal', options).reveal();
		return this;
	},
	
	dissolve: function(options){
		this.get('reveal', options).dissolve();
		return this;
	}

});

Element.implement({
	nix: function() {
		var  params = Array.link(arguments, {destroy: Boolean.type, options: Object.type});
		this.get('reveal', params.options).dissolve().chain(function(){
			this[params.destroy?'destroy':'erase']();
		}.bind(this));
		return this;
	}
});


/*
Script: MultipleOpenAccordion.js

Creates a Mootools Fx.Accordion that allows the user to open more than one element.

License:
	http://clientside.cnet.com/wiki/cnet-libraries#license
*/
var MultipleOpenAccordion = new Class({
	Implements: [Options, Events, Chain],
	options: {
		togglers: [],
		elements: [],
		openAll: true,
		firstElementsOpen: [0],
		fixedHeight: false,
		fixedWidth: false,
		height: true,
		opacity: true,
		width: false
//	onActive: $empty,
//	onBackground: $empty
	},
	togglers: [],
	elements: [],
	initialize: function(container, options){
		this.setOptions(options);
		this.container = $(container);
		elements = $$(options.elements);
		$$(options.togglers).each(function(toggler, idx){
			this.addSection(toggler, elements[idx], idx);
		}, this);
		if (this.togglers.length) {
			if (this.options.openAll) this.showAll();
			else this.openSections(this.options.firstElementsOpen);
		}
	},
	addSection: function(toggler, element, pos){
		toggler = $(toggler);
		element = $(element);
		var test = this.togglers.contains(toggler);
		var len = this.togglers.length;
		this.togglers.include(toggler);
		this.elements.include(element);
		if (len && (!test || pos)){
			pos = $pick(pos - 1, len - 1);
			toggler.inject(this.elements[pos], 'after');
			element.inject(toggler, 'after');
		} else if (this.container && !test){
			toggler.inject(this.container);
			element.inject(this.container);
		}
		var idx = this.togglers.indexOf(toggler);
		toggler.addEvent('click', this.toggleSection.bind(this, idx));
		var mode;
		if (this.options.height && this.options.width) mode = "both";
		else mode = (this.options.height)?"vertical":"horizontal";
		element.store('reveal', new Fx.Reveal(element, {
			transitionOpacity: this.options.opacity,
			mode: mode,
			heightOverride: this.options.fixedHeight,
			widthOverride: this.options.fixedWidth
		}));
		return this;
	},
	onComplete: function(idx, callChain){
		this.fireEvent(this.elements[idx].isVisible()?'onActive':'onBackground', [this.togglers[idx], this.elements[idx]]);
		this.callChain();
		return this;
	},
	showSection: function(idx, useFx){
		this.toggleSection(idx, useFx, true);
	},
	hideSection: function(idx, useFx){
		this.toggleSection(idx, useFx, false);
	},
	toggleSection: function(idx, useFx, show, callChain){
		var method = show?'reveal':$defined(show)?'dissolve':'toggle';
		callChain = $pick(callChain, true);
		if($pick(useFx, true)) {
			this.elements[idx].retrieve('reveal')[method]().chain(
				this.onComplete.bind(this, [idx, callChain])
			);
		} else {
				if (method == "toggle") el.togglek();
				else el[method == "reveal"?'show':'hide']();
				this.onComplete(idx, callChain);
		}
		return this;
	},
	toggleAll: function(useFx, show){
		var method = show?'reveal':$chk(show)?'disolve':'toggle';
		var last = this.elements.getLast();
		this.elements.each(function(el, idx){
			this.toggleSection(idx, useFx, show, el == last);
		}, this);
		return this;
	},
	toggleSections: function(sections, useFx, show) {
		last = sections.getLast();
		this.elements.each(function(el,idx){
			this.toggleSection(idx, useFx, sections.contains(idx), show, idx == last);
		}, this);
		return this;
	},
	openSections: function(sections, useFx){
		this.toggleSections(sections, useFx, true);
	},
	closeSections: function(sections, useFx){
		this.toggleSections(sections, useFx, false);
	},
	showAll: function(useFx){
		return this.toggleAll(useFx, true);
	},
	hideAll: function(useFx){
		return this.toggleAll(useFx, false);
	}
});