/* Asociamos los event handlers a los eventos de click de los botones que se mostrarán
 en el popup*/
configurationButton.addEventListener('click', showConfigurationForm);
configurationSubmitButton.addEventListener('click', saveConfiguration);
captureButton.addEventListener('click', capture);
stopCaptureButton.addEventListener('click', stopCapture);
pauseCaptureButton.addEventListener('click', pauseCapture);