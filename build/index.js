(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

  drawCircles(ctx);

  for(var i in circlesList){
    for(var j in circlesList){
      if(circlesList[i]!=circlesList[j] && circlesList[i].isCollideWithCircle(circlesList[j])){
        circlesList[i].dx *= -1;

        circlesList[i].dy *= -1;
      }
    }
  }

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

},{"./circle":2}],2:[function(require,module,exports){
function Circle(x, y, r) {
 this.x = x;
 this.y = y;
 this.r = r;
 this.dx = 0;
 this.dy = 0;
};

Circle.prototype = {
  draw : function (ctx, width, height, fieldX) {
    ctx.beginPath();

    if(this.x+this.r>width){
      this.x = width-this.r-ctx.lineWidth;
      this.dx *= -1;
    }
    if(this.y+this.r>height){
      this.y = height-this.r - ctx.lineWidth;
      this.dy*= -1; 
    }
    if(this.x-this.r<0){
      this.x = this.r + ctx.lineWidth;
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
  },

  isCollideWithCircle: function (circle) {
    var distance = Math.sqrt(Math.pow(this.x - circle.x, 2) + Math.pow(this.y - circle.y, 2));
    return (distance < (this.r + circle.r));
  },
  
  isCursorInCircle: function (mouseX, mouseY){
  	var mouseXInsideCircle = mouseX < (this.x + this.r) && mouseX > (this.x - this.r);
    var mouseYInsideCircle = mouseY < (this.y + this.r) && mouseY > (this.y - this.r);
    return mouseXInsideCircle && mouseYInsideCircle;
  }
};

module.exports = Circle;

},{}],3:[function(require,module,exports){
var Balls = require('./balls');
var Utils = require('./utils');

window.onload = function (){
  var cnv = document.getElementById("canvas");
  var ctx = cnv.getContext("2d");
  Balls.setConfigs(cnv,ctx);

  window.onmousemove = Balls.copyMouseCoords;
  window.onmousedown = Balls.selectCircle;
  window.onmouseup = Balls.releaseCircle;

  var gameLoop = function () {
    Balls.gameLoop(ctx)
  };

  setInterval(gameLoop, 5);

  var changeVectorCoordsButton = document.getElementById("changeVectorCoordsButton");
  changeVectorCoordsButton.addEventListener("click", function () {
    var newDx = document.getElementById("dx").value;
    var newDy = document.getElementById("dy").value;
    var newSpeed = document.getElementById("speed").value;    
    if(newDx == "") {newDx = undefined;}
    if(newDy == "") {newDy = undefined;}
    if(newSpeed == "") {newSpeed = undefined;}

    console.log("value " + newDx);

    if(Utils.isNumeric(newDx) && Utils.isNumeric(newDy) && Utils.isNumeric(newSpeed)){
      Balls.setVectorConfig(function () { return [newSpeed, newDx, newDy] });
    } else{
      alert("Некорректный ввод. Пожалуйста, введите числа.");
    }   
  });
};

},{"./balls":1,"./utils":4}],4:[function(require,module,exports){
var isNumeric = function (n) {
  return (!isNaN(parseFloat(n)) && isFinite(n)) || (n == undefined) ;
};

exports.isNumeric = isNumeric;
},{}]},{},[3])