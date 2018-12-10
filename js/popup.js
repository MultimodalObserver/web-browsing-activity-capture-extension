var configurationInstructions = document.getElementById('configuration-instructions-container');
var configurationForm = document.getElementById('configuration-form-container');
var captureMessage = document.getElementById('capture-message');
var captureButton = document.getElementById('capture-button');

/* Cada vez que se clickee el icono de la extension, se ejecutará el código de este archivo de este archivo

Vemos si es que está asignada la configuración al servidor HTTPS:

	- Si está, mostramos lo que por defecto se muestra en el html, que es el mensaje de estado de la
	 extension.

	- Si no está, habilitamos las instrucciones de configuración, que en caso de ser presionado
	el botón para configurar, habilitará el formulario de configuración con su respectiva
	funcionalidad.

*/
chrome.storage.local.get(['httpsConfiguration'], function(result){
	chrome.storage.local.get(['capturing'], function(res){
		console.log("capturing", res.capturing);
		console.log("httpsConfiguration", result.httpsConfiguration);
		captureButton.style.display = result.httpsConfiguration && !res.capturing? 'block' : 'none';
		captureMessage.style.display = result.httpsConfiguration  && res.capturing? 'block': 'none';
		configurationInstructions.style.display = !result.httpsConfiguration? 'block' : 'none';
		configurationForm.style.display = 'none';
	});
});

var showConfigurationForm = function(){
	captureButton.style.display = 'none';
	captureMessage.style.display= 'none';
	configurationInstructions.style.display='none';
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
		captureMessage.style.display = 'none';
		captureButton.style.display = 'block';
		configurationInstructions.style.display='none';
		configurationForm.style.display = 'none';

	});
};


var capture = function(){
	chrome.storage.local.set({capturing: true}, function (){
		captureButton.style.display = 'none';
		captureMessage.style.display = 'block';
	});
};


document.getElementById('configuration-button').addEventListener('click', showConfigurationForm);
document.getElementById('configuration-submit-button').addEventListener('click', saveConfiguration);
document.getElementById('capture-button').addEventListener('click', capture);