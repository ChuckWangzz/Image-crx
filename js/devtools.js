chrome.devtools.panels.create('ImgListener', '', '../html/img-pannel.html', function (pannel) {

});

//默认配置
let config = {
  listen: true,
  show: true,
  type: [],
  filter: [],
  urls: []
}
 
let Catag = {
  types: ['image', 'css', 'js'],
  image: ['png', 'jpg', 'bmp', 'jpeg', 'apng', 'svg', 'gif'],
  css: ['css'],
  js: ['js']
}

//获取crome.storage的配置信息覆盖默认配置
chrome.storage.sync.get({imgLisOp: {}}, (_storage) => {
  Object.assign(config, _storage.imgLisOp);
  let reg = '';
  config.filter.forEach((_filter) => {
    Catag.types.forEach((_type) => {
      let index = Catag[_type].indexOf(_filter);
      index>=0?Catag[_type].splice(index, 1):'';
    });
  });
  config.type.forEach((_type) => {
    if(Catag.types.indexOf(_type)){}
  });
  chrome.devtools.network.onRequestFinished.addListener(function(request) {
    let url = request.request.url;
    if (reg.test(url)) {
      chrome.runtime.sendMessage({tabId: chrome.devtools.inspectedWindow.tabId, from: 'devtools', data: request.request}, (response) => {
        console.log('send request data from devtools to background success');
      });
    }
  });
});
