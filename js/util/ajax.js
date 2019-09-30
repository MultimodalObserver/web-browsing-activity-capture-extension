function sendAjaxRequest(config, successCallback, errorCallback){
	if(!config.url){
		console.error("Configuration must include a url");
		return;
	}
	if(config.method !== 'POST' && config.method !== 'GET'){
		console.error("POST and GET are the only http methods supported by now");
		return;
	}
	var ajaxRequest = new XMLHttpRequest();
	ajaxRequest.onreadystatechange = function() {
		console.log("on ready", ajaxRequest);
		if (ajaxRequest.readyState === 4) {
			if(ajaxRequest.status >= 100 && ajaxRequest.status < 300){
				successCallback({
					'status': {
						'code': ajaxRequest.status,
						'message': ajaxRequest.statusText
					},
					'response': ajaxRequest.responseText
				});
			}
			else{
				errorCallback({
					'status': {
						'code': ajaxRequest.status,
						'message': ajaxRequest.statusText
					},
					'response':ajaxRequest.responseText 
				});
			}
		}
	};
	ajaxRequest.open(config.method, config.url, true);
	if(config.headers){
		for(var header in config.headers){
			ajaxRequest.setRequestHeader(header, config.headers[header]);
		}
	}
	if(config.method === 'POST'){
		if(!config.data){
			console.error("The POST body data must be provided");
			return;
		}
		ajaxRequest.send(JSON.stringify(config.data));	
	}
	else{
		ajaxRequest.send();
	}
	return ajaxRequest;
}
