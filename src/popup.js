function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    var parURL = new URL(url);
    console.log(url)
    console.log(parURL.protocol, parURL.host, parURL.pathname)

    chrome.storage.local.get({
      sci_hub: 'sci-hub.cc'
    }, function(items) {
      if (parURL.protocol == "chrome:"){
        if (parURL.host == "newtab"){
          var newURL = "http://" + items.sci_hub + parURL.pathname;
          // window.open(newURL);
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[0];
            chrome.tabs.update(tab.id, {url: newURL});
          });
        } 
      }
      else{
        var sci_hub = "." + items.sci_hub;
        var newURL = parURL.protocol + parURL.host + sci_hub + parURL.pathname;
        window.open(newURL,'_blank');
      }
    });
  });
});
