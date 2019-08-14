/* Cada vez que se ejecuta este script, signifca una nueva pestaña abierta
*
* FALTA DETECTAR LAS OTRAS ACCIONES RELACIONADAS A UNA PESTAÑA!!!!
* */

currentBrowser.runtime.sendMessage({
	action: 'tab',
	type: 'newTab'
});

/* Asociamos los handlers a los eventos de la ventana del navegador*/
window.addEventListener('keyup', sendKeystroke);
window.addEventListener('mouseup', sendMouseUp);
window.addEventListener('mousemove', sendMouseMove);
window.addEventListener('click', sendMouseClick);



