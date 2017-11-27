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
  types: ['image', 'stylesheet', 'script'],
  image: ['png', 'jpg', 'bmp', 'jpeg', 'apng', 'svg', 'gif'],
  stylesheet: ['css'],
  script: ['js']
}

//获取crome.storage的配置信息覆盖默认配置
chrome.storage.sync.get({imgLisOp: {}}, (_storage) => {
  Object.assign(config, _storage.imgLisOp);
  let sReg = '';
  config.filter.forEach((_filter) => {
    Catag.types.forEach((_type) => {
      let index = Catag[_type].indexOf(_filter);
      index>=0?Catag[_type].splice(index, 1):'';
    });
  });
  config.type.forEach((_type) => {
    if (Catag.types.indexOf(_type) >= 0 ) {
      console.log(_type)
      if(sReg === '') {
        sReg += Catag[_type].join('|');
      }else {
        sReg += '|' + Catag[_type].join('|');
      }
    }
  });
  sReg = `\\.(${sReg})`;
  let reg = new RegExp(sReg);
  let reg1 = new RegExp(sReg + '@.+');
  let reg2 = new RegExp('^(http|https)://(' + config.urls.join('|') + ')');
  if (config.listen.toString() === 'true') {
    chrome.devtools.network.onRequestFinished.addListener(function(request) {
      let url = request.request.url;
      if (reg.test(url) && !reg1.test(url) && reg2.test(url)) {
        chrome.runtime.sendMessage({tabId: chrome.devtools.inspectedWindow.tabId, from: 'devtools', data: request.request}, (response) => {
          console.log('send request data from devtools to background success');
        });
      }
    });
  }
});
