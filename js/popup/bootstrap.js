/* Inicializamos los textos y display de los elementos, segun el locale actual y el navegador*/
configurationButton.innerHTML = currentBrowser.i18n.getMessage("configurationButtonText");
configurationSubmitButton.innerHTML = currentBrowser.i18n.getMessage("configurationSubmitButtonText");
captureButton.innerHTML =  currentBrowser.i18n.getMessage("captureButtonText");
captureInitMessage.innerHTML = currentBrowser.i18n.getMessage("captureInitMessage");
stopCaptureButton.innerHTML = currentBrowser.i18n.getMessage("stopCaptureButtonText");
pauseCaptureButton.innerHTML = currentBrowser.i18n.getMessage("pauseCaptureButtonText");
//browserSelectLabel.innerHTML = currentBrowser.i18n.getMessage("browserSelectLabelText");
mouseMovesCallbackUrlLabel.innerHTML = currentBrowser.i18n.getMessage("routeText");
mouseClicksCallbackUrlLabel.innerHTML = currentBrowser.i18n.getMessage("routeText");
mouseUpsCallbackUrlLabel.innerHTML = currentBrowser.i18n.getMessage("routeText");
keystrokesCallbackUrlLabel.innerHTML = currentBrowser.i18n.getMessage("routeText");
tabsCallbackUrlLabel.innerHTML = currentBrowser.i18n.getMessage("routeText");
searchsCallbackUrlLabel.innerHTML = currentBrowser.i18n.getMessage("routeText");
mouseMovesActionTitle.innerHTML = currentBrowser.i18n.getMessage("mouseMovesActionTitleText");
mouseClicksActionTitle.innerHTML = currentBrowser.i18n.getMessage("mouseClicksActionTitleText");
mouseUpsActionTitle.innerHTML = currentBrowser.i18n.getMessage("mouseUpsActionTitleText");
keystrokesActionTitle.innerHTML = currentBrowser.i18n.getMessage("keystrokesActionTitleText");
tabsActionTitle.innerHTML = currentBrowser.i18n.getMessage('tabsActionTitleText');
searchsActionTitle.innerHTML = currentBrowser.i18n.getMessage('searchsActionTitleText');
serverUrlLabel.innerHTML = currentBrowser.i18n.getMessage("serverUrlLabelText");
mouseMovesThrottleLabel.innerHTML = currentBrowser.i18n.getMessage('throttleText');
mouseClicksThrottleLabel.innerHTML = currentBrowser.i18n.getMessage('throttleText');
mouseUpsThrottleLabel.innerHTML = currentBrowser.i18n.getMessage('throttleText');
keystrokesThrottleLabel.innerHTML = currentBrowser.i18n.getMessage('throttleText');
tabsThrottleLabel.innerHTML = currentBrowser.i18n.getMessage('throttleText');
searchsThrottleLabel.innerHTML = currentBrowser.i18n.getMessage('throttleText');
serverTitle.innerHTML = currentBrowser.i18n.getMessage('serverTitle');
initCaptureMessage.innerHTML = currentBrowser.i18n.getMessage('initCaptureMessageText');

currentBrowser.storage.local.get(['httpsConfiguration'], function(result){
	currentBrowser.storage.local.get(['capturing'], function(res){
		currentBrowser.storage.local.get(['serverError'], function (re){
			startCaptureLoader.style.display = 'none';
			captureInitContainer.style.display = result.httpsConfiguration && !res.capturing && !re.serverError? 'block' : 'none';
			captureStateContainer.style.display = result.httpsConfiguration  && res.capturing && !re.serverError? 'block': 'none';
			configurationInstructions.innerHTML = re.serverError? currentBrowser.i18n.getMessage("serverErrorMessage")
				: currentBrowser.i18n.getMessage("configurationInstructionsMessage");
			configurationInstructionsContainer.style.display = !result.httpsConfiguration || re.serverError? 'block' : 'none';
			configurationForm.style.display = 'none';
		});
	});
});