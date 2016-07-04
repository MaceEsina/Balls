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
      if (this.dx!=0) {
      	this.dx *= -1;
      	this.x = fieldX + this.r;
      }
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
