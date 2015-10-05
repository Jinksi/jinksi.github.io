$(document).ready(function($){
  var pattern = Trianglify({
    height: window.innerHeight,
    width: window.innerWidth,
    x_colors:['#444', '#1a1a1a'],
    cell_size: 50
  });

  pattern.canvas(document.getElementById('bg2'));


  function typeMe(){
    var typeItems = [];
    $('.info .typed span').each(function(){
      typeItems.push($(this).text());
    });
    $(".info .typed").typed({
      strings: typeItems,
      typeSpeed: 50,
      backSpeed: 30,
      loop: false,
      backDelay: 5000,
      cursorChar: '<',
      showCursor: false
    });
  }
  typeMe();

  $('.tooltip').tooltipster({
    animation: 'fade',
    position: 'bottom',
    delay: 1000
  });

  function splitIntoWords(string){
    var words = string.split(" ");

    var newString = "";
    $.each(words, function(i, v) {
      newString += '<span>' + v + '</span>';
    });
    return newString;
  }
  $('.logo a').html(function(){
    return splitIntoWords($(this).text());
  });

});