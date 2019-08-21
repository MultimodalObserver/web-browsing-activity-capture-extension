/* Cada vez que se recibe un mensaje desde el script de contenido, se ejecuta la acción
asociada al mensaje, en caso de que la opción de captura este activada */
currentBrowser.tabs.onCreated.addListener(sendTabCreated);
currentBrowser.tabs.onUpdated.addListener(sendTabUpdate);
currentBrowser.tabs.onRemoved.addListener(sendTabClosed);

currentBrowser.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(!request.action){
		return;
	}
	currentBrowser.storage.local.get(['httpsConfiguration'], function(configResult){
		if(!configResult.httpsConfiguration){
			return;
		}
		var actionThrottleTime = configResult.httpsConfiguration[request.action].throttle * 1000;
		var throttledFunction = actionThrottleTime !== 0 ? throttle(messagesActionsMap[request.action],
			actionThrottleTime) : messagesActionsMap[request.action];
		throttledFunction(request, sender, sendResponse, configResult.httpsConfiguration);
	});
});

