/* Funcion helper para setear error de servidor */
function serverError(error){
    if(chrome){
        chrome.storage.local.set({serverError : true}, function(){
            chrome.storage.local.set({capturing: false}, function (){
                console.log(error);
            });
        });
    }
    else{
        browser.storage.local.set({serverError : true}, function(){
            browser.storage.local.set({capturing: false}, function (){
                console.log(error);
            });
        });
    }
}