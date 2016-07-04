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
    console.log('button click');
    var newDx = document.getElementById("dx").value;
    console.log(newDx);
    var newDy = document.getElementById("dy").value;
    var newSpeed = document.getElementById("speed").value;    
    if(newDx == "") newDx = undefined;
    if(newDy == "") newDy = undefined;
    if(newSpeed == "") newSpeed = undefined;

    
    console.log(newSpeed);
    if(Utils.isNumeric(newDx) && Utils.isNumeric(newDy) && Utils.isNumeric(newSpeed)){
      Balls.setVectorConfig(function () { return [newSpeed, newDx, newDy] });
    } else{
      alert("Некорректный ввод. Пожалуйста, введите числа.");
    }   
  });
};
