function Squares() {
  var colors=[
    {r:148, g: 0, b:211},
    {r:75, g: 0, b:130},
    {r:0 , g: 0, b:255},
    {r:0, g: 255, b:0},
    {r:255, g: 255, b:0},
    {r:255, g: 127, b:0},
    {r:255, g: 0, b:0},
    {r:249,g:,38,b:114}
    ];
  var xspeedfactor=0;//A variable for the inertia calculations
  var yspeedfactor=0;
  var xDiff=0;
  var yDiff=0;
  var lastDraggingState=false;//Another variable for inertia calculations
  var lastState=false;//A bool to see if the last mouse clicking state
  var isDragging=false;//A bool for seeing if we're dragging this object
  this.x = random(width);//Setting a random x position
  this.y = random(-500, -50);//Setting a random y position
  this.yspeed = random(1, 20);//Setting the y speed at a random value
  this.xspeed=0;//Seting he x speed at zero
  this.color= colors[Math.trunc(random(0,colors.length))];

  this.setPos = function() {
    //Seeing if we're dragging this object
      if(mouseIsPressed){
        if(!handisFull){
        if(!lastState){
          if(mouseX>this.x && mouseX<(this.x+100) && mouseY>this.y && mouseY<(this.y+100) ){
            isDragging=true;
            lastState=true;
            handisFull=true;
            xDiff=mouseX-this.x;
            yDiff=mouseY-this.y;
          }
         }
        }
      } else{
        isDragging=false;
        lastState=false;
        handisFull=false;
        yDiff=0;
        xDiff=0;
      }
    if(!isDragging){
      //If we're not dragging the object, it should be falling normally
      this.x+=this.xspeed;
      this.y +=this.yspeed;
    }else {
      //Otherwise, we set its position equal to the mouse's position
      lastDraggingState=true;
      this.xspeed=0;
      this.yspeed=0;
      this.x=mouseX-xDiff;
      this.y=mouseY-yDiff;
    }
    //If the object gets out of the boundaries, we teleport it to the other side of te canvas
    if (this.y > height) {
      this.y = random(-200, -100);
      this.yspeed = random(4, 10);
    }
    if (this.x > width) {
      this.x = 0;
    }
    if(this.x<0){
      this.x=width;
    }

  }

  this.show = function() {
    //Simply drawing a square
    //fill(249,38,114);
    fill(this.color.r,this.color.g,this.color.b);
    noStroke();
    rect(this.x, this.y, 100, 100);
  }

  this.calculateInertia = function(){
    //Calculations for x & y inertia
    if(lastDraggingState && !isDragging ){
      if (xspeed<0) {
        xspeedfactor=1;
      }else if (xspeed>0) {
        xspeedfactor=-1;
      }else {
        xspeedfactor=0;
      }
      if (yspeed<0) {
        yspeedfactor=1;
      }else if (yspeed>0) {
        yspeedfactor=-1;
      }else {
        yspeedfactor=0;
      }
      this.xspeed=map(xspeed,0,100,0,50);
      this.yspeed=map(yspeed,0,100,0,50);
      lastDraggingState=false;
    }
    //Even more calculations for x inertia
    this.xspeed=this.xspeed+(xspeedfactor*0.1);
    if(this.xspeed<0 && xspeedfactor==-1){
      this.xspeed=0;
    }else if(this.xspeed>0 && xspeedfactor==1){
      this.xspeed=0;
    }
    if(this.xspeed>25){
      this.xspeed=25;
    }
    if (this.xspeed< -25) {
      this.xspeed=-25;
    }
    //Even more calculations for y inertia
      var grav = random(0, 0.7);
      this.yspeed = this.yspeed + grav;
  }
}
