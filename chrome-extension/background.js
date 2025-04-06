// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SYNC_STORAGE') {
    // Store the data in chrome.storage
    chrome.storage.local.set(message.data, () => {
      console.log('Data synced from localhost:', message.data);
    });
  }
}); 