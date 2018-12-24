if(chrome){
	chrome.runtime.onInstalled.addListener(function() {
	    console.log("inicializando extension");
	});
	/* Cada vez que se recibe un mensaje desde el script de contenido, se ejecuta la acción
	asociada al mensaje, en caso de que la opción de captura este activada */
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		chrome.storage.local.get(['capturing'], function(storageCaptureResult){
			if(!storageCaptureResult.capturing){
				return;
			}
			else if(!request.action){
				return;
			}
			messagesActionsMap[request.action](request, sender, sendResponse);
		});
	});
}
else{
	browser.runtime.onInstalled.addListener(function() {
	    console.log("inicializando extension");
	});
	browser.runtime.onMessage.addListener(function(request, sender, sendResponse){
		browser.storage.local.get(['capturing'], function(storageCaptureResult){
			if(!storageCaptureResult.capturing){
				return;
			}
			else if(!request.action){
				return;
			}
			messagesActionsMap[request.action](request, sender, sendResponse);
		});
	});
}

