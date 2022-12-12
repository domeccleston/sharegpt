chrome.runtime.onMessage.addListener(function (request, sender, onSuccess) {
  console.log("running check");
  fetch("https://sharegpt.com/api/auth/session", {
    mode: "cors",
  })
    .then((response) => response.json())
    .then((session) => {
      if (Object.keys(session).length > 0) {
        onSuccess(session);
      } else {
        onSuccess(null);
      }
    })
    .catch((err) => {
      console.error(err);
      onSuccess(null);
    });

  return true; // Will respond asynchronously.
});
