/* Funcion helper para setear error de servidor */
function serverError(error){
    var currentBrowser = chrome ? chrome : browser;
    currentBrowser.storage.local.set({serverError : true}, function(){
        currentBrowser.storage.local.set({capturing: false}, function (){
            console.error(error);
        });
    });
}