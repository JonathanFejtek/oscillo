extend(CurveViewController.prototype,StateComponent.prototype);
/**
 * 
 * @param {*} parentElement 
 */
function CurveViewController(parentElement){
    StateComponent.call(this);

    this.controllerGroup = new NumericSetController(parentElement);
    this.controllerGroup.addController("Curve Thickness",1,15);
    this.controllerGroup.addController("Curve Fidelity",16,4000);
    this.controllerGroup.addController("Zoom",10,500);
    this.controllerGroup.getController("Curve Fidelity").setNumericType("int");
    this.controllerGroup.setValue("Curve Fidelity",2000);
    this.observe(this.controllerGroup);
}

/**
 * 
 * @param {*} obj 
 * @param {*} arg 
 */
CurveViewController.prototype.update = function(obj,arg){

    if(obj instanceof PresetManager){
        if(arg){
            this.controllerGroup.setValue("Curve Thickness",arg["curveThickness"]);
            this.controllerGroup.setValue("Curve Fidelity", arg["curveFidelity"]);
            this.controllerGroup.setValue("Zoom", arg["zoom"]);
            this.notify("Preset Application");
        }
    }

    switch(obj){
        case this.controllerGroup :
            this.notify(arg + " Change");
        break;

        default:
        break;
    }
    
}

/**
 * 
 */
CurveViewController.prototype.getCurveThickness = function(){
    return this.controllerGroup.getValue("Curve Thickness");
}

/**
 * 
 */
CurveViewController.prototype.getCurveFidelity = function(){
    return this.controllerGroup.getValue("Curve Fidelity");
}

/**
 * 
 */
CurveViewController.prototype.getZoom = function(){
    return this.controllerGroup.getValue("Zoom");
}

