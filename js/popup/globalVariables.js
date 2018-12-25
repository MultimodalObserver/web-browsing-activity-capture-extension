var configurationInstructionsContainer = document.getElementById('configuration-instructions-container');
var configurationForm = document.getElementById('configuration-form-container');
var captureInitMessage = document.getElementById('capture-message');
var captureButton = document.getElementById('capture-button');
var stopCaptureButton = document.getElementById('stop-capture-button');
var configurationButton = document.getElementById('configuration-button');
var configurationInstructions = document.getElementById('configuration-instructions');
/*var hostIPLabel = document.getElementById('host-ip-label');
var hostPortLabel = document.getElementById('host-port-label');
*/
var configurationSubmitButton = document.getElementById('configuration-submit-button');
var browserSelectLabel = document.getElementById('browser-select-label');
var mouseMovesCallbackUrlLabel = document.getElementById('mouse-moves-callback-url-label');
var mouseClicksCallbackUrlLabel = document.getElementById('mouse-clicks-callback-url-label');
var mouseUpsCallbackUrlLabel = document.getElementById('mouse-ups-callback-url-label');
var keystrokesCallbackUrlLabel = document.getElementById('keystrokes-callback-url-label');

var urlRegEx= /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm