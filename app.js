var width = 800;
var height = 600;
var radius = 20;
var fieldX = radius*2+20;
var speed = 1;

var initialVectorDirection = {
  dx: 1,
  dy: 1
};

function Circle(x, y, r) {
 this.x = x;
 this.y = y;
 this.r = r;
 this.dx = 0;
 this.dy = 0;
};

Circle.prototype = {
  draw : function (ctx) {
    ctx.beginPath();

    if(this.x+this.r>width){
      this.x = width-this.r-ctx.lineWidth;
      this.dx *= -1;
    }
    if(this.y+this.r>height){
      this.y = height-this.r-ctx.lineWidth;
      this.dy*= -1;
    }
    if(this.x-this.r<0){
      this.x = this.r+ctx.lineWidth;
    }
    if(this.y-this.r<0){
      this.y = this.r+ctx.lineWidth;
      this.dy*= -1;
    }
    if(this.x-this.r<fieldX){
      this.dx *= -1;
    }
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
};

var mouse = {
 x : 0,
 y : 0,
 };
var shift = {
 x : 0,
 y : 0,
 };

var balls = function (cnv, ctx) {
  cnv.width = width;
  cnv.height = height;
  ctx.strokeStyle = 'blue';
  ctx.fillStyle = 'red';
  ctx.lineWidth = 2;

  ctx.strokeRect(fieldX, 1, width-fieldX-1, height-2);

  var circlesList = [];
  var selected = false;

  for (var i = 0; i < 10; i++) {
    circlesList.push( new Circle(radius+10,(radius*2+10)*i+radius+10,radius) );
  }

  var isCursorInCircle = function (circle) {
    var mouseXInsideCircle = mouse.x < (circle.x+circle.r) && mouse.x > (circle.x-circle.r);
    var mouseYInsideCircle = mouse.y < (circle.y+circle.r) && mouse.y > (circle.y-circle.r);

    return mouseXInsideCircle && mouseYInsideCircle;
  };

  var drawCircles = function (){
    ctx.clearRect(0, 0, width, height);
    ctx.strokeRect(fieldX, 1, width-fieldX-1, height-2);

    for (var i in circlesList) {
      if(circlesList[i] != selected){
        circlesList[i].draw(ctx);
      }
    }

    if (selected) {
      selected.x = mouse.x - shift.x;
      selected.y = mouse.y - shift.y;
      selected.draw(ctx);
    }
  };

  var copyMouseCoords = function (e) {
   mouse.x = e.pageX;
   mouse.y = e.pageY;
  };

  var selectCircle = function () {
   if (selected) return;

   for (var i in circlesList) {
     if (isCursorInCircle(circlesList[i])) {
      selected = circlesList[i];
     }
   }
   shift.x = mouse.x-selected.x;
   shift.y = mouse.y-selected.y;
  };

  var releaseCircle = function () {
    if (selected.x - selected.r > fieldX){
      selected.dx = initialVectorDirection.dx;
      selected.dy = -initialVectorDirection.dy;
    }
    selected = false;
  };

  var isCollisionBetweenTwoCircles = function (circle1, circle2) {
    var distance = Math.sqrt(Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2));
    return (distance < (circle1.r + circle2.r));
  };

  var gameLoop = function () {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeRect(fieldX, 0, width-fieldX-1, height-1);

    var mousePointer = false;
    for (var i in circlesList){
      if (isCursorInCircle(circlesList[i])){
        mousePointer = true;
      }

      circlesList[i].x += speed*circlesList[i].dx;
      circlesList[i].y += speed*circlesList[i].dy;
    }

    drawCircles();

    for(var i in circlesList){
      for(var j in circlesList){
        if(circlesList[i]!=circlesList[j] && isCollisionBetweenTwoCircles(circlesList[i],circlesList[j])){
          circlesList[i].dx *= -1;
          circlesList[i].dy *= -1;
        }
      }
    }

    document.body.style.cursor = mousePointer ? "pointer" : "";
  };

  return {
    gameLoop: gameLoop,
    copyMouseCoords: copyMouseCoords,
    selectCircle: selectCircle,
    releaseCircle: releaseCircle
  };
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

window.onload = function (){
  var cnv = document.getElementById("canvas");
  var ctx = cnv.getContext("2d");

  var functions = balls(cnv, ctx);

  window.onmousemove = functions.copyMouseCoords;
  window.onmousedown = functions.selectCircle;
  window.onmouseup = functions.releaseCircle;

  setInterval(functions.gameLoop, 5);

  var changeVectorCoordsButton = document.getElementById("changeVectorCoordsButton");
  changeVectorCoordsButton.addEventListener("click", function () {
    var newDx = document.getElementById("dx");
    var newDy = document.getElementById("dy");
    var newSpeed = document.getElementById("speed");
    if(isNumeric(newDx.value) && isNumeric(newDy.value) && isNumeric(newSpeed.value)){
      initialVectorDirection.dx = newDx.value;
      initialVectorDirection.dy = newDy.value;
      speed = newSpeed.value;
    }
    else{
      alert("Введите число, пожалуйста!");
    }   
  });
};
