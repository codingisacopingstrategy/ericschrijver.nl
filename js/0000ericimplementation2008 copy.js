document.write('<link rel="stylesheet" href="/css/jseind.css" type="text/css" media="all" />');





window.addEvent('domready', function() {
//initialiseren		
$$('.isMeta','.photofooter').each(function(verstopt) {
	verstopt.set('opacity','0');
});
$$('.menucontents','.photofooter').each(function(verstopt) {
	verstopt.setStyle('visibility','visible');
});


//
//WordCrop.cropWords();

var scherm = window.getSize();
//debug: alert("The window is "+size.x+" pixels wide and "+size.y+"pixels high.");




//in de dom injecten

var tips = new Tips($$('h1[title]','h2[title]','.assets p[title]','.pagina h5[title]'), {className: 'tooltip', offsets: {'x':170,'y':-10    }, fixed: true});		
var taps = new Tips($$('blockquote[title]','p.naarrechts[title]','.navl h5[title]'), {className: 'tooltip', offsets: {'x':-170,'y':26}, fixed: false});	
//var tops = new Tips($$('img[title]','object[title]'), {className: 'imagetip', offsets: {'x':0,'y':0}, fixed: true});
var kenker = new Tips($$('.pagina a[title]','.assets a','span[title]'), {className: 'kenker', offsets: {'x':-80,'y':10}, fixed: false});

/*
new MultipleOpenAccordion($('home_pagina2'), {
	elements: $$('.getoggled'),
	togglers: $$('.toggle'),
	openAll: false,
	firstElementsOpen: [-1]
});
*/

//events
/*
$$('.anchor').each(function(anker) {
anker.addEvent('click', function(enker) {
		$$('.anchor').each(function(allesleegjeweet) {
		allesleegjeweet.setStyle('background-color','transparent');
		});
	this.setStyle('background-color','#fffb00');
});
});*/

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
            // help! hoe dit 3 seconden delayen?
            this.tween('height','100');
			this.setStyle('overflow-y','hidden');	
		}
		});
});
/*
$$('#oeuvre dt').each(function(zwel) {
	zwel.addEvents({mouseenter: function(meer){
		this.set('tween', {duration: 3000});
		this.tween('background-position','0% 0%');
//		this.setStyle('overflow-y','scroll');		
		},
		mouseleave: function(minder){
			this.set('tween', {duration: 3000});
			this.tween('background position','50% 50%');
//			this.setStyle('overflow-y','hidden');	
		}
		});
});
*/


$$('.hasMeta').each(function(toggleMetaVisibility) {
	toggleMetaVisibility.addEvents({mouseenter: function(e){
		e.stop();
        $$('.' + this.getProperty('id') + 'Meta').each(function(hideMeta) {
		hideMeta.set('tween', {duration: 200});
		hideMeta.tween('opacity','1');
            });
		},
	mouseleave: function(e){
		e.stop();
        $$('.' + this.getProperty('id') + 'Meta').each(function(showMeta) {
		showMeta.set('tween', {duration: 200});
		showMeta.tween('opacity','0');
            });
	}
	});
});

/*$$('.header').each(function(toggleImportance) {
    toggleImportance.set('tween', {duration: 200});
	toggleImportance.tween('opacity','.6');
	toggleImportance.addEvents({mouseenter: function(e){
		e.stop();
		toggleImportance.set('tween', {duration: 200});
		toggleImportance.tween('opacity','1');
		},
	mouseleave: function(e){
		e.stop();
        toggleImportance.set('tween', {duration: 200});
		toggleImportance.pauseFx(500).tween('opacity','.6');
	}
	});
});*/

$$('.eventwithcontent').each(function(photodisplay) {
	photodisplay.addEvent('click', function(e) {
//        e.preventDefault();
		var photofooter = $(this.getProperty('id') + 'photos');
		photofooter.fade();
	});
});		

$$('.photofooter img').each(function(belangrijk) {
	belangrijk.set('opacity','.7');
	belangrijk.addEvents({mouseenter: function(e){
		e.stop();
		belangrijk.fade(1)
		},
	mouseleave: function(e){
		e.stop();
		belangrijk.fade(0.7)
	}
	});
});


$$('blockquote').each(function(belangrijk) {
//	this.set('line-height','1px');
/*	this.addEvents({mouseenter: function(e){
		e.stop();
		this.tween('letter-spacing','-.08em');
		},
	mouseleave: function(e){
		e.stop();
		this.tween('letter-spacing','-.3em');
	}
	});*/
});

var hoelang = new countdown('hoelang');
		hoelang.Div	= "hoelang";
		hoelang.TargetDate = "01/01/2009 00:00 PM";
		hoelang.DisplayFormat = "%%D%% days, %%H%% hours, %%M%% minutes, %%S%% seconds since event AAA happened";
        hoelang.Countstepper = 1;
});