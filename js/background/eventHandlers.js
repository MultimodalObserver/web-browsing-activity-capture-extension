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
        tabUrl: tab.url,
        tabTitle: tab.title,
        actionType: 'updated',
        tabIndex: tab.index,
        tabId: tab.id,
        windowId: tab.windowId/*,
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
        discarded: tab.discarded,*/
    };
    sendTab(updatedTabObject);
}

function sendTabCreated(tab){
    var tabObject = {
        action: 'tab',
        tabUrl: tab.url,
        tabTitle: tab.title,
        actionType: 'created',
        tabIndex: tab.index,
        tabId: tab.id,
        windowId: tab.windowId/*,
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
        discarded: tab.discarded*/
    };
    sendTab(tabObject);
}

function sendTabClosed(tabId, removeinfo){
    var closedTabObject= {
        action: 'tab',
        tabUrl: '-',
        tabTitle: '-',
        actionType: 'closed',
        tabIndex: -1,
        tabId: tabId,
        windowId: removeinfo.windowId/*,
        isWindowClosing: removeinfo.isWindowClosing*/
    };
    sendTab(closedTabObject);
}