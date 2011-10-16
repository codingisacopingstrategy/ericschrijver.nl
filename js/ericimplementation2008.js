document.write('<link rel="stylesheet" href="/css/jseind.css" type="text/css" media="all" />');

window.addEvent('domready', function() {
//initialiseren		
$$('.isMeta','.photofooter').each(function(verstopt) {
	verstopt.set('opacity','0');
});
$$('.menucontents','.photofooter').each(function(verstopt) {
	verstopt.setStyle('visibility','visible');
});

$$('.benevolent').each(function(verstopt) {
	verstopt.set('opacity','0.4');
});

//in de dom injecten
var tips = new Tips($$('h1[title]','h2[title]','.assets p[title]','.pagina h5[title]'), {className: 'tooltip', offsets: {'x':170,'y':-10    }, fixed: true});		
var taps = new Tips($$('blockquote[title]','p.naarrechts[title]','.navl h5[title]'), {className: 'tooltip', offsets: {'x':-170,'y':26}, fixed: false});	
//var tops = new Tips($$('img[title]','object[title]'), {className: 'imagetip', offsets: {'x':0,'y':0}, fixed: true});
var kenker = new Tips($$('.pagina a[title]','.assets a','span[title]'), {className: 'kenker', offsets: {'x':-80,'y':10}, fixed: false});

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

/*$$('a.hasContent').each(function(wrapContent) {
	wrapContent.addEvent('click', function(e) {
        e.preventDefault();
        $(document.body).getElement('.contentWrapper').setStyle('visibility','visible');
        var container = 'test';
        var url = 'http://www.ericschrijver.nl' + this.getProperty('href') + '.xml';
        alert(url);
        var requestContent = new Request.HTML({method: 'get', url: url, update: container}).send();
	});
});		*/

});