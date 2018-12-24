/* Funcion que se ejcucta cuando se detecta que se ha presionado una tecla en la pestaña.

Recibe un objeto Keyboardevent, obtenido desde:

https://www.w3schools.com/jsref/obj_keyboardevent.asp
*/
function sendKeystroke(keyboardEvent){

	if(keyboardEvent.keyCode === 9 || keyboardEvent.keyCode === 20 || keyboardEvent.keyCode === 16 || keyboardEvent.keyCode === 225 
        || keyboardEvent.keyCode === 229 || keyboardEvent.keyCode === 17 || keyboardEvent.keyCode === 18 || keyboardEvent.keyCode === 33 
        || keyboardEvent.keyCode === 34 || keyboardEvent.keyCode === 35 || keyboardEvent.keyCode === 36
        || keyboardEvent.key === 'Dead'){
		return;
	}

	var keystrokeObject = {
		action: 'keystroke',
		pressedKey: keyboardEvent.key,
		captureTimestamp: new Date().getDate()
	};

	if(chrome){
		chrome.runtime.sendMessage(keystrokeObject,function(response){

		});
	}
	else{
		browser.runtime.sendMessage(keystrokeObject,function(response){

		});
	}
}

/* Función que se ejecuta cuando se detecta que se ha seleccionado texto en la pestaña
	Solo se envía si efectivamente el usuario terminó de seleccionar.
*/
function sendMouseUp(){
	var selectedText = window.getSelection().toString().trim();
	if(!selectedText.length){
		return;
	}

	var mouseUpObject = {
		action: 'mouseUp',
		selectedText: selectedText,
		captureTimestamp: new Date().getDate()
	};

	if(chrome){
		chrome.runtime.sendMessage(mouseUpObject, function(response){

		});
	}
	else{
		browser.runtime.sendMessage(mouseUpObject, function(response){

		});
	}
}

/* Función que se ejecuta cuando se detecta un movimiento de mouse en la pestaña
Se capturan todas las coordenadas posibles, de acuerdo al objeto MouseEvent recibido, obtenido desde:
	https://www.w3schools.com/jsref/obj_mouseevent.asp
 */
function sendMouseMove(mouseEvent){

	var mouseMoveObj = {
		action: 'mouseMove',
		xPage: mouseEvent.pageX,
		yPage: mouseEvent.pageY,
		xClient: mouseEvent.clientX,
		yClient: mouseEvent.clientY,
		xScreen: mouseEvent.screenX,
		yScreen: mouseEvent.screenY,
		xMovement: mouseEvent.movementX,
		yMovement: mouseEvent.movementY,
		captureTimestamp: new Date().getDate()
	};

	if(chrome){
		chrome.runtime.sendMessage(mouseMoveObj, function(response){

		});
	}
	else{
		browser.runtime.sendMessage(mouseMoveObj, function(response){

		});
	}
}

/* Funcion que se ejecuta cuando se detecta un click en la pestaña. Recibe un objeto MouseEvent,
obtenido desde: 

https://www.w3schools.com/jsref/obj_mouseevent.asp

*/

function sendMouseClick(mouseEvent){
	var mouseClickObject = {
		action: 'mouseClick',
		xPage: mouseEvent.pageX,
		yPage: mouseEvent.pageY,
		xClient: mouseEvent.clientX,
		yClient: mouseEvent.clientY,
		xScreen: mouseEvent.screenX,
		yScreen: mouseEvent.screenY,
		xMovement: mouseEvent.movementX,
		yMovement: mouseEvent.movementY,
		captureTimestamp: new Date().getDate()
	};

	if(chrome){
		chrome.runtime.sendMessage(mouseClickObject, function(response){

		});
	}
	else{
		browser.runtime.sendMessage(mouseClickObject, function(response){

		});
	}
}