//Code Written by Khalil Acheche
//March 4, 2017

var objects = [];//Declaring the array that will contain our objects
var handisFull=false;//Bool to see if we are already dragging an object or not
var frameCount;//A variable for calculating the speed of the mouse
var lastX;//Another variable for calculating the speed
var speed;//The speed of the mouse

function setup() {
  lastX=mouseX;
  createCanvas(window.innerWidth, window.innerHeight);
  for (var i = 0; i < 5; i++) {
    objects[i] = new Drop();//Creating the objects and storing them in the array
  }
}

function draw() {
  background(63,63,63);
  for (var i = 0; i < objects.length; i++) {
    objects[i].calculateInertia();//Calculating the inertia of each object
    objects[i].setPos();//Setting the position of each object
    objects[i].show();//Rendering each object
  }
  mouseSpeed();//Calling the function that calculates the mouse Speed
}
function Drop() {
  var speedfactor=0;//A variable for the inertia calculations
  var lastDraggingState=false;//Another variable for inertia calculations
  var lastState=false;//A bool to see if the last mouse clicking state
  var isDragging=false;//A bool for seeing if we're dragging this object
  this.x = random(width);//Setting a random x position
  this.y = random(-500, -50);//Setting a random y position
  this.yspeed = random(1, 20);//Setting the y speed at a random value
  this.xspeed=0;//Seting he x speed at zero

  this.setPos = function() {
    //Seeing if we're dragging this object
      if(mouseIsPressed){
        if(!handisFull){
        if(!lastState){
          if(mouseX>this.x && mouseX<(this.x+100) && mouseY>this.y && mouseY<(this.y+100) ){
            isDragging=true;
            lastState=true;
            handisFull=true;
          }
         }
        }
      } else{
        isDragging=false;
        lastState=false;
        handisFull=false;
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
      this.x=mouseX-50;
      this.y=mouseY-50;
    }
    //If the bject gets out of the boundaries, we teleport i to the other side of te canvas
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
    //Simply drawing a rectangle
    fill(249,38,114);
    noStroke();
    rect(this.x, this.y, 100, 100);
  }

  this.calculateInertia = function(){
    //Calculating the X inertia
    if(lastDraggingState && !isDragging ){
      if (speed<0) {
        speedfactor=1;
      }else if (speed>0) {
        speedfactor=-1;
      }else {
        speedfactor=0;
      }
      this.xspeed=map(speed,0,100,0,50);
      lastDraggingState=false;
    }
    this.xspeed=this.xspeed+(speedfactor*0.1);
    if(this.xspeed<0 && speedfactor==-1){
      this.xspeed=0;
    }else if(this.xspeed>0 && speedfactor==1){
      this.xspeed=0;
    }
    if(this.xspeed>25){
      this.xspeed=25;
    }
    if (this.xspeed< -25) {
      this.xspeed=-25;
    }
    //Calculating the Y inertia
      var grav = random(0, 0.7);
      this.yspeed = this.yspeed + grav;
  }
}
function mouseSpeed(){
  //Calculating the mouse speed
  if (frameCount >=3) {
    frameCount=0;
    speed=mouseX-lastX;
    lastX=mouseX;
  }
  frameCount++;

}
function keyPressed() {
    if(keyCode == UP_ARROW) {
      //Adding a new object if we press the UP ARROW
        objects.push(new Drop());
        objects[objects.length-1].calculateInertia();
        objects[objects.length-1].setPos();
        objects[objects.length-1].show();
    } else if (keyCode == DOWN_ARROW) {
      //Deleting the last object when we press the DOWN ARROW
      objects.splice(objects.length-1);
    }
    return 0;
}

