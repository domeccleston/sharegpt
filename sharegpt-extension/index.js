let isRequesting = false;

function init() {
  const shareButton = createBtn();

  const buttonsWrapper = document.querySelector(
    "#__next main form > div div:nth-of-type(1)"
  );

  const placeholderRetryButton = document.createElement("button");

  placeholderRetryButton.classList.add(
    "btn",
    "flex",
    "gap-2",
    "justify-center",
    "btn-neutral"
  );

  placeholderRetryButton.disabled = true;

  placeholderRetryButton.innerHTML = `
    <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>Try again
  `;

  buttonsWrapper.appendChild(shareButton);
  buttonsWrapper.appendChild(placeholderRetryButton);

  shareButton.addEventListener("click", async () => {
    if (isRequesting) return;
    isRequesting = true;
    shareButton.textContent = "Sharing...";
    shareButton.style.cursor = "initial";

    const threadContainer = document.querySelector(
      "#__next main div:nth-of-type(1) div:nth-of-type(1) div:nth-of-type(1) div:nth-of-type(1)"
    );

    const conversationData = {
      avatarUrl: getAvatarImage(),
      items: [],
    };

    for (const node of threadContainer.children) {
      const markdownContent = node.querySelector(".markdown");

      // tailwind class indicates human or gpt
      if ([...node.classList].includes("dark:bg-gray-800")) {
        conversationData.items.push({
          from: "human",
          value: node.textContent,
        });
        // if it's a GPT response, it might contain code blocks
      } else if ([...node.classList].includes("bg-gray-50")) {
        conversationData.items.push({
          from: "gpt",
          value: markdownContent.outerHTML,
        });
      }
    }
    const res = await fetch("https://chatgpt-share.vercel.app/api/save", {
      body: JSON.stringify(conversationData),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }).catch((err) => {
      isRequesting = false;
      alert(
        `Error saving conversation: ${err.message}. The developer has been notified.`
      );
    });
    const { id } = await res.json();
    const url = `https://shareg.pt/${id}`;

    window.open(url, "_blank");

    setTimeout(() => {
      shareButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
      <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>Share`;
      shareButton.style.cursor = "pointer";
      isRequesting = false;
    }, 1000);
  });

  const config = { attributes: true, childList: true, subtree: true };

  let events = 0;
  const hidePlaceholderButtonCallback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (
        [...mutation.target.classList].includes("text-gray-500") &&
        mutation.attributeName === "class"
      ) {
        console.log(mutation.target, mutation);
        events += 1;
        if (events === 2) {
          placeholderRetryButton.classList.add("hidden");
          shareButton.disabled = false;
          observer.disconnect();
        }
      }
    }
  };

  const disableShareButtonCallback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        const addedNodes = mutation.addedNodes;
        for (let i = 0; i < addedNodes.length; i++) {
          if (
            addedNodes[i] instanceof HTMLElement &&
            [...addedNodes[i].classList].includes("dark:text-gray-100")
          ) {
            shareButton.disabled = false;
            observer.disconnect();
          }
        }
      }
    }
  };

  const hidePlaceholderObserver = new MutationObserver(
    hidePlaceholderButtonCallback
  );
  const disableShareButtonObserver = new MutationObserver(
    disableShareButtonCallback
  );

  hidePlaceholderObserver.observe(document.body, config);
  disableShareButtonObserver.observe(document.body, config);
}

function getAvatarImage() {
  // Create a canvas element
  const canvas = document.createElement("canvas");

  const image = document.querySelectorAll("img")[1];

  // Set the canvas size to 30x30 pixels
  canvas.width = 30;
  canvas.height = 30;

  // Draw the img onto the canvas
  canvas.getContext("2d").drawImage(image, 0, 0);

  // Convert the canvas to a base64 string as a JPEG image
  const base64 = canvas.toDataURL("image/jpeg");

  return base64;
}

function createBtn() {
  const button = document.createElement("button");

  button.classList.add("btn", "flex", "gap-2", "justify-center", "btn-neutral");

  button.style.order = 2;

  button.disabled = true;

  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
</svg>Share`;

  return button;
}

init();
