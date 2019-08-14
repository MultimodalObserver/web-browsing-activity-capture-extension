/* Cada vez que se recibe un mensaje desde el script de contenido, se ejecuta la acción
asociada al mensaje, en caso de que la opción de captura este activada */
currentBrowser.runtime.onMessage.addListener(function(request, sender, sendResponse){
	currentBrowser.storage.local.get(['capturing'], function(storageCaptureResult){
		if(!storageCaptureResult.capturing){
			return;
		}
		else if(!request.action){
			return;
		}
		currentBrowser.storage.local.get(['httpsConfiguration'], function(configResult){
			if(!configResult.httpsConfiguration){
				return;
			}
			var throttledFunction = throttle(messagesActionsMap[request.action],
				configResult[request.action].throttle);
			throttledFunction(request, sender, sendResponse, configResult);
		});
	});
});

