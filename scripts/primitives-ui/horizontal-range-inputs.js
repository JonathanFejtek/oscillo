
extend(HorizontalSlider.prototype,Subject.prototype);
/**
 * 
 * @param {*} parentElement 
 * @param {*} sliderClass 
 */
function HorizontalSlider(parentElement,sliderClass){
    Subject.call(this);
    this.parentElement = parentElement;

    this.container = document.createElement("div");
    this.container.setAttribute("class","-range-container");

    this.rangeInput = document.createElement("INPUT");
    this.rangeInput.setAttribute("class","-range-input");
    this.rangeInput.setAttribute("type","range");
    this.rangeInput.setAttribute("step",String(1.0/32));
    this.rangeInput.setAttribute("min","0");
    this.rangeInput.setAttribute("max", "1");
    this.rangeInput.setAttribute("value","0");

    this.container.appendChild(this.rangeInput);
    this.parentElement.appendChild(this.container);

    this.rangeInput.addEventListener("input",this.handle.bind(this));
}

/**
 * 
 */
HorizontalSlider.prototype.getValue = function(){
    return this.rangeInput.value;
}

/**
 * 
 * @param {*} v 
 */
HorizontalSlider.prototype.setValue = function(v){
    this.rangeInput.value = v;
}

/**
 * 
 * @param {*} e 
 */
HorizontalSlider.prototype.handle = function(e){
    this.notify();
}

/**
 * 
 * @param {*} low 
 * @param {*} high 
 */
HorizontalSlider.prototype.setRange = function(low,high){
    console.log("set-range");
    this.rangeInput.setAttribute("min",low);
    this.rangeInput.setAttribute("max",high);  
    this.rangeInput.setAttribute("value",low);
}

/**
 * 
 * @param {*} s 
 */
HorizontalSlider.prototype.setStepSize = function(s){
    this.rangeInput.setAttribute("step",s);
}





extend(ParameterRangeInput.prototype,StateComponent.prototype);
/**
 * 
 * @param {*} parentElement 
 * @param {*} label 
 */
function ParameterRangeInput(parentElement,label){
    StateComponent.call(this);
    this.parentElement = parentElement;
    this.low = 0;
    this.high = 1;
    this.name = label;
    this.numericType = "float";

    this.container = document.createElement("div");
    this.container.setAttribute("class","-pi-container");

    this.label = document.createElement("h5");
    this.label.setAttribute("class","-pi-range-input-label");
    this.container.appendChild(this.label);

    if(label){
        this.label.innerHTML = label;
    }

    this.horizontalSlider = new HorizontalSlider(this.container);
    this.observe(this.horizontalSlider);
    
    this.textInput = document.createElement("INPUT");
    this.textInput.setAttribute("class","-pi-text-input");
    this.textInput.value = this.horizontalSlider.getValue();
    this.container.appendChild(this.textInput);
   
    this.parentElement.appendChild(this.container);
    this.textInput.addEventListener("change",this.handle.bind(this));
}

/**
 * 
 * @param {*} e 
 */
ParameterRangeInput.prototype.handle = function(e){
    switch(e.target){
        case this.textInput :
            if(this.textInput.value < this.low){
                this.textInput.value = this.low;
            }

            else if(this.textInput.value > this.high){
                this.textInput.value = this.high;
            }

            if(this.numericType == "int"){
                this.textInput.value = Math.round(this.textInput.value);
            }

            this.horizontalSlider.setValue(this.textInput.value);
            this.notify();
        break;
    }
}

/**
 * 
 * @param {*} obj 
 */
ParameterRangeInput.prototype.update = function(obj){
    if(obj === this.horizontalSlider){
        this.textInput.value = this.horizontalSlider.getValue();
    }
    this.notify();
}

/**
 * 
 * @param {*} type 
 */
ParameterRangeInput.prototype.setNumericType = function(type){
    this.numericType = type;
    if(type == "int"){
        this.horizontalSlider.setStepSize(1);
    }
}

/**
 * 
 * @param {*} low 
 * @param {*} high 
 */
ParameterRangeInput.prototype.setRange = function(low,high){
    this.low = low;
    this.high = high;
    this.horizontalSlider.setRange(low,high);
    this.textInput.value = low;
}

/**
 * 
 */
ParameterRangeInput.prototype.getValue = function(){
    return this.horizontalSlider.getValue();
}

/**
 * 
 * @param {*} v 
 */
ParameterRangeInput.prototype.setValue = function(v){
    this.horizontalSlider.setValue(v);
    this.textInput.value = v;
}




extend(NumericSetController.prototype,StateComponent.prototype);
/**
 * 
 * @param {*} parentElement 
 */
function NumericSetController(parentElement){
    StateComponent.call(this);
    this.parentElement = parentElement;

    this.parameterRangeInputs = {};

    this.container = document.createElement("div");
    this.container.setAttribute("class","numeric-set-controller-container");

    this.parentElement.appendChild(this.container);
}

/**
 * 
 * @param {*} name 
 * @param {*} low 
 * @param {*} high 
 */
NumericSetController.prototype.addController = function(name,low,high){
    if(!this.parameterRangeInputs.hasOwnProperty(name)){
        var newController = new ParameterRangeInput(this.container,name);
        if(typeof low == 'number' && typeof high == 'number'){
            newController.setRange(low,high);
        }
        this.parameterRangeInputs[name] = newController;
        this.observe(newController);

        return this.parameterRangeInputs[name];
    }
}

/**
 * 
 * @param {*} obj 
 */
NumericSetController.prototype.update = function(obj){
    this.notify(obj.name);
}

/**
 * 
 * @param {*} name 
 */
NumericSetController.prototype.getController = function(name){
    return this.parameterRangeInputs[name];
}

/**
 * 
 * @param {*} controllerName 
 */
NumericSetController.prototype.getValue = function(controllerName){
    return this.parameterRangeInputs[controllerName].getValue();
}

/**
 * 
 * @param {*} controllerName 
 * @param {*} val 
 */
NumericSetController.prototype.setValue = function(controllerName, val){
    this.parameterRangeInputs[controllerName].setValue(val);
}