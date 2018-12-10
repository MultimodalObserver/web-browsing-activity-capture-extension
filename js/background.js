chrome.runtime.onInstalled.addListener(function() {
    console.log("inicializando extension");
});

/* Aqui escuchamos cuando hayan cambiamos en el storage, 
en donde almacenamos la configuracion de la conexion al servidor https montando por el plugin de Java
*/

chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
		if(key === 'capturing' && changes[key].newValue === true){

			var buildData = function(historyResult, callback){
				chrome.history.getVisits({url: historyResult.url}, function(results){
					historyResult['visits'] = results;
					callback(historyResult);
				})
			};

			chrome.history.onVisited.addListener(function(result){
				buildData(result, function(buildResult){	
					chrome.storage.local.get(['httpsConfiguration'], function(result){
						var url = 'http://' + result.httpsConfiguration.host +
						 ':'+result.httpsConfiguration.port + '/capture';
						fetch(url, {
							method: 'POST',
							body: JSON.stringify(buildResult)
						}).then(res => {
							console.log("Response", res);
						}).catch(error => {
							console.error('Error:', error);
						});
					});
				});
			});
		}
		/*
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
                      */
    }
});