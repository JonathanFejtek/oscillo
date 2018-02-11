extend(ToggleButton.prototype,StateComponent.prototype);
/**
 * 
 * @param {*} parentElement 
 * @param {*} width 
 * @param {*} height 
 * @param {*} label 
 */
function ToggleButton(parentElement,width,height,label){
    StateComponent.call(this);
    this.parentElement = parentElement;

    this.container = document.createElement("div");
    this.container.setAttribute("class","toggle-button-container");

    this.label = document.createElement("h5");
    this.label.setAttribute("class","toggle-botton-label");

    if(label){
        this.label.innerHTML = label;
    }

    this.button = document.createElement("div");
    this.button.setAttribute("class","toggle-button");
    this.button.style.width = width;
    this.button.style.height = height;

    this.container.appendChild(this.label);
    this.container.appendChild(this.button);
    this.parentElement.appendChild(this.container);

    this.toggled = false;

    this.button.addEventListener("click",this.handle.bind(this));
}

/**
 * 
 * @param {*} e 
 */
ToggleButton.prototype.handle = function(e){
    this.toggle();
}

/**
 * 
 */
ToggleButton.prototype.toggle = function(){
    if(this.toggled){
        this.toggled = false;
        this.button.classList.remove("toggle-button-toggled");
    }
    else{
        this.toggled = true;
        this.button.classList.add("toggle-button-toggled");
    }
    this.notify();
}