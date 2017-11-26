// 监听来自content-script和devtools的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.from === 'devtools') {
    if(request.data) {
      webReqListener(request.data);
    }
  }
});

function webReqListener(_details) {
  sendMessageToContentScript({details: _details, from: 'background'}, (response) => {
      console.log('reply from content：' + response);
  });
}

function sendMessageToContentScript(message, callback){
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
        if(callback) callback(response);
    });
  });
}