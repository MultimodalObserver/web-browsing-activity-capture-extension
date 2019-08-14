
function showConfigurationForm() {
    captureButton.style.display = 'none';
    captureInitMessage.style.display = 'none';
    configurationInstructionsContainer.style.display = 'none';
    configurationForm.style.display = 'block';
}

function saveConfiguration() {

    var configurationObject = {};
    /* Reseteamos errores del formulario */
    var serverUrlErrorMessage = document.getElementById('server-url-error-message');
    var mouseMovesCallbackUrlErrorMessage = document.getElementById('mouse-moves-callback-url-error-message');
    var mouseClicksCallbackUrlErrorMessage = document.getElementById('mouse-clicks-callback-url-error-message');
    var mouseUpsCallbackUrlErrorMessage = document.getElementById('mouse-ups-callback-url-error-message');
    var keystrokesCallbackUrlErrorMessage = document.getElementById('keystrokes-callback-url-error-message');
    var tabsCallbackUrlErrorMessage = document.getElementById('tabs-callback-url-error-message');
    var searchsCallbackUrlErrorMessage = document.getElementById('searchs-callback-url-error-message');
    var mouseMovesThrottleErrrorMessage = document.getElementById('mouse-moves-throttle-error-message');
    var mouseClicksThrottleErrrorMessage = document.getElementById('mouse-clicks-throttle-error-message');
    var mouseUpsThrottleErrrorMessage = document.getElementById('mouse-ups-throttle-error-message');
    var keystrokesThrottleErrrorMessage = document.getElementById('keystrokes-throttle-error-message');
    var tabsThrottleErrrorMessage = document.getElementById('tabs-throttle-error-message');
    var searchsThrottleErrrorMessage = document.getElementById('searchs-throttle-error-message');


    /* MOuse moves*/
    mouseMovesCallbackUrlErrorMessage.innerHTML = '';
    mouseMovesCallbackUrlErrorMessage.style.display = 'none';
    mouseMovesThrottleErrrorMessage.innerHTML = '';
    mouseMovesThrottleErrrorMessage.style.display = 'none';
    /* Mouse Clicks*/
    mouseClicksCallbackUrlErrorMessage.innerHTML = '';
    mouseClicksCallbackUrlErrorMessage.style.display = 'none';
    mouseClicksThrottleErrrorMessage.innerHTML = '';
    mouseClicksThrottleErrrorMessage.style.display = 'none';
    /* Mouse Ups*/
    mouseUpsCallbackUrlErrorMessage.innerHTML = '';
    mouseUpsCallbackUrlErrorMessage.style.display = 'none';
    mouseUpsThrottleErrrorMessage.innerHTML = '';
    mouseUpsThrottleErrrorMessage.style.display = 'none';
    /*Keystrokes*/
    keystrokesCallbackUrlErrorMessage.innerHTML = '';
    keystrokesCallbackUrlErrorMessage.style.display = 'none';
    keystrokesThrottleErrrorMessage.innerHTML = '';
    keystrokesThrottleErrrorMessage.style.display = 'none';
    /* Server URl*/
    serverUrlErrorMessage.innerHTML = '';
    serverUrlErrorMessage.style.display = 'none';
    /* Tabs*/
    tabsCallbackUrlErrorMessage.innerHTML = '';
    tabsCallbackUrlErrorMessage.style.display = 'none';
    tabsThrottleErrrorMessage.innerHTML = '';
    tabsThrottleErrrorMessage.style.display = 'none';
    /* Searchs*/
    searchsCallbackUrlErrorMessage.innerHTML = '';
    searchsCallbackUrlErrorMessage.style.display = '';
    searchsThrottleErrrorMessage.innerHTML = '';
    searchsThrottleErrrorMessage.style.display = 'none';


    /*
    Obtenemos los valores de los inputs, limpiandolos y reemplazando la palabra localhost por 127.0.0.1
    , en caso de que sea un patrón de url que comienze con localhost
    */
    var selectedBrowser = document.getElementById('browser-select').value;
    var serverUrl = document.getElementById('server-url').value.trim().replace('localhost', '127.0.0.1');
    var mouseMovesCallbackUrl = document.getElementById('mouse-moves-callback-url').value.trim();
    var mouseClicksCallbackUrl = document.getElementById('mouse-clicks-callback-url').value.trim();
    var mouseUpsCallbackUrl = document.getElementById('mouse-ups-callback-url').value.trim();
    var keystrokesCallbackUrl = document.getElementById('keystrokes-callback-url').value.trim();
    var tabsCallbackUrl = document.getElementById('tabs-callback-url').value.trim();
    var searchsCallbackUrl = document.getElementById('searchs-callback-url').value.trim();
    var mouseMovesThrottle = document.getElementById('mouse-moves-throttle').value.trim();
    var mouseClicksThrottle = document.getElementById('mouse-clicks-throttle').value.trim();
    var mouseUpsThrottle = document.getElementById('mouse-ups-throttle').value.trim();
    var keystrokesThrottle = document.getElementById('keystrokes-throttle').value.trim();
    var tabsThrottle = document.getElementById('tabs-throttle').value.trim();
    var searchsThrottle = document.getElementById('searchs-throttle').value.trim();


    /* Validamos los valores de los inputs, mostrando mensajes de error en cada uno,
    segun corresponda
    */
    var invalidServerUrl = !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(serverUrl);
    var invalidSelectedBrowser = selectedBrowser === '';
    var invalidMouseMovesCallbackUrl = mouseMovesCallbackUrl === '';
    var invalidMouseClicksCallbackUrl = mouseClicksCallbackUrl === '';
    var invalidMouseUpsCallbackUrl = mouseUpsCallbackUrl === '';
    var invalidKeystrokesCallbackUrl = keystrokesCallbackUrl === '';
    var invalidTabsCallbackUrl = tabsCallbackUrl === '';
    var invalidSearchsCallbackUrl = searchsCallbackUrl === '';
    var invalidMouseMovesThrottle = mouseMovesThrottle === '' || mouseMovesThrottle < 0;
    var invalidMouseClicksThrottle = mouseClicksThrottle === '' || mouseClicksThrottle < 0;
    var invalidMouseUpsThrottle = mouseUpsThrottle === '' || mouseUpsThrottle < 0;
    var invalidKeystrokesThrottle = keystrokesThrottle === '' || keystrokesThrottle < 0;
    var invalidTabsThrottle = tabsThrottle === '' || tabsThrottle < 0;
    var invalidSearchsThrottle = searchsThrottle === '' || searchsThrottle < 0;
    var hasError = invalidServerUrl || invalidSelectedBrowser || invalidMouseMovesCallbackUrl || invalidMouseClicksCallbackUrl
        || invalidMouseUpsCallbackUrl || invalidKeystrokesCallbackUrl || invalidTabsCallbackUrl || invalidSearchsCallbackUrl
        || invalidMouseMovesThrottle || invalidMouseClicksThrottle || invalidMouseUpsThrottle || invalidKeystrokesThrottle || invalidTabsThrottle
        || invalidSearchsThrottle;
    if(hasError){
        if(invalidServerUrl){
            serverUrlErrorMessage.innerHTML = currentBrowser.i18n.getMessage("serverUrlErrorText");
            serverUrlErrorMessage.style.display='block';
        }
        if (invalidMouseMovesCallbackUrl) {
            mouseMovesCallbackUrlErrorMessage.innerHTML = currentBrowser.i18n.getMessage('invalidRouteText');
            mouseMovesCallbackUrlErrorMessage.style.display = 'block';
        }
        if (invalidMouseClicksCallbackUrl) {
            mouseClicksCallbackUrlErrorMessage.innerHTML = currentBrowser.i18n.getMessage('invalidRouteText');
            mouseClicksCallbackUrlErrorMessage.style.display = 'block';
        }
        if (invalidMouseUpsCallbackUrl) {
            mouseUpsCallbackUrlErrorMessage.innerHTML = currentBrowser.i18n.getMessage('invalidRouteText');
            mouseUpsCallbackUrlErrorMessage.style.display = 'block';
        }
        if (invalidKeystrokesCallbackUrl) {
            keystrokesCallbackUrlErrorMessage.innerHTML = currentBrowser.i18n.getMessage('invalidRouteText');
            keystrokesCallbackUrlErrorMessage.style.display = 'block';
        }
        if(invalidTabsCallbackUrl){
            tabsCallbackUrlErrorMessage.innerHTML = currentBrowser.i18n.getMessage('invalidRouteText');
            tabsCallbackUrlErrorMessage.style.display = 'block';
        }
        if(invalidSearchsCallbackUrl){
            searchsCallbackUrlErrorMessage.innerHTML = currentBrowser.i18n.getMessage('invalidRouteText');
            searchsCallbackUrlErrorMessage.style.display = 'block';
        }
        if(invalidMouseMovesThrottle){
            mouseMovesThrottleErrrorMessage.innerHTML = currentBrowser.i18n.getMessage('invalidThrottleText');
            mouseMovesThrottleErrrorMessage.style.display = 'block';
        }
        if(invalidMouseClicksThrottle){
            mouseClicksThrottleErrrorMessage.innerHTML = currentBrowser.i18n.getMessage('invalidThrottleText');
            mouseClicksThrottleErrrorMessage.style.display = 'block';
        }
        if(invalidMouseUpsThrottle){
            mouseUpsThrottleErrrorMessage.innerHTML = currentBrowser.i18n.getMessage('invalidThrottleText');
            mouseUpsThrottleErrrorMessage.style.display = 'block';
        }
        if(invalidKeystrokesThrottle){
            keystrokesThrottleErrrorMessage.innerHTML = currentBrowser.i18n.getMessage('invalidThrottleText');
            keystrokesThrottleErrrorMessage.style.display = 'block';
        }
        if(invalidTabsThrottle){
            tabsThrottleErrrorMessage.innerHTML = currentBrowser.i18n.getMessage('invalidThrottleText');
            tabsThrottleErrrorMessage.style.display = 'block';
        }
        if(invalidSearchsThrottle){
            searchsThrottleErrrorMessage.innerHTML = currentBrowser.i18n.getMessage('invalidThrottleText');
            searchsThrottleErrrorMessage.style.display = 'block';
        }
        return;
    }

    /* Si pasamos la validación, guardamos la configuración de conexión al servidores/servidores.*/
    configurationObject = {
        browser: selectedBrowser,
        serverBaseUrl: serverUrl,
        mouseMove:{
            'route': mouseMovesCallbackUrl,
            'throttle': mouseMovesThrottle
        },
        mouseClick:{
            'route': mouseClicksCallbackUrl,
            'throttle': mouseClicksThrottle
        },
        mouseUp:{
            'route': mouseUpsCallbackUrl,
            'throttle': mouseUpsThrottle
        },
        keystroke:{
            'route': keystrokesCallbackUrl,
            'throttle': keystrokesThrottle
        },
        tab:{
            'route': tabsCallbackUrl,
            'throttle': tabsThrottle
        },
        search:{
            'route': searchsCallbackUrl,
            'throttle': searchsThrottle
        }
    };

    currentBrowser.storage.local.set({httpsConfiguration: configurationObject}, function () {
        currentBrowser.storage.local.set({serverError: false}, function () {
            captureInitMessage.style.display = 'none';
            captureButton.style.display = 'block';
            configurationInstructionsContainer.style.display = 'none';
            configurationForm.style.display = 'none';
        });
    });
}


function capture() {
    /* Aqui debemos hacer la peticion al endpoint start del servidor JAVA*/
    sendAjaxRequest({
        method: "POST",
        url: 'http://localhost:8000/start',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
            'client-key': 'example-key'
        },
    }, function (success) {
        currentBrowser.storage.local.set({capturing: true}, function () {
            captureButton.style.display = 'none';
            captureInitMessage.style.display = 'block';
            stopCaptureButton.style.display = 'block';
            currentBrowser.storage.local.set({serverError: false}, function () {

            });
        });
    }, function (error) {
        serverError(error);
    });
}

function stopCapture() {
    currentBrowser.storage.local.set({capturing: false}, function () {
        captureButton.style.display = 'block';
        captureInitMessage.style.display = 'none';
        stopCaptureButton.style.display = 'none';
    });
}