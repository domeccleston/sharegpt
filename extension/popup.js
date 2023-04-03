fetch("https://sharegpt.com/api/auth/csrf").then(async (res) => {
  const json = await res.json();
  const csrf = json.csrfToken;
  document.querySelector("#csrfToken-google").value = csrf;
  document.querySelector("#csrfToken-twitter").value = csrf;
});

fetch("https://sharegpt.com/api/auth/session").then(async (res) => {
  const json = await res.json();
  document.querySelector("#loading-div").style.display = "none";
  if (json.user) {
    //user is logged in
    document.querySelector("#session-div").style.display = "flex";

    const { user } = json;
    document.querySelector("#session-image").src = user.image;
    document.querySelector("#session-name").innerHTML = user.name;
    document.querySelector("#session-username").innerHTML = user.username;
  } else {
    // no session means user not logged in
    document.querySelector("#login-div").style.display = "flex";
  }
});
