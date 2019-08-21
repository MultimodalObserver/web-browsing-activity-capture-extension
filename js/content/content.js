/* Cada vez que se ejecuta este script, signifca una nueva pestaña abierta
    Cuando se carga este script, significa que se cargó una url en la tab actual, por ende capturamos los query params de esta url
* */
currentBrowser.storage.local.get(['capturing'], function(capturingResult){
    if(!capturingResult.capturing){
        return;
    }
    currentBrowser.runtime.sendMessage({
        action: 'search'
    });

    /* Asociamos los handlers a los eventos de la ventana del navegador*/
    window.addEventListener('keyup', sendKeystroke);
    window.addEventListener('mouseup', sendMouseUp);
    window.addEventListener('mousemove', sendMouseMove);
    window.addEventListener('click', sendMouseClick);
});



