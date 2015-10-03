$(document).ready(function($){
  var pattern = Trianglify({
  height: window.innerHeight,
  width: window.innerWidth,
  x_colors:['#444', '#1a1a1a'],
  cell_size: 50
});

  pattern.canvas(document.getElementById('bg2'));

});
