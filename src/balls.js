var Circle = require('./circle');

var width = 800;
var height = 600;
var radius = 20;
var fieldX = radius*2+20;
var speed = 1;
var dx = 1;
var dy = 1;

function setConfigs(cnv, ctx) {
  cnv.width = width;
  cnv.height = height;
  ctx.strokeStyle = 'blue';
  ctx.fillStyle = 'red';
  ctx.lineWidth = 2;
  ctx.strokeRect(fieldX, 1, width-fieldX-1, height-2);
}

var circlesList = [];
var selected = false;

var mouse = {
  x : 0,
  y : 0
};

var shift = {
  x : 0,
  y : 0,
};

for (var i = 0; i < 10; i++) {
  circlesList.push( new Circle(radius+10,(radius*2+10)*i+radius+10,radius) );
}

function drawCircles(ctx){
  ctx.clearRect(0, 0, width, height);
  ctx.strokeRect(fieldX, 1, width-fieldX-1, height-2);

  for (var i in circlesList) {
    if(circlesList[i] != selected){
      circlesList[i].draw(ctx, width, height, fieldX);
    }
  }

  if (selected) {
    selected.x = mouse.x - shift.x;
    selected.y = mouse.y - shift.y;
    selected.draw(ctx, width, height, fieldX);
  }
};

function copyMouseCoords(e) {
 mouse.x = e.pageX;
 mouse.y = e.pageY;
};

var selectCircle = function () {
 if (selected) return;

 for (var i in circlesList) {
   if (circlesList[i].isCursorInCircle(mouse.x, mouse.y)) {
    selected = circlesList[i];
   }
 }
 shift.x = mouse.x-selected.x;
 shift.y = mouse.y-selected.y;
};

function releaseCircle() {
  if (selected.x - selected.r > fieldX){
    selected.dx = dx;
    selected.dy = -dy;
  }
  selected = false;
};

function gameLoop(ctx) {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeRect(fieldX, 0, width-fieldX-1, height-1);

  var mousePointer = false;
  for (var i in circlesList){
    if (circlesList[i].isCursorInCircle(mouse.x, mouse.y)){
      mousePointer = true;
    }

    circlesList[i].x += speed * circlesList[i].dx;
    circlesList[i].y += speed * circlesList[i].dy;
  }

  for(var i in circlesList){
    for(var j in circlesList){
      if(circlesList[i]!=circlesList[j] && circlesList[i].isCollideWithCircle(circlesList[j])){
        circlesList[i].dx *= -1;

        circlesList[i].dy *= -1;
      }
    }
  }

  drawCircles(ctx);
  
  document.body.style.cursor = mousePointer ? "pointer" : "";
};

function setVectorConfig(configs){
  if(configs()[0] != undefined) speed = configs()[0];
  if(configs()[1] != undefined) dx = configs()[1];
  if(configs()[2] != undefined) dy = configs()[2];
}
  
  exports.setConfigs = setConfigs;
  exports.setVectorConfig = setVectorConfig;
  exports.gameLoop = gameLoop;
  exports.copyMouseCoords = copyMouseCoords;
  exports.selectCircle = selectCircle;
  exports.releaseCircle = releaseCircle;
