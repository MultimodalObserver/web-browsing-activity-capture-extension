/* Variable que almacena un mapa de:

	mensaje recibido de algun tipo de accion: funcion que maneja ese mensaje
	según el tipo de accion capturada que representa.

*/ 

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


var messagesActionsMap = {
	'newTab': function(message, sender, sendResponse, serverConfig){
		//Implementar logica!!!
	},
	'keystroke': function(message, sender, sendResponse, serverConfig){
		sendAjaxRequest({
			method: 'POST',
			url: /*serverConfig.serverUrl+'/'+*/serverConfig.keystrokesCallbackUrl,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data: {
				browser : serverConfig.browser,
				pageUrl: sender.tab.url,
				keyValue: message.pressedKey,
				captureTimestamp: message.captureTimestamp 
			}
		},function(success){
			console.log(sucess.response);
		}, function(error){
			serverError(error);
		});
	},
	'mouseMove': function(message, sender, sendResponse, serverConfig){
		sendAjaxRequest({
			method: 'POST',
			url: /*serverConfig.serverUrl+'/'+*/serverConfig.mouseMovesCallbackUrl,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data: {
				browser: serverConfig.browser,
				pageUrl: sender.tab.url,
				xPage: message.xPage,
				yPage: message.yPage,
				xClient: message.xClient,
				yClient: message.yClient,
				xScreen: message.xScreen,
				yScreen: message.yScreen,
				xMovement: message.xMovement,
				yMovement: message.yMovement,
				captureTimestamp: message.captureTimestamp
			}
		}, function(sucess){
			console.log(sucess.response);
		}, function(error){
			serverError(error);
		});
	},
	'mouseClick': function(message, sender, sendResponse, serverConfig){
		sendAjaxRequest({
			method: 'POST',
			url: /*serverConfig.serverUrl+'/'+*/serverConfig.mouseClicksCallbackUrl,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data: {
				browser: serverConfig.browser,
				pageUrl: sender.tab.url,
				xPage: message.xPage,
				yPage: message.yPage,
				xClient: message.xClient,
				yClient: message.yClient,
				xScreen: message.xScreen,
				yScreen: message.yScreen,
				xMovement: message.xMovement,
				yMovement: message.yMovement,
				captureTimestamp: message.captureTimestamp
			}
		}, function(sucess){
			console.log(sucess.response);
		}, function(error){
			serverError(error);
		});
	},
	'mouseUp': function(message, sender, sendResponse, serverConfig){
		sendAjaxRequest({
			method: 'POST',
			url: /*serverConfig.serverUrl+'/'+*/serverConfig.mouseUpsCallbackUrl,
			headers:{
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data:{
				browser: serverConfig.browser,
				pageUrl: sender.tab.url,
				selectedText: message.selectedText
			}
		}, function(sucess){
			console.log(sucess.response);
		}, function(error){
			serverError(error);
		});
	}
};