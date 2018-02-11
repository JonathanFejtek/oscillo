function mapValue(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


extend(WavePreviewGraph.prototype,StateComponent.prototype);
/**
 * 
 * @param {*} ySource 
 * @param {*} type 
 * @param {*} svgCanvas 
 */
function WavePreviewGraph(ySource,type,svgCanvas){
    StateComponent.call(this);
    this.svgCanvas = svgCanvas;
    this.type = type;
    this.ySource = ySource;
    this.curve = this.svgCanvas.PolyLine([]);
    this.observe(this.ySource);

    for(let i = 0; i < 200; i++){
        this.curve.addPoint(0,0);
    }
}

/**
 * 
 * @param {*} obj 
 * @param {*} arg 
 */
WavePreviewGraph.prototype.update = function(obj,arg){
    let c = 0;
  
    let boundWidth = this.svgCanvas.getWidth();
    let boundHeight = this.svgCanvas.getHeight();
  
    let two_pi = Math.PI*2;
  
    let psum = this.ySource.getPartialSum();

    for(let t = 0; t < two_pi-(two_pi/200); t+=two_pi/200){
        let x = mapValue(t,0,two_pi,4,boundWidth-4);
        let j = mapValue(t,0,two_pi,4,boundWidth-4);
        let y;

        if(this.type == "sine"){
            y = mapValue(this.ySource.getValueAtParameter(t,"sine"),-psum,psum, boundHeight-4,4);
        }

        else{
            y = mapValue(this.ySource.getValueAtParameter(t,"cos"),-psum,psum,boundHeight-4,4);
        }

        this.curve.setPoint(c,x,y);
        c++;
    }   
}


