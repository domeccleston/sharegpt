let isRequesting = false;

function init() {
  const exportButton = createBtn();

  const buttonsWrapper = document.querySelector("#__next main form > div div:nth-of-type(1)");

  buttonsWrapper.appendChild(exportButton);

  const textareaElement = document.querySelector("#__next main form textarea");

  const submitButton = textareaElement.nextElementSibling;

  document.body.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      showIfNotLoading(submitButton, exportButton);
    }
  });

  submitButton.addEventListener("click", (event) => {
    showIfNotLoading(submitButton, exportButton);
  });
}

function showIfNotLoading(loadingElement, newElement) {
  const timerId = setInterval(() => {
    if (loadingElement.disabled) {
      isLoading = true;
      newElement.style.display = "none";
    } else {
      isLoading = false;
      newElement.style.display = "flex";
      clearInterval(timerId);
    }
  }, 100);
}

function createIconSvg() {
  const wrapperEl = document.createElement("span");

  wrapperEl.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  `;

  return wrapperEl;
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

function getGravatarSrc(source) {
  const decodedSource = decodeURIComponent(source);
  const gravatarUrl = decodedSource.split("?")[1].slice(4);

  return gravatarUrl;
}

function createBtn() {
  const button = document.createElement("button");

  button.classList.add("btn", "flex", "gap-2", "justify-center", "btn-neutral");
  const svg = createIconSvg();

  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
</svg>Share`;

  button.addEventListener("click", async () => {
    if (isRequesting) return;
    console.log(getAvatarImage());
    isRequesting = true;
    button.textContent = "Sharing...";
    button.style.cursor = "initial";

    const threadContainer = document.querySelector(
      "#__next main div:nth-of-type(1) div:nth-of-type(1) div:nth-of-type(1) div:nth-of-type(1)"
    );

    const avatarElement = document.querySelector(
      "#__next > div > div.flex.flex-1.flex-col.md\\:pl-52.h-full > main > div.Thread__StyledThread-sc-15plnpr-2.crCFRb > div > div > div > div:nth-child(1) > div > div.ConversationItem__Role-sc-18srrdc-2.kYuXcM > div > span > img"
    );

    const conversationData = {
      avatarUrl: getAvatarImage(),
      items: []
    };

    for (const node of threadContainer.children) {
      const markdownContent = node.querySelector(".markdown");

      // tailwind class indicates human or gpt
      if ([...node.classList].includes("dark:bg-gray-800")) {
        conversationData.items.push({
          from: "human",
          value: node.textContent
        });
        // if it's a GPT response, it might contain code blocks
      } else if ([...node.classList].includes("bg-gray-50")) {
        conversationData.items.push({
          from: "gpt",
          value: markdownContent.outerHTML
        });
      }
    }
    const res = await fetch("https://chatgpt-share.vercel.app/api/save", {
      body: JSON.stringify(conversationData),
      headers: { "Content-Type": "application/json" },
      method: "POST"
    }).catch((err) => {
      isRequesting = false;
      alert(`Error saving conversation: ${err.message}. The developer has been notified.`);
    });
    const { id } = await res.json();
    const url = `https://shareg.pt/${id}`;

    window.open(url, "_blank");
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
  </svg>Share`;
    button.style.cursor = "pointer";
    isRequesting = false;
  });

  return button;
}

init();
