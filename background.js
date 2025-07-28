chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.copiedText) {
    // Get current clipboard history
    chrome.storage.local.get({ clipboardHistory: [] }, (result) => {
      const history = result.clipboardHistory;
      history.push({
        text: message.copiedText,
        time: new Date().toISOString()
      });

      // Save updated history
      chrome.storage.local.set({ clipboardHistory: history });
    });
  }
});
