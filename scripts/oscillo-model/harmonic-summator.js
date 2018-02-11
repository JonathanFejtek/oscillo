extend(HarmonicSummator.prototype,StateComponent.prototype);
/**
 * 
 * @param {*} seriesController 
 */
function HarmonicSummator(seriesController){
    StateComponent.call(this);
    if(seriesController){
        this.seriesController = seriesController;
        this.observe(this.seriesController);
    }
    this.values = [];
    this.seriesFrequencyFactor = 3;
}

/**
 * 
 * @param {*} obj 
 * @param {*} arg 
 */
HarmonicSummator.prototype.update = function(obj,arg){
    if(this.seriesController){
        if(obj == this.seriesController){
            this.values = this.seriesController.getPartialValues();
            console.log(this.values);
            this.seriesFrequencyFactor = this.seriesController.getSeriesFactor();
            this.notify();
        }
    }
}

/**
 * 
 * @param {*} t 
 * @param {*} phase 
 */
HarmonicSummator.prototype.getValueAtParameter = function(t,phase){
    switch(phase){
        case "sine" : 
            return this.getValueAtParameterSin(t);
        break;

        case "cos" :
            return this.getValueAtParameterCos(t);
        break;
    }
}

/**
 * 
 * @param {*} t 
 */
HarmonicSummator.prototype.getValueAtParameterSin = function(t){
    let val = 0;
    for(let i = 0; i < this.values.length; i++){
        // wave amplitude
        let amp = this.values[i];
        // wave frequency
         let freq = (i*this.seriesFrequencyFactor)+(this.seriesFrequencyFactor-1);    
        val+= amp*Math.sin(freq*t);
    }
    return val;
}

/**
 * 
 * @param {*} t 
 */
HarmonicSummator.prototype.getValueAtParameterCos = function(t){
    let val = 0;
    for(let i = 0; i < this.values.length; i++){
        // wave amplitude
        let amp = this.values[i];
        // wave frequency
         let freq = (i*this.seriesFrequencyFactor)+(this.seriesFrequencyFactor-1); 
        val+= amp*Math.cos(freq*t);
    }
    return val;
}

/**
 * 
 */
HarmonicSummator.prototype.getPartialSum = function(){
    let sum = 0;
    for(let i = 0; i < this.values.length; i++){
        let amp = parseFloat(this.values[i]);
        sum+= amp;
    }
    return sum;   
}