function sendTab(tabObject){
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

function sendTabUpdate(tabId, changeInfo, tab){
    var updatedTabObject = {
        action: 'tab',
        type: 'updated',
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
    sendTab(updatedTabObject);
}

function sendTabCreated(tab){
    var tabObject = {
        action: 'tab',
        type: 'created',
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
    sendTab(tabObject);
}

function sendTabClosed(tabId, removeinfo){
    var closedTabObject= {
        action: 'tab',
        type: 'closed',
        tabId: tabId,
        windowId: removeinfo.windowId,
        isWindowClosing: removeinfo.isWindowClosing
    };
    sendTab(closedTabObject);
}