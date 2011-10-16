$(document).ready(function(){
  var modal = 0
  var test = 'bla'
  var Div = $('<div class="modal" />')
  var nav = $('<a href="javascript:history.go()" class="close"><strong>x</strong></a>')
  $("a.define").click(function(event){
    event.preventDefault();
    modal = 1
    Div.appendTo(document.body).load($(this).attr("href")).click(function(event){
    $(this).remove();
    modal = 0
    });
//    $(window).click(function(event){ 
//      if (modal==1) {
//          $('.modal').remove();
 //     } });
  });    
});


// $('.modal').remove();
// Div.appendTo(document.body).load('http://ericschrijver.nl/defines/youdontwannabealive');
