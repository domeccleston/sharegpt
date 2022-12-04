chrome.runtime.onInstalled.addListener(() => {
  console.log("Installed.");
  return true;
});

chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    console.log("onMessageExternal");
    console.log({ message, sender });
  }
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("onMessage");
  console.log({ message, sender });
});
