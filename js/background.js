chrome.runtime.onInstalled.addListener(function() {
    console.log("inicializando extension");
});

/* Este script lo que hace es:

- Escuchar constantemente cuando se visita una nueva url, con el fin de mantener la extensión activa,
ya que usamos el modelo de script background no persistente, es decir, si no se ejecuta un evento,
de los escuchados, en cierto tiempo, el script no se ejecuta, por tanto de esta forma lo 
tendremos activo cada vez que se acceda a una nueva url, y se hará el request al servidor, sin 
importar el tiempo de inactividad del usuario de la extensión.

- Cuando se accede a una nueva url, si se ha seteado el modo de captura en la extensión,
procesamos ese item de history, agregandole las visitas correspondientes, y luego hacemos
el request al servidor:

	- En caso de que haya error en el servidor, actualizamos el estado de la extension
	para requerir indicar el error de conexión al servidor al usuario de la extensión.

*/

var buildData = function(historyItem, callback){
			chrome.history.getVisits({url: historyItem.url}, function(results){
				historyItem['visits'] = results;
				callback(historyItem);
			})
		};

var sendData = function(buildDataResult){
	chrome.storage.local.get(['httpsConfiguration'], function(storageConfigResult){
		var url = 'http://' + storageConfigResult.httpsConfiguration.host +
		 ':'+storageConfigResult.httpsConfiguration.port + '/';
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(buildDataResult)
		}).then(res => {
			console.log("Response", res);
		}).catch(error => {
			chrome.storage.local.set({serverError : true}, function(){
				chrome.storage.local.set({capturing: false}, function (){

				});
			});
		});
	});
};

chrome.history.onVisited.addListener(function(historyResult){
	chrome.storage.local.get(['capturing'], function(storageCaptureResult){

		if(!storageCaptureResult.capturing){
			return;
		}

		buildData(historyResult, sendData);
	});
});