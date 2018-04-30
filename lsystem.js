
var cwidth = 800; 
var cheight = 800;

var rules = [];

var numgens = 4; 
var length = 2;
//var lengthscale = 0.6;
var angle = 60;

//var axiom = "F";
var axiom = "+F--F--F";
var currentgen = axiom;

rules[0] = {
  x: "F",
  //y: "FF+[+F-F-F]-[-F+F+F]"
  //y: "F+F-F-F+F"
  //y: "F+F--F+F"
  y: "F[-FfF]-F+F-f+F"  //set numgens=4
};


function setup() {
  createCanvas(cwidth,cheight);
  angleMode(DEGREES);
  for(var i = 1; i<=numgens; i++) {
    currentgen = newGen(currentgen);
  }
  translate(cwidth/2,cheight/2);
  //evaluate(currentgen);
  line(0,0,0,-100);
  translate(0,-100);
  rotate(90);
  line(0,-1,0,-100);
}

function newGen(oldgen) {
  //length*=lengthscale;
  var newgenstr = "";
  for(var i=0; i<currentgen.length; i++) {
    var character = currentgen[i];
    var hitarule = false;
    for(var j=0; j<rules.length; j++) {
      if(character == rules[j].x) {
        hitarule = true;
        //newgenstr = newgenstr.concat(rules[j].y);
        newgenstr += rules[j].y;
        break;
      }
    }
    if(!hitarule) {
     // newgenstr = newgenstr.concat(character);
     newgenstr += character;
    }
  }
  return newgenstr;
}

function evaluate(str) {
  for(var i=0; i<str.length; i++) {
    var character = str[i];
    //move forward length while drawing
    if(character == "F" || character == "G") {
      line(0,0,0,-length);
      translate(0,-length);
    }
    //move forward length but don't draw:
    if(character == "f") {
      translate(0,-length);
    }
    if(character == "+") {
      rotate(angle);
    }
    if(character == "-") {
      rotate(-angle);
    }
    if(character == "[") {
      push();
    }
    if(character == "]") {
      pop();
    }
  }
}