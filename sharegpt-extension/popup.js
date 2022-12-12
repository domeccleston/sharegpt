chrome.runtime.sendMessage({ action: "AUTH_CHECK" }, (session) => {
  if (session) {
    //user is logged in
  } else {
    //no session means user not logged in
    // chrome.tabs.create({
    //   url: "https://sharegpt.com/api/auth/login",
    // });
  }
});
