
  var canvas = document.getElementById('game');
  var elem = canvas;

  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  document.getElementById('fsBtn').addEventListener('click', openFullscreen);

  var context = canvas.getContext('2d');

  var grid = 16;
  var count = 0;

  function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  var snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
  };
  var apple = { x: 320, y: 320 };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function loop() {
    requestAnimationFrame(loop);
    if (++count < 4) return;
    count = 0;
    context.clearRect(0,0,canvas.width,canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) snake.x = canvas.width - grid;
    else if (snake.x >= canvas.width) snake.x = 0;
    if (snake.y < 0) snake.y = canvas.height - grid;
    else if (snake.y >= canvas.height) snake.y = 0;

    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) snake.cells.pop();

    // draw apple
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid-1, grid-1);

    // draw snake
    context.fillStyle = 'green';
    snake.cells.forEach(function(cell, index) {
      context.fillRect(cell.x, cell.y, grid-1, grid-1);

      // ate apple
      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++;
        var cols = Math.floor(canvas.width / grid);
        var rows = Math.floor(canvas.height / grid);
        apple.x = getRandomInt(0, cols) * grid;
        apple.y = getRandomInt(0, rows) * grid;
      }

      // collision with self
      for (var i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          snake.x = 160; snake.y = 160; snake.cells = []; snake.maxCells = 4; snake.dx = grid; snake.dy = 0;
          var cols = Math.floor(canvas.width / grid);
          var rows = Math.floor(canvas.height / grid);
          apple.x = getRandomInt(0, cols) * grid;
          apple.y = getRandomInt(0, rows) * grid;
        }
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    var key = e.which || e.keyCode;
    if (key === 37 && snake.dx === 0) { snake.dx = -grid; snake.dy = 0; }
    else if (key === 38 && snake.dy === 0) { snake.dy = -grid; snake.dx = 0; }
    else if (key === 39 && snake.dx === 0) { snake.dx = grid; snake.dy = 0; }
    else if (key === 40 && snake.dy === 0) { snake.dy = grid; snake.dx = 0; }
  });

  (function placeInitialApple(){
    var cols = Math.floor(window.innerWidth / grid);
    var rows = Math.floor(window.innerHeight / grid);
    apple.x = getRandomInt(0, cols) * grid;
    apple.y = getRandomInt(0, rows) * grid;
  })();

  requestAnimationFrame(loop);