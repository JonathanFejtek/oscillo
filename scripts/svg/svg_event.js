var NS_SVG = "http://www.w3.org/2000/svg";

function SVGEventHandler(svgcShape){
  this.selected = false;
  this.selectable = true;
  this.isMousedOver = false;
  this.svgcShape = svgcShape;
  this.mouseOffset = [];
  this.grabbed = false;
  this.grabbable = true;
  this.currentMatrix;
  this.onSelect = [];
  this.onDeselect = [];
  this.onGrabMove = [];
  this.onMouseEnter = [];
  this.onMouseLeave = [];

  var self = this;

  this.getMouseOffset = function(){
    var x = self.svgcShape.getSVG().getBBox().x;
    var y = self.svgcShape.getSVG().getBBox().y;

    var mouseX = getMousePosition()[0];
    var mouseY = getMousePosition()[1];

    self.mouseOffset[0] = mouseX;
    self.mouseOffset[1] = mouseY;
  }

  this.handleMouseEnter = function(){
    self.isMousedOver = true;
    if(!self.selected && self.selectable){
      self.setStyleMouseOver();
    }
    for(var i = 0; i < self.onMouseEnter.length; i++){
      self.onMouseEnter[i].call();
    }
  }

  this.handleMouseLeave = function(){
    if(!self.selected && self.selectable){
      self.setStyleDefault();
    }

    for(var i = 0; i < self.onMouseLeave.length; i++){
      self.onMouseLeave[i].call();
    }

    self.isMousedOver = false;
  }

  this.handleMouseDown = function(){
    if(self.isMousedOver){
      var svg = self.svgcShape.getSVG();

      if(self.selectable){
        self.selected = true;
        self.select();
      }

      if(self.grabbable){
        document.elementSelected = true;
        self.grabbed = true;
        self.getMouseOffset();
        self.getCurrentMatrix();
      }
      self.setStyleSelected();
    }
    else{
      if(self.selected){
        self.selected = false;
        self.deselect();
        self.setStyleDefault();
      }
    }
  }

  this.select = function(){
    for(var i = 0; i < self.onSelect.length; i++){
      self.onSelect[i].call();
    }
    self.setStyleSelected();
  }

  this.deselect = function(){
    for(var i = 0; i < self.onDeselect.length; i++){
      self.onDeselect[i].call();
    }
  }

  this.addSelectFunction = function(func){
    self.onSelect.push(func);
  }

  this.addDeselectFunction = function(func){
    self.onDeselect.push(func);
  }

  this.addOnMouseEnterFunction = function(func){
    self.onMouseEnter.push(func);
  }

  this.addOnMouseLeaveFunction = function(func){
    self.onMouseLeave.push(func);
  }

  this.addGrabMoveFunction = function(func){
    self.onGrabMove.push(func);
  }

  this.getCurrentMatrix = function(){
    self.currentMatrix = self.svgcShape.getMatrix();
  }

  this.handleMouseMove = function(){
    if(self.grabbed && self.grabbable){
      var mouseX = getMousePosition()[0];
      var mouseY = getMousePosition()[1];
      var svg = self.svgcShape.getSVG();


      var newX = mouseX-self.mouseOffset[0];
      var newY = mouseY-self.mouseOffset[1];

      if(self.svgcShape instanceof Circle){
        var currentPos = self.svgcShape.getPosition();
        var cX = currentPos[0] + newX;
        var cY = currentPos[1] + newY;
        self.svgcShape.setPos(cX,cY);

      }

      else{
        self.currentMatrix[4] += newX;
        self.currentMatrix[5] += newY;
        var newMatrix = "matrix(" + self.currentMatrix.join(' ') + ")";
        svg.setAttributeNS(null, "transform", newMatrix);
      }

      self.getMouseOffset();

      for(var i = 0; i < self.onGrabMove.length; i++){
        self.onGrabMove[i].call();
      }

    }
  }

  this.handleMouseUp = function(){
    self.grabbed = false;
    document.elementSelected = false;
  }

  this.computeMouseOffset = function(){
    var mousPos = getMousePosition();
  }

  this.setStyleMouseOver = function(){
    self.svgcShape.strokeWeight(3);
    self.svgcShape.stroke("lightblue");
  }

  this.setStyleSelected = function(){
    self.svgcShape.strokeWeight(3);
    self.svgcShape.stroke("blue");
  }

  this.setStyleDefault = function(){
    self.svgcShape.strokeWeight(1);
    self.svgcShape.stroke("black");
  }

  this.svgcShape.dataSVG.addEventListener("mouseenter",this.handleMouseEnter);
  this.svgcShape.dataSVG.addEventListener("mouseleave",this.handleMouseLeave);
  document.addEventListener("mousedown",this.handleMouseDown);

  document.addEventListener("mouseup",this.handleMouseUp);
  document.addEventListener("mousemove",this.handleMouseMove);
}

function getMousePosition(){
  var mouseX = event.clientX;
  var mouseY = event.clientY;
  return [mouseX,mouseY];
}
