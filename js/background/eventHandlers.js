function sendTab(tab, type){
    if(tab.status !== 'complete'){
        return;
    }
    var tabObject = {
        action: "tab",
        type: type,
        index: tab.index,
        windowId: tab.windowId,
        highlighted: tab.highlighted,
        active: tab.active,
        incognito: tab.incognito,
        width: tab.width,
        height: tab.height,
        url: tab.url,
        title: tab.title,
        status: tab.status,
        pinned: tab.pinned,
        audible: tab.audible,
        discarded: tab.discarded,
    };
    currentBrowser.storage.local.get(['capturing'], function(storageCaptureResult){
        if(!storageCaptureResult.capturing){
            return;
        }
        currentBrowser.storage.local.get(['httpsConfiguration'], function(configResult){
            if(!configResult.httpsConfiguration){
                return;
            }
            var throttledFunction = throttle(messagesActionsMap[tabObject.action],
                configResult.httpsConfiguration[tabObject.action].throttle * 1000);
            throttledFunction(tabObject, configResult.httpsConfiguration);
        });
    });
}

function sendTabUpdate(tab){
    sendTab(tab, 'update');
}

function sendTabCreated(tab){
    sendTab(tab, 'created');
}

function sendTabClosed(tab){
    sendTab(tab, 'closed');
}