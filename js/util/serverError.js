/* Funcion helper para setear error de servidor */
function serverError(error, afterCaptureInit){
    var currentBrowser = chrome ? chrome : browser;
    currentBrowser.storage.local.get(['capturing'], function(capturingResult){
       if(afterCaptureInit && !capturingResult.capturing){
           return;
       }
       currentBrowser.storage.local.set({serverError : true}, function(){
            currentBrowser.storage.local.set({capturing: false}, function (){
                console.log(error, error);
            });
       });
    });
}