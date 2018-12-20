console.log("Ejecutando script de contenido");

/* Cada vez que se ejecuta este script, signifca una nueva pestaña abierta*/
chrome.runtime.sendMessage({
	action: 'newTab'
});


/* Asociamos los handlers a los eventos de la ventana del navegador*/
window.addEventListener('keydown', sendKeystroke);
window.addEventListener('mouseup', sendMouseUp);
window.addEventListener('mousemove', sendMouseMove);
window.addEventListener('click', sendMouseClick);



