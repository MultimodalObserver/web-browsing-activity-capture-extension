var execute = document.getElementById('execute-container');
var configurationInstructions = document.getElementById('configuration-instructions-container');
var configurationForm = document.getElementById('configuration-form-container');

/* Cada vez que se clickee el icono de la extension, se ejecutará el código de este archivo de este archivo

Vemos si es que está asignada la configuración al servidor HTTPS:

	- Si está, mostramos lo que por defecto se muestra en el html, que es el mensaje de estado de la
	 extension.

	- Si no está, habilitamos las instrucciones de configuración, que en caso de ser presionado
	el botón para configurar, habilitará el formulario de configuración con su respectiva
	funcionalidad.

*/
chrome.storage.local.get(['httpsConfiguration'], function(result){
	if(result.httpsConfiguration){
		execute.style.display='block';
		configurationInstructions.style.display = 'none';
		configurationForm.style.display = 'none';
		return;
	}
	execute.style.display='none';
	configurationInstructions.style.display = 'block';
	configurationForm.style.display = 'none';


});

var showConfigurationForm = function(){
	execute.style.display = 'none';
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
		execute.style.display = 'block';
		configurationInstructions.style.display='none';
		configurationForm.style.display = 'none';

	});
};

var buildData = function(historyResult, callback){
	chrome.history.getVisits({url: historyResult.url}, function(results){
		historyResult['visits'] = results;
		callback(historyResult);
	})
};

var capture = function(){
	chrome.history.onVisited.addListener(function(result){
		buildData(result, function(buildResult){
			console.log(buildResult);
		});
	});
};

var capture_test = function(){
	chrome.storage.local.set({capture: true}, function (){
	});
}


document.getElementById('configuration-button').addEventListener('click', showConfigurationForm);
document.getElementById('configuration-submit-button').addEventListener('click', saveConfiguration);
document.getElementById('capture-button').addEventListener('click', capture_test);