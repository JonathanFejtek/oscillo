function inheritPrototype(child,parent){
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

/**
 * A Circle SVGCShape. Extends SVGCShape
 * @param       {float} xPos   The x coordinate of the circle.
 * @param       {float} yPos   The y coordinate of the circle.
 * @param       {float} radius The radius of the circle.
 * @constructor
 */
function Circle(xPos,yPos,radius,svgParent){
  SVGCShape.call(this);
  this.type = "CIRCLE";
  this.SVGparent = svgParent;
  this.dataSVG = document.createElementNS(NS_SVG,"circle");
  this.dataSVG.setAttribute("cx",xPos);
  this.dataSVG.setAttribute("cy",yPos);
  this.dataSVG.setAttribute("r",radius);
  this.dataSVG.setAttribute("fill", "white");
  this.dataSVG.setAttribute("stroke", "black");
  this.dataSVG.setAttribute("stroke-width", "1");
  this.dataSVG.setAttribute("transform","matrix(1 0 0 1 0 0)");
  this.xPos = xPos;
  this.yPos = yPos;
  this.position = this.SVGparent.createSVGPoint();
  this.radius = radius;

  var self = this;


  this.getPosition = function(){
    return [self.xPos,self.yPos];
  }
}

inheritPrototype(Circle,SVGCShape);

/**
 * Sets a new position for this Circle shape.
 * @param  {float} xPos New x coordinate for this Circle.
 * @param  {float} yPos New y coordinate for this Circle.
 * @return {null}
 */
Circle.prototype.setPos = function(xPos,yPos){
  this.xPos = xPos;
  this.yPos = yPos;
  this.position.x = xPos;
  this.position.y = yPos;
  this.dataSVG.setAttribute("cx",xPos);
  this.dataSVG.setAttribute("cy",yPos);
}

/**
 * Sets a new radius for this Circle shape.
 * @param  {float} radius New radius for this Circle shape.
 * @return {null}
 */
Circle.prototype.setRadius = function(radius){
  this.dataSVG.setAttribute("r",radius);
  this.radius = radius;
}
/**
 * Returns the position of this circle shape.
 * @return {[Number]} The coordinate value of this circle's position.
 */
Circle.prototype.getPosition = function(){
  return [this.xPos,this.yPos];
}
