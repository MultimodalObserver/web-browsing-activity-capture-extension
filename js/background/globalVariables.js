/* Variables globales, compartidas y utilizadas por todos los demás scripts de background*/
var currentBrowser = chrome ? chrome : browser;

function getQuery(url){
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    if(qs[0] === url){
        return null;
    }
    var result = {};
    for (var i = 0; i < qs.length; i++) {
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}