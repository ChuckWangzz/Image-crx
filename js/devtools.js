chrome.devtools.panels.create('ImgListener', '', '../html/img-pannel.html', function (pannel) {

});

//默认配置
let config = {
  listen: true,
  show: true,
  hosts: [],
  filter: [],
  urls: []
}

let listening = false;
const ImgReg = /\.(png|jpg|bmp|jpeg|apng|svg)/;

//获取crome.storage的配置信息覆盖默认配置
chrome.storage.sync.get({imgLisOp: {}}, (_storage) => {
  Object.assign(config, _storage.imgLisOp);
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(!listening) {
      if(request.from === 'content-script') {
        let hostsReg = new RegExp(config.hosts.join('|'));
        let urlsReg = new RegExp(config.urls.join('|'));
        if(config.listen.toString() === 'true' && hostsReg.test(request.origin)) {
          chrome.devtools.network.onRequestFinished.addListener(function(request) {
            let url = request.request.url;
            if (ImgReg.test(url) && !urlsReg.test(url)) {
              listening = true;
              chrome.runtime.sendMessage({tabId: chrome.devtools.inspectedWindow.tabId, from: 'devtools', data: request.request}, (response) => {
                console.log('send request data from devtools to background success');
              });
            }
          });
        } 
      }
    }
  });
});