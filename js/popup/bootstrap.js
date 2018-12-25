/* Inicializamos los textos y display de los elementos, segun el locale actual y el navegador*/
if(chrome){
	configurationButton.innerHTML = chrome.i18n.getMessage("configurationButtonText");
	/*hostIPLabel.innerHTML = chrome.i18n.getMessage("hostNameLabelText");
	hostPortLabel.innerHTML = chrome.i18n.getMessage("hostPortLabelText");*/
	configurationSubmitButton.innerHTML = chrome.i18n.getMessage("configurationSubmitButtonText");
	captureButton.innerHTML =  chrome.i18n.getMessage("captureButtonText");
	captureInitMessage.innerHTML = chrome.i18n.getMessage("captureInitMessage");
	stopCaptureButton.innerHTML = chrome.i18n.getMessage("stopCaptureButtonText");
	browserSelectLabel.innerHTML = chrome.i18n.getMessage("browserSelectLabelText");
	mouseMovesCallbackUrlLabel.innerHTML = chrome.i18n.getMessage("mouseMovesCallbackUrlLabelText");
	mouseClicksCallbackUrlLabel.innerHTML = chrome.i18n.getMessage("mouseClicksCallbackUrlLabelText");
	mouseUpsCallbackUrlLabel.innerHTML = chrome.i18n.getMessage("mouseUpsCallbackUrlLabelText");
	keystrokesCallbackUrlLabel.innerHTML = chrome.i18n.getMessage("keystrokesCallbackUrlLabelText");


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
}
else{
	configurationButton.innerHTML = browser.i18n.getMessage("configurationButtonText");
	/*hostIPLabel.innerHTML = browser.i18n.getMessage("hostNameLabelText");
	hostPortLabel.innerHTML = browser.i18n.getMessage("hostPortLabelText");
	*/
	configurationSubmitButton.innerHTML = browser.i18n.getMessage("configurationSubmitButtonText");
	captureButton.innerHTML =  browser.i18n.getMessage("captureButtonText");
	captureInitMessage.innerHTML = browser.i18n.getMessage("captureInitMessage");
	stopCaptureButton.innerHTML = browser.i18n.getMessage("stopCaptureButtonText");
	browser.storage.local.get(['httpsConfiguration'], function(result){
		browser.storage.local.get(['capturing'], function(res){
			browser.storage.local.get(['serverError'], function (re){
				captureButton.style.display = result.httpsConfiguration && !res.capturing && !re.serverError? 'block' : 'none';
				captureInitMessage.style.display = result.httpsConfiguration  && res.capturing && !re.serverError? 'block': 'none';
				stopCaptureButton.style.display = result.httpsConfiguration  && res.capturing && !re.serverError? 'block': 'none';
				configurationInstructions.innerHTML = re.serverError? browser.i18n.getMessage("serverErrorMessage") 
				: browser.i18n.getMessage("configurationInstructionsMessage");
				configurationInstructionsContainer.style.display = !result.httpsConfiguration || re.serverError? 'block' : 'none';
				configurationForm.style.display = 'none';
			});
		});
	});
}