chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getAllTabs') {
    chrome.tabs.query({}, (tabs) => {
      sendResponse({tabs});
    });
    return true; // Indicate asynchronous response
  }
});
