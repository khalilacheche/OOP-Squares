//Code Written by Khalil Acheche
//March 4, 2017

var objects = [];//Declaring the array that will contain our objects
var handisFull=false;//Bool to see if we are already dragging an object or not
var frameCount;//A variable for calculating the speed of the mouse
var lastX,lastY;//Another variable for calculating the speed
var xspeed,yspeed;//The speed of the mouse

function setup() {
  lastX=mouseX;
  lastY=mouseY;
  createCanvas(window.innerWidth, window.innerHeight);
  for (var i = 0; i < 5; i++) {
    objects[i] = new Squares();//Creating the objects and storing them in the array
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

function mouseSpeed(){
  //Calculating the mouse speed
  if (frameCount >=3) {
    frameCount=0;
    yspeed=mouseY-lastY;
    xspeed=mouseX-lastX;
    lastY=mouseY;
    lastX=mouseX;
  }
  frameCount++;

}
function keyPressed() {
    if(keyCode == UP_ARROW) {
      //Adding a new object if we press the UP ARROW
        objects.push(new Squares());
        objects[objects.length-1].calculateInertia();
        objects[objects.length-1].setPos();
        objects[objects.length-1].show();
    } else if (keyCode == DOWN_ARROW) {
      //Deleting the last object when we press the DOWN ARROW
      objects.splice(objects.length-1);
    }
    return 0;
}
