function showConfigurationForm(){
	captureButton.style.display = 'none';
	captureInitMessage.style.display= 'none';
	configurationInstructionsContainer.style.display='none';
	configurationForm.style.display = 'block';
};

function saveConfiguration(){

	var hostIP = document.getElementById('host-ip').value;
	var hostPort = document.getElementById('host-port').value;
	var selectedBrowser = document.getElementById('browser-select').value;
	var mouseMovesCallbackUrl = document.getElementById('mouse-moves-callback-url').value;
	var mouseClicksCallbackUrl = document.getElementById('mouse-clicks-callback-url').value;
	var mouseUpsCallbackUrl = document.getElementById('mouse-ups-callback-url').value;
	var keystrokesCallbackUrl = document.getElementById('keystrokes-callback-url').value;

	if(hostIP === '' || hostPort === '' || selectedBrowser === '' || mouseMovesCallbackUrl === ''
		|| mouseClicksCallbackUrl === '' || mouseUpsCallbackUrl === '' || keystrokesCallbackUrl === ''){

		if(hostIP === ''){
			document.getElementById('host-ip-error-message').innerHTML = chrome?
			 chrome.i18n.getMessage('hostIpErrorMessage') : browser.i18n.getMessage('hostIpErrorMessage');
		}

		if(hostPort === ''){
			document.getElementById('host-port-error-message').innerHTML = chrome?
			 chrome.i18n.getMessage('hostPortErrorMessage') : browser.i18n.getMessage('hostPortErrorMessage');
	    }

		if(selectedBrowser === ''){
		}

		if(mouseMovesCallbackUrl === ''){
			document.getElementById('mouse-moves-callback-url-error-message').innerHTML = chrome?
			 chrome.i18n.getMessage('mouseMovesCallbackUrlErrorMessage') : browser.i18n.getMessage('mouseMovesCallbackUrlErrorMessage');	
		}

		if(mouseClicksCallbackUrl === ''){
			document.getElementById('mouse-clicks-callback-url-error-message').innerHTML = chrome?
			 chrome.i18n.getMessage('mouseClicksCallbackUrlErrorMessage') : browser.i18n.getMessage('mouseClicksCallbackUrlErrorMessage');
		}

		if(mouseUpsCallbackUrl === ''){
			document.getElementById('mouse-ups-callback-url-error-message').innerHTML = chrome?
			 chrome.i18n.getMessage('mouseUpsCallbackUrlErrorMessage') : browser.i18n.getMessage('mouseUpsCallbackUrlErrorMessage');
		}

		if(keystrokesCallbackUrl === ''){
			document.getElementById('keystrokes-callback-url-error-message').innerHTML = chrome?
			 chrome.i18n.getMessage('keystrokesCallbackUrlErrorMessage') : browser.i18n.getMessage('keystrokesCallbackUrlErrorMessage');
		}
		return;
	}

	var configurationObject = {
		host: hostIP,
		port: hostPort,
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