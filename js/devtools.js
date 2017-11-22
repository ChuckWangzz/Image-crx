chrome.devtools.panels.create('ImgListener', '', '../html/img-pannel.html', function (pannel) {
  // pannel.createStatusBarButton('../images/Whale_48.png', 'haha', false);
  /*pannel.onSearch.addListener(function(window){
     chrome.devtools.inspectedWindow.eval('console.log("Large image: " + unescape("' + escape(window) + '"))');
  })*/
});

chrome.devtools.network.onRequestFinished.addListener(function(request) {
  /*chrome.storage.sync.get({color: 'red'}, function(item) {
      chrome.devtools.inspectedWindow.eval('console.log(unescape("' + escape(item.color) + '"))');
  });
  var url = request.request.url;
  var reg = /\.(png|gif|jpg|bmp|jpeg|apng|svg)/i;
  if (reg.test(url)) {
    chrome.devtools.inspectedWindow.eval('console.log("Large image: " + unescape("' + escape(url) + '"))');
  }*/
});
