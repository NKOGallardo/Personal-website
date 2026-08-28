
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
    context.fillStyle = 'red';-
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

  // Mobile controls
  function changeDirection(direction) {
  if (direction === "up" && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = -grid;
  }

  else if (direction === "down" && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = grid;
  }

  else if (direction === "left" && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }

  else if (direction === "right" && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
}

document.querySelectorAll("#mobileControls button").forEach(button => {
  button.addEventListener("touchstart", function(e) {
    e.preventDefault();

    const direction = this.dataset.dir;
    changeDirection(direction);
  });
});

// mobile friendly screen
  function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener("touchstart", function(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

// Touch controls 
canvas.addEventListener("touchend", function(e) {
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;

  const dx = touchEndX - touchStartX;
  const dy = touchEndY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 30) {
      changeDirection("right");
    } else if (dx < -30) {
      changeDirection("left");
    }
  } else {
    if (dy > 30) {
      changeDirection("down");
    } else if (dy < -30) {
      changeDirection("up");
    }
  }
});

  requestAnimationFrame(loop);