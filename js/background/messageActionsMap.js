/* Variable que almacena un mapa de:

	mensaje recibido de algun tipo de accion: funcion que maneja ese mensaje
	según el tipo de accion capturada que representa.

*/
var messagesActionsMap = {
	'search': function(message, sender, sendResponse, serverConfig){
		var queryParams = getQuery(sender.tab.url);
		if(queryParams === null || queryParams['q'] === 'undefined'){
			return;
		}
		ajaxRequests.push(sendAjaxRequest({
			method: 'POST',
			url: serverConfig.serverBaseUrl + '/' + serverConfig.search.route,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data: {
				browser: serverConfig.browser,
				pageUrl: sender.tab.url,
				pageTitle: sender.tab.title,
				search: queryParams['q'].replace("+", " ")
			}
		}, function(success){
			console.log(success.response);
		}, function(error){
			serverError(error, true);
		}));
	},
	'tab': function(message,serverConfig){
		ajaxRequests.push(sendAjaxRequest({
			method: 'POST',
			url: serverConfig.serverBaseUrl + '/' + serverConfig.tab.route,
			headers:{
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data:{
				browser: serverConfig.browser,
				tabUrl: message.tabUrl,
				tabTitle: message.tabTitle,
				actionType: message.actionType,
				tabIndex: message.tabIndex,
				tabId: message.tabId,
				windowId: message.windowId/*,
				highlighted: message.highlighted,
				active: message.active,
				incognito: message.incognito,
				width: message.width,
				height: message.height,
				url: message.url,
				title: message.title,
				status: message.status,
				pinned: message.pinned,
				audible: message.audible,
				discarded: message.discarded,*/
			}
		}, function(success){
			console.log(success.response);
		}, function(error){
			serverError(error, true);
		}));
	},
	'keystroke': function(message, sender, sendResponse, serverConfig){
		ajaxRequests.push(sendAjaxRequest({
			method: 'POST',
			url: serverConfig.serverBaseUrl + '/' + serverConfig.keystroke.route,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data: {
				browser : serverConfig.browser,
				pageUrl: sender.tab.url,
				pageTitle: sender.tab.title,
				keyValue: message.pressedKey,
			}
		},function(success){
			console.log(success.response);
		}, function(error){
			serverError(error, true);
		}));
	},
	'mouseMove': function(message, sender, sendResponse, serverConfig){
		ajaxRequests.push(sendAjaxRequest({
			method: 'POST',
			url: serverConfig.serverBaseUrl + '/' + serverConfig.mouseMove.route,
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
			}
		}, function(success){
			console.log(success.response);
		}, function(error){
			serverError(error, true);
		}));
	},
	'mouseClick': function(message, sender, sendResponse, serverConfig){
		ajaxRequests.push(sendAjaxRequest({
			method: 'POST',
			url: serverConfig.serverBaseUrl + '/' + serverConfig.mouseClick.route,
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
				button: message.button
			}
		}, function(success){

		}, function(error){
			serverError(error, true);
		}));
	},
	'mouseUp': function(message, sender, sendResponse, serverConfig){
		ajaxRequests.push(sendAjaxRequest({
			method: 'POST',
			url: serverConfig.serverBaseUrl + '/' + serverConfig.mouseUp.route,
			headers:{
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data:{
				browser: serverConfig.browser,
				pageUrl: sender.tab.url,
				pageTitle: sender.tab.title,
				selectedText: message.selectedText,
			}
		}, function(success){
			console.log(success.response);
		}, function(error){
			serverError(error, true);
		}));
	}
};