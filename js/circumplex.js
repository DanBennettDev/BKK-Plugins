// circumplex.js


// CIRCUMPLEX CONTROLS
const textHeight = 12;
const circlePad = 20;
const dotPad = 5;
const dotsize = 3;
const arrowPad = 6;
const xSize = 3
let _circ_callback;
let centreX = 0;
let centreY = 0;
let clickedX = 0;
let clickedY = 0;
let canvasX = 400;
let canvasY = 250;


// let emotionList = [ "ACTIVE","alert", "excited", "elated", "happy",
//                  "PLEASANT", "contented", "serene", "relaxed", "calm",
//                  "NOT ACTIVE","tired", "bored", "depressed", "sad",
//                  "UNPLEASANT","upset", "stressed", "nervous", "tense"]

let emotionList = [ "ACTIVE",
                 "PLEASANT", 
                 "NOT ACTIVE",
                 "UNPLEASANT"
                 ]

let circumplexSketch = function(p) {

  // var clickedX = 0;
  // var clickedY = 0;
  var clicked = false;
  let radius;
  let dotRadius;

  function drawText(cx, cy, radius, dotRadius){
    p.textSize(textHeight);
    p.noFill()
    p.stroke(200);
    p.strokeWeight(1);
    p.square(cx-dotRadius,cy-dotRadius, dotRadius*2);

    npoints = emotionList.length;
    let angle = p.TWO_PI / npoints;
    for (let a = -p.PI/2, j=0; j < npoints; a += angle, j++) {
      x = (cx + p.cos(a) * radius);
      y = (cy + p.sin(a) * radius);
      dotx = (cx + p.cos(a) * dotRadius);
      doty = (cy + p.sin(a) * dotRadius);
      xoff = 0;
      yoff= 0
      if(j%(npoints/2)==0){
        xoff = -p.textWidth(emotionList[j])/2
      } else if (j>= npoints/2) {
        xoff = -p.textWidth(emotionList[j])
      }
      if(j < npoints/2){
        yoff = (j / (npoints/2)) *textHeight;
      } else {
        yoff = ((npoints-j)/(npoints/2)) *textHeight;;
      }
      p.color(0,0,0)
      p.stroke(0)
      p.text(emotionList[j], x+xoff, y+yoff);
      p.fill(0,0,0);
      p.circle(dotx,doty,dotsize)

    }
    p.noFill();
    p.strokeWeight(1);
    p.stroke(200)
    p.line(centreX-(dotRadius-arrowPad), centreY, 
                centreX+(dotRadius-arrowPad), centreY);
    p.line(centreX, centreY-(dotRadius-arrowPad), 
                centreX, centreY+(dotRadius-arrowPad));    
  }
  

  p.setup = function(){
    canvas = p.createCanvas(canvasX, canvasY);
    p.background(255);
    centreX = (p.width/2);
    centreY = (p.height/2);
    radius = (p.height-(circlePad+(textHeight/2)))/2;
    dotRadius = radius-(dotPad);
    drawText(centreX, centreY,radius, dotRadius)
    canvas.mouseClicked(drawMarker)
  }

  p.draw = function(){
      if(clicked){
        p.background(255);
        p.strokeWeight(1)        
        drawText(centreX, centreY,radius, dotRadius);
        p.strokeWeight(1.5);
        p.stroke(0)
        p.line(clickedX - xSize, clickedY-xSize, clickedX + xSize, clickedY+xSize);
        p.line(clickedX + xSize, clickedY - xSize, clickedX-xSize, clickedY + xSize);        
        clicked=false;
      } 


  }

  function drawMarker() {
    clickedX = p.mouseX;
    clickedY = p.mouseY;
    xRel =  clickedX-centreX;
    yRel = clickedY-centreY
    cx = (p.width/2);
    cy = (p.height/2);   
    console.log(xRel, yRel) 
    if((clickedX > cx-dotRadius) &
        (clickedX < cx+dotRadius) &
        (clickedY > cy-dotRadius) &
        (clickedY < cy+dotRadius) 
      )
      {
      clicked = true;
      _circ_callback(xRel, yRel);    
    }
  }

}

function setupCircumplex(div, clickCallback){
  _circ_callback = clickCallback
  new p5(circumplexSketch, div);
};


function Circumplex(){
  this.setupCircumplex = setupCircumplex;
  this.circX = clickedX
  this.circY = clickedY
};



