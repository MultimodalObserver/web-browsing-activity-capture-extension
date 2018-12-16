var configurationInstructionsContainer = document.getElementById('configuration-instructions-container');
var configurationForm = document.getElementById('configuration-form-container');
var captureInitMessage = document.getElementById('capture-message');
var captureButton = document.getElementById('capture-button');
var stopCaptureButton = document.getElementById('stop-capture-button');
var configurationButton = document.getElementById('configuration-button');
var configurationInstructions = document.getElementById('configuration-instructions');
var hostIPLabel = document.getElementById('host-ip-label');
var hostPortLabel = document.getElementById('host-port-label');
var configurationSubmitButton = document.getElementById('configuration-submit-button');

/* Inicializamos los textos de los elementos, segun el locale actual*/
configurationButton.innerHTML = chrome.i18n.getMessage("configurationButtonText");
hostIPLabel.innerHTML = chrome.i18n.getMessage("hostNameLabelText");
hostPortLabel.innerHTML = chrome.i18n.getMessage("hostPortLabelText");
configurationSubmitButton.innerHTML = chrome.i18n.getMessage("configurationSubmitButtonText");
captureButton.innerHTML =  chrome.i18n.getMessage("captureButtonText");
captureInitMessage.innerHTML = chrome.i18n.getMessage("captureInitMessage");
stopCaptureButton.innerHTML = chrome.i18n.getMessage("stopCaptureButtonText");



chrome.storage.local.get(['httpsConfiguration'], function(result){
	chrome.storage.local.get(['capturing'], function(res){
		chrome.storage.local.get(['serverError'], function (re){
			captureButton.style.display = result.httpsConfiguration && !res.capturing && !re.serverError? 'block' : 'none';
			captureInitMessage.style.display = result.httpsConfiguration  && res.capturing && !re.serverError? 'block': 'none';
			stopCaptureButton.style.display = result.httpsConfiguration  && res.capturing && !re.serverError? 'block': 'none';
			configurationInstructions.innerHTML = re.serverError? chrome.i18n.getMessage("serverErrorMessage") 
			: chrome.i18n.getMessage("configurationInstructionsMessage");
			configurationInstructionsContainer.style.display = !result.httpsConfiguration || re.serverError? 'block' : 'none';
			configurationForm.style.display = 'none';
		});
	});
});

var showConfigurationForm = function(){
	captureButton.style.display = 'none';
	captureInitMessage.style.display= 'none';
	configurationInstructionsContainer.style.display='none';
	configurationForm.style.display = 'block';
};

var saveConfiguration = function(){
	var hostIP = document.getElementById('host-ip').value;
	var hostPort = document.getElementById('host-port').value;
	if(hostIP === ''){
		document.getElementById('host-ip-error-message').innerHTML = "You must enter a host server name  or an IP address";
		return;
	}
	if(hostPort === ''){
		document.getElementById('host-port-error-message').innerHTML = "You must enter a host port number";
		return;
	}

	var configurationObject = {
		host: hostIP,
		port: hostPort
	};

	chrome.storage.local.set({httpsConfiguration: configurationObject}, function (){
		chrome.storage.local.set({serverError: false}, function(){
			captureInitMessage.style.display = 'none';
			captureButton.style.display = 'block';
			configurationInstructionsContainer.style.display='none';
			configurationForm.style.display = 'none';
		});
	});
};


var capture = function(){
	chrome.storage.local.set({capturing: true}, function (){
		captureButton.style.display = 'none';
		captureInitMessage.style.display = 'block';
		stopCaptureButton.style.display = 'block';
		chrome.storage.local.set({serverError: false}, function(){

		});
	});
};

var stopCapture = function(){
	chrome.storage.local.set({capturing: false}, function(){
		captureButton.style.display = 'block';
		captureInitMessage.style.display = 'none';
		stopCaptureButton.style.display = 'none';
	});
};


configurationButton.addEventListener('click', showConfigurationForm);
configurationSubmitButton.addEventListener('click', saveConfiguration);
captureButton.addEventListener('click', capture);
stopCaptureButton.addEventListener('click', stopCapture);