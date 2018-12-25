function showConfigurationForm(){
	captureButton.style.display = 'none';
	captureInitMessage.style.display= 'none';
	configurationInstructionsContainer.style.display='none';
	configurationForm.style.display = 'block';
};

function saveConfiguration(){

	/* Reseteamos errores del formulario */
	var mouseMovesCallbackUrlErrorMessage = document.getElementById('mouse-moves-callback-url-error-message');
	var mouseClicksCallbackUrlErrorMessage = document.getElementById('mouse-clicks-callback-url-error-message');
	var mouseUpsCallbackUrlErrorMessage = document.getElementById('mouse-ups-callback-url-error-message');
	var keystrokesCallbackUrlErrorMessage = document.getElementById('keystrokes-callback-url-error-message');

	mouseMovesCallbackUrlErrorMessage.innerHTML = '';
	mouseMovesCallbackUrlErrorMessage.style.display='none';
	mouseClicksCallbackUrlErrorMessage.innerHTML = '';
	mouseClicksCallbackUrlErrorMessage.style.display='none';
	mouseUpsCallbackUrlErrorMessage.innerHTML = '';
	mouseUpsCallbackUrlErrorMessage.style.display='none';
	keystrokesCallbackUrlErrorMessage.innerHTML = '';
	keystrokesCallbackUrlErrorMessage.style.display='none';


	/*
	Obtenemos los valores de los inputs, limpiandolos y reemplazando la palabra localhost por 127.0.0.1
	, en caso de que sea un patrón de url que comienze con localhost

	var hostIP = document.getElementById('host-ip').value;
	var hostPort = document.getElementById('host-port').value;
	*/
	var selectedBrowser = document.getElementById('browser-select').value;

	var mouseMovesCallbackUrl = document.getElementById('mouse-moves-callback-url').value.trim();
	mouseMovesCallbackUrl = /^(http(s)?:\/\/)?localhost+/gm.test(mouseMovesCallbackUrl) ? mouseMovesCallbackUrl.replace('localhost', '127.0.0.1') : mouseMovesCallbackUrl;

	var mouseClicksCallbackUrl = document.getElementById('mouse-clicks-callback-url').value.trim();
	mouseClicksCallbackUrl = /^(http(s)?:\/\/)?localhost+/gm.test(mouseClicksCallbackUrl) ? mouseClicksCallbackUrl.replace('localhost', '127.0.0.1') : mouseClicksCallbackUrl;

	var mouseUpsCallbackUrl = document.getElementById('mouse-ups-callback-url').value.trim();
	mouseUpsCallbackUrl = /^(http(s)?:\/\/)?localhost+/gm.test(mouseUpsCallbackUrl) ? mouseUpsCallbackUrl.replace('localhost', '127.0.0.1') : mouseUpsCallbackUrl;
	
	var keystrokesCallbackUrl = document.getElementById('keystrokes-callback-url').value.trim();
	keystrokesCallbackUrl = /^(http(s)?:\/\/)?localhost+/gm.test(keystrokesCallbackUrl) ? keystrokesCallbackUrl.replace('localhost', '127.0.0.1') : keystrokesCallbackUrl;

	/* Validamos los valores de los inputs, mostrando mensajes de error en cada uno,
	segun corresponda
	var invalidHostIp = hostIP === '';
	var invalidHostPort = hostPort === '';
	*/
	var invalidSelectedBrowser = selectedBrowser === '';
	var invalidMouseMovesCallbackUrl =  !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(mouseMovesCallbackUrl);
	var invalidMouseClicksCallbackUrl = !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(mouseClicksCallbackUrl);
	var invalidMouseUpsCallbackUrl = !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(mouseUpsCallbackUrl);
	var invalidKeystrokesCallbackUrl = !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(keystrokesCallbackUrl);


	if(/*invalidHostIp || invalidHostPort || */invalidSelectedBrowser || invalidMouseMovesCallbackUrl ||
		invalidMouseClicksCallbackUrl || invalidMouseUpsCallbackUrl || invalidKeystrokesCallbackUrl){

		/*
		if(invalidHostIp){
			document.getElementById('host-ip-error-message').innerHTML = chrome?
			 chrome.i18n.getMessage('hostIpErrorMessage') : browser.i18n.getMessage('hostIpErrorMessage');
		}

		if(invalidHostPort){
			document.getElementById('host-port-error-message').innerHTML = chrome?
			 chrome.i18n.getMessage('hostPortErrorMessage') : browser.i18n.getMessage('hostPortErrorMessage');
	    }
	    */

		if(invalidSelectedBrowser){
		}

		if(invalidMouseMovesCallbackUrl){
			mouseMovesCallbackUrlErrorMessage.innerHTML = chrome?
			 chrome.i18n.getMessage('mouseMovesCallbackUrlErrorMessage') : browser.i18n.getMessage('mouseMovesCallbackUrlErrorMessage');
			 mouseMovesCallbackUrlErrorMessage.style.display='block';	
		}

		if(invalidMouseClicksCallbackUrl){
			mouseClicksCallbackUrlErrorMessage.innerHTML = chrome?
			 chrome.i18n.getMessage('mouseClicksCallbackUrlErrorMessage') : browser.i18n.getMessage('mouseClicksCallbackUrlErrorMessage');
			 mouseClicksCallbackUrlErrorMessage.style.display='block';
		}

		if(invalidMouseUpsCallbackUrl){
			mouseUpsCallbackUrlErrorMessage.innerHTML = chrome?
			 chrome.i18n.getMessage('mouseUpsCallbackUrlErrorMessage') : browser.i18n.getMessage('mouseUpsCallbackUrlErrorMessage');
			mouseUpsCallbackUrlErrorMessage.style.display='block';
		}

		if(invalidKeystrokesCallbackUrl){
			keystrokesCallbackUrlErrorMessage.innerHTML = chrome?
			 chrome.i18n.getMessage('keystrokesCallbackUrlErrorMessage') : browser.i18n.getMessage('keystrokesCallbackUrlErrorMessage');
			keystrokesCallbackUrlErrorMessage.style.display='block';
		}
		return;
	}

	/* Si pasamos la validación, guardamos la configuración de conexión al servidores/servidores.*/
	var configurationObject = {
		/*host: hostIP,
		port: hostPort,
		*/
		browser: selectedBrowser,
		mouseMovesCallbackUrl: mouseMovesCallbackUrl,
		mouseClicksCallbackUrl: mouseClicksCallbackUrl,
		mouseUpsCallbackUrl: mouseUpsCallbackUrl,
		keystrokesCallbackUrl: keystrokesCallbackUrl
	};

	if(chrome){
		chrome.storage.local.set({httpsConfiguration: configurationObject}, function (){
			chrome.storage.local.set({serverError: false}, function(){
				captureInitMessage.style.display = 'none';
				captureButton.style.display = 'block';
				configurationInstructionsContainer.style.display='none';
				configurationForm.style.display = 'none';
			});
		});
	}
	
	else{
		browser.storage.local.set({httpsConfiguration: configurationObject}, function (){
			browser.storage.local.set({serverError: false}, function(){
				captureInitMessage.style.display = 'none';
				captureButton.style.display = 'block';
				configurationInstructionsContainer.style.display='none';
				configurationForm.style.display = 'none';
			});
		});
	}
};


function capture(){
	if(chrome){
		chrome.storage.local.set({capturing: true}, function (){
			captureButton.style.display = 'none';
			captureInitMessage.style.display = 'block';
			stopCaptureButton.style.display = 'block';
			chrome.storage.local.set({serverError: false}, function(){

			});
		});
	}
	else{
		browser.storage.local.set({capturing: true}, function (){
			captureButton.style.display = 'none';
			captureInitMessage.style.display = 'block';
			stopCaptureButton.style.display = 'block';
			browser.storage.local.set({serverError: false}, function(){

			});
		});
	}
};

function stopCapture(){
	if(chrome){
		chrome.storage.local.set({capturing: false}, function(){
			captureButton.style.display = 'block';
			captureInitMessage.style.display = 'none';
			stopCaptureButton.style.display = 'none';
		});
	}
	else{
		browser.storage.local.set({capturing: false}, function(){
			captureButton.style.display = 'block';
			captureInitMessage.style.display = 'none';
			stopCaptureButton.style.display = 'none';
		});
	}
};