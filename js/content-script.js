document.addEventListener('DOMContentLoaded', () => {
  injectCustomJs();
  //接受background&popup传递过来的信息
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if(request.sessionStorage) {
        window.sessionStorage.setItem('imgLisOp', JSON.stringify(request.sessionStorage));
      }else if(request.getSessionStorage) {
        sendResponse(JSON.parse(window.sessionStorage.getItem('imgLisOp')));
        return;        
      }
      sendResponse('success');
  });
});

function injectCustomJs (jsPath) {
  jsPath = jsPath || 'js/inject.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function()
  {
      this.parentNode.removeChild(this);
  };
  document.body.appendChild(temp);
}