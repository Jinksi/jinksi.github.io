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
      loop: true,
      backDelay: 5000,
      cursorChar: '<',
      showCursor: false
    });
  }
  // typeMe();
});
