var NS_SVG = "http://www.w3.org/2000/svg";

/**
 * A SVG shape for a SVG Canvas. "Abstract parent class".
 * @constructor
 */
function SVGCShape(){
  this.dataSVG;

  var self = this;

  /**
   * Sets the stroke color of this SVGCShape.
   * @param  {string} color The stroke color for this SVGCShape.
   * @return {null}
   */
  this.stroke = function(color){
    self.dataSVG.setAttribute("stroke",color);
  }
  /**
   * Sets the stroke weight for this SVGCShape.
   * @param  {string} weight The stroke weight for this SVGCShape.
   * @return {null}
   */
  this.strokeWeight = function(weight){
    self.dataSVG.setAttribute("stroke-width",weight);
  }
  /**
   * Returns the SVG DOM element associated with this SVGCShape.
   * @return {SVG} The SVG DOM element associated with this SVGCShape.
   */
  this.getSVG = function(){
    return self.dataSVG;
  }
  /**
   * Returns the point at a normalized (0-1) parameter length value along this
   * SVGCShape.
   * @param  {float} t Normalized length parameter value to query.
   * @return {SVGPoint} The point at specified parameter value.
   */
  this.getPointAtParameter = function(t){
    var totalLength = self.dataSVG.getTotalLength();
    return self.dataSVG.getPointAtLength(t*totalLength);
  }

  this.getMatrix = function(){
    var matrix = self.dataSVG.getAttributeNS(null, "transform").slice(7,-1).split(' ');
    //console.log(matrix);
      for(var i=0; i<matrix.length; i++) {
        matrix[i] = parseFloat(matrix[i]);
      }
    return matrix;
  }
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


  // safe alias
  var self = this;


  /**
   * Sets a new position for this Circle shape.
   * @param  {float} xPos New x coordinate for this Circle.
   * @param  {float} yPos New y coordinate for this Circle.
   * @return {null}
   */
  this.setPos = function(xPos,yPos){
    self.xPos = xPos;
    self.yPos = yPos;
    self.position.x = xPos;
    self.position.y = yPos;
    self.dataSVG.setAttribute("cx",xPos);
    self.dataSVG.setAttribute("cy",yPos);
  }

  /**
   * Sets a new radius for this Circle shape.
   * @param  {float} radius New radius for this Circle shape.
   * @return {null}
   */
  this.setRadius = function(radius){
    self.dataSVG.setAttribute("r",radius);
    self.radius = radius;
  }

  this.getPosition = function(){
    return [self.xPos,self.yPos];
  }
}

/**
 * A Line SVGCShape. Extends SVGCShape.
 * @param       {float} x1 The x coordinate for this Line's first point.
 * @param       {float} y1 The y coordinate for this Line's first point.
 * @param       {float} x2 The x coordinate for this Line's second point.
 * @param       {float} y2 The y coordinate for this Line's second point.
 * @constructor
 */
function Line(x1,y1,x2,y2,svgParent){
  SVGCShape.call(this);
  this.SVGparent = svgParent;
  this.dataSVG = document.createElementNS(NS_SVG, "line");
  this.dataSVG.setAttribute("stroke", "black");
  this.dataSVG.setAttribute("stroke-width", "1");
  this.dataSVG.setAttribute("x1", x1);
  this.dataSVG.setAttribute("y1", y1);
  this.dataSVG.setAttribute("x2", x2);
  this.dataSVG.setAttribute("y2", y2);
  this.dataSVG.setAttribute("transform","matrix(1 0 0 1 0 0)");


  var self = this;
  /**
   * Sets a new position for this Line shape.
   * @param  {float} x1 The new x coordinate for this Line's first point.
   * @param  {float} y1 The new y coordinate for this Line's first point.
   * @param  {float} x2 The new x coordinate for this Line's second point.
   * @param  {float} y2 The new y coordinate for this Line's second point.
   * @return {null}
   */
  this.setPos = function(x1,y1,x2,y2){
    self.dataSVG.setAttribute("x1", x1);
    self.dataSVG.setAttribute("y1", y1);
    self.dataSVG.setAttribute("x2", x2);
    self.dataSVG.setAttribute("y2", y2);
  }
  /**
   * Sets a new position for this Line's first point.
   * @param  {float} x The new x coordinate for this Line's first point.
   * @param  {float} y The new y coordinate for this Line's first point.
   * @return {null}
   */
  this.setP1 = function(x,y){
    self.dataSVG.setAttribute("x1", x);
    self.dataSVG.setAttribute("y1", y);
  }
  /**
   * [description]
   * @param  {float} x The new x coordinate for this Line's second point.
   * @param  {float} y The new y coordinate for this Line's second point.
   * @return {null}   [description]
   */
  this.setP2 = function(x,y){
    self.dataSVG.setAttribute("x2", x);
    self.dataSVG.setAttribute("y2", y);
  }

  this.getP1 = function(){
    var x = self.dataSVG.getAttribute("x1");
    var y = self.dataSVG.getAttribute("y1");
    return [x,y];
  }

  this.getP2 = function(){
    var x = self.dataSVG.getAttribute("x2");
    var y = self.dataSVG.getAttribute("y2");
    return [x,y];
  }
}

/**
 * A Rectangle SVG shape. Extends SVGCShape.
 * @param       {float} xPos   The x coordinate for the top left corner of this
 *                             Rect shape.
 * @param       {float} yPos   The y coordinate for the top left corner of this
 *                             Rect shape.
 * @param       {float} width  The width of this Rect shape.
 * @param       {float} height The height of this Rect shape.
 * @constructor
 */
function Rect(xPos,yPos,width,height){
  SVGCShape.call(this);
  this.dataSVG = document.createElementNS(NS_SVG, "rect");
  this.dataSVG.setAttribute("fill", "white");
  this.dataSVG.setAttribute("stroke", "black");
  this.dataSVG.setAttribute("stroke-width", "1")
  this.dataSVG.setAttribute("x", xPos);
  this.dataSVG.setAttribute("y", yPos);
  this.dataSVG.setAttribute("width", width);
  this.dataSVG.setAttribute("height", height);
  this.dataSVG.setAttribute("transform","matrix(1 0 0 1 0 0)");

  //safe alias
  var self = this;

  /**
   * Sets new position parameters for this Rect shape.
   * @param  {float} xPos   The new x coordinate for this Rect shape.
   * @param  {float} yPos   The new y coordinate for this Rect shape.
   * @param  {float} width  The new width for this Rect shape.
   * @param  {float} height The new height for this Rect shape.
   * @return {null}
   */
  this.set = function(xPos,yPos,width,height){
    self.dataSVG.setAttribute("x", xPos);
    self.dataSVG.setAttribute("y", yPos);
    self.dataSVG.setAttribute("width", width);
    self.dataSVG.setAttribute("height", height);
  }

  /**
   * Sets a new position for this Rect shape.
   * @param  {float} xPos The new x coordinate for this Rect shape.
   * @param  {float} yPos The new y coordinate for this Rect shape.
   * @return {null}
   */
  this.setPos = function(xPos,yPos){
    self.dataSVG.setAttribute("x", xPos);
    self.dataSVG.setAttribute("y", yPos);
  }
}

/**
 * A PolyLine SVG shape. Extends SVGCShape.
 * @param       {SVG DOM element} SVGparent SVG element upon which this PolyLine
 *                                          will be drawn.
 * @constructor
 */
function PolyLine(SVGparent){
  SVGCShape.call(this);
  this.SVGparent = SVGparent;
  this.dataSVG = document.createElementNS(NS_SVG, "polyline");
  this.dataSVG.setAttribute("stroke", "black");
  this.dataSVG.setAttribute("stroke-width", "1");
  this.dataSVG.setAttribute("fill", "none");
  this.dataSVG.setAttribute("transform","matrix(1 0 0 1 0 0)");

  var self = this;
  /**
   * Adds a new point to this PolyLine shape.
   * @param  {float} x The x coordinate of the new PolyLine point.
   * @param  {float} y The y coordinate of the new PolyLine point.
   * @return {null}
   */
  this.addPoint = function(x,y){
    var point = self.SVGparent.createSVGPoint();
    point.x = x;
    point.y = y;
    this.dataSVG.points.appendItem(point);
  }

  /**
   * Sets a specified point in this PolyLine shape to a specified position.
   * @param  {int} index Index of point to set in this PolyLine shape.
   * @param  {float} x  New x coordinate of specified point.
   * @param  {float} y  New y coordinate of specified point.
   * @return {null}
   */
  this.setPoint = function(index,x,y){
    var point = self.dataSVG.points.getItem(index);
    point.x = x;
    point.y = y;
  }

  this.reset = function(){
      self.dataSVG.points.clear();
  }
}

/**
 * A Polygon SVG Shape. Extends SVGCShape.
 * @param       {SVG DOM element} SVGparent SVG element upon which this PolyLine
 *                                          will be drawn.
 * @constructor
 */
function Polygon(SVGparent){
  SVGCShape.call(this);
  this.SVGparent = SVGparent;
  this.dataSVG = document.createElementNS(NS_SVG, "polygon");
  this.dataSVG.setAttribute("stroke", "white");
  this.dataSVG.setAttribute("stroke-width", "1");
  this.dataSVG.setAttribute("fill", "rgba(0,255,0,0.00)");
  this.dataSVG.setAttribute("transform","matrix(1 0 0 1 0 0)");
  this.vertices = [];
  this.centroid = this.SVGparent.createSVGPoint();
  this.uLine = new Line(0,0,10,10);
  this.uLine.stroke("none");
  this.SVGparent.appendChild(this.uLine.getSVG());

  // safe alias
  var self = this;

  /**
   * [description]
   * @param  {float} x [description]
   * @param  {float} y [description]
   * @return {null}
   */
  this.addPoint = function(x,y){
    var point = self.SVGparent.createSVGPoint();
    point.x = x;
    point.y = y;
    self.dataSVG.points.appendItem(point);
    self.vertices.push(point);
    self.computeCentroid();
  }

  /**
   * [description]
   * @param  {float} u Normalized (0-1)
   * @param  {float} v Normalized (0-1)
   * @return {SVGPoint}   [description]
   */
  this.getPosAtUV = function(u,v){
    var p_u = self.getPointAtParameter(u);
    self.uLine.setPos(self.centroid.x,self.centroid.y,p_u.x,p_u.y);
    return self.uLine.getPointAtParameter(v);
  }

  /**
   * [description]
   * @param  {[type]} index [description]
   * @param  {[type]} x     [description]
   * @param  {[type]} y     [description]
   * @return {[type]}       [description]
   */
  this.setPoint = function(index,x,y){
    var point = self.dataSVG.points.getItem(index);
    point.x = x;
    point.y = y;
    self.vertices[index] = point;
    self.computeCentroid();
  }

  //todo : Data strategy DP
  this.getCentroid = function(){
    return self.centroid;
  }

  //todo : Data strategy DP
  this.computeCentroid = function(){
    var signedArea = 0;
    var x0;
    var y0;
    var x1;
    var y1;
    var cX = 0;
    var cY = 0;

    for(var i = 0; i < self.vertices.length-1; i++){

      x0 = self.vertices[i].x;
      y0 = self.vertices[i].y;
      x1 = self.vertices[i+1].x;
      y1 = self.vertices[i+1].y;

      var a = x0*y1 - x1*y0;
      signedArea += a;
      cX += (x0 + x1)*a;
      cY += (y0 + y1)*a;
    }

    x0 = self.vertices[i].x;
    y0 = self.vertices[i].y;
    x1 = self.vertices[0].x;
    y1 = self.vertices[0].y;
    var a = x0*y1 - x1*y0;
    signedArea += a;
    cX += (x0 + x1)*a;
    cY += (y0 + y1)*a;

    signedArea *= 0.5;
    cX /= (6.0*signedArea);
    cY /= (6.0*signedArea);
    self.centroid.x = cX;
    self.centroid.y = cY;
    return self.centroid;
  }
}
