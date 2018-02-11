function appendChildToElement(child,element){
    if(typeof child === 'object'){
        element.appendChild(child)
    }
    else{
        element.innerHTML += child;
    }
}
  
function createElement(type,attributes,children){
    var element = document.createElement(type);

    for(var i = 0; i < Object.keys(attributes).length; i++){
        var attr = Object.keys(attributes)[i];
        //anchors on a listener (i.e 'onClick')
        if(/^on.*$/.test(attr)){
        //format string for listener and set function
            element.addEventListener(attr.substring(2).toLowerCase(),attributes[attr]);
        }

        else{
            element[attr] = attributes[attr];
        }
    }
  
    if(children != null){
        if(children instanceof Array){
            for(var i = 0; i < children.length; i++){
                var child = children[i];
                appendChildToElement(child,element);
            }
        }
  
        else{
            appendChildToElement(element,children);
        }
    }
    return element;
}
  
function crEl(type,attributes,children){
    return createElement(type,attributes,children);
}
  
function cE(type,attributes,children){
    return createElement(type,attributes,children);
}
  
function initElement(element,container){
    if(typeof container == "string"){
        if(container.toLowerCase() == "body"){
            document.body.appendChild(element);
        }

        else{
            document.getElementById(container).appendChild(element);
        }
    }

    else{
        container.appendChild(element);
    }
}

function iE(element,container){
    initElement(element,container);
}


function DomAid(){}

DomAid.removeClassFromElement = function removeClassFromElement(element,className){
    if(element.classList){
        element.classList.remove(className);
    }
}

DomAid.addClassToElement = function addClassToElement(element,className){
    if(element.classList){
        element.classList.add(className);
    }
}

console.log(DomAid.addClassToElement);