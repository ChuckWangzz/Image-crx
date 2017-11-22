chrome.webRequest.onCompleted.addListener((details) => {
  if(details.type === 'image') {
    sendMessageToContentScript({details: details}, (response) => {
      
    });
  }
}, {urls: ["<all_urls>"]}, []);

function sendMessageToContentScript(message, callback){
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
      if(callback) callback(response);
    });
  });
}