/* Variable que almacena un mapa de:

	mensaje recibido de algun tipo de accion: funcion que maneja ese mensaje
	según el tipo de accion capturada que representa.

*/
var messagesActionsMap = {
	'search': function(message, sender, sendResponse, serverConfig){
		/* Implementar logica */
	},
	'tab': function(message, sender, sendResponse, serverConfig){
		//Implementar logica!!!
	},
	'keystroke': function(message, sender, sendResponse, serverConfig){
		sendAjaxRequest({
			method: 'POST',
			url: serverConfig.serverBaseUrl + serverConfig.keystroke.route,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data: {
				browser : serverConfig.browser,
				pageUrl: sender.tab.url,
				pageTitle: sender.tab.title,
				keyValue: message.pressedKey,
				captureTimestamp: message.captureTimestamp 
			}
		},function(success){
			console.log(success.response);
		}, function(error){
			serverError(error);
		});
	},
	'mouseMove': function(message, sender, sendResponse, serverConfig){
		sendAjaxRequest({
			method: 'POST',
			url: serverConfig.serverBaseUrl + serverConfig.mouseMove.route,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data: {
				browser: serverConfig.browser,
				pageUrl: sender.tab.url,
				pageTitle: sender.tab.title,
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
		}, function(success){
			console.log(success.response);
		}, function(error){
			serverError(error);
		});
	},
	'mouseClick': function(message, sender, sendResponse, serverConfig){
		sendAjaxRequest({
			method: 'POST',
			url: serverConfig.serverBaseUrl + serverConfig.mouseClick.route,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data: {
				browser: serverConfig.browser,
				pageUrl: sender.tab.url,
				pageTitle: sender.tab.title,
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
		}, function(success){

		}, function(error){
			serverError(error);
		});
	},
	'mouseUp': function(message, sender, sendResponse, serverConfig){
		sendAjaxRequest({
			method: 'POST',
			url: serverConfig.serverBaseUrl + serverConfig.mouseUp.route,
			headers:{
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data:{
				browser: serverConfig.browser,
				pageUrl: sender.tab.url,
				pageTitle: sender.tab.title,
				selectedText: message.selectedText
			}
		}, function(success){
			console.log(success.response);
		}, function(error){
			serverError(error);
		});
	}
};