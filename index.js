let isRequesting = false;

function init() {
  const exportButton = createBtn();

  const buttonsWrapper = document.querySelector(
    "#__next > div > div.flex.flex-1.flex-col.md\\:pl-52.h-full > main > div.Thread__PositionForm-sc-15plnpr-3.kWvvEa > form > div > div.PromptTextarea__LastItemActions-sc-4snkpf-3.gRmLdg"
  );
  buttonsWrapper.appendChild(exportButton);
  const submitButton = document.querySelector(
    "#__next > div > div.flex.flex-1.flex-col.md\\:pl-52.h-full > main > div.Thread__PositionForm-sc-15plnpr-3.kWvvEa > form > div > div.PromptTextarea__TextareaWrapper-sc-4snkpf-0.jpDygc > button"
  );

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
      newElement.style.display = "block";
      clearInterval(timerId);
    }
  }, 100);
}

function getGravatarSrc(source) {
  const decodedSource = decodeURIComponent(source);
  const gravatarUrl = decodedSource.split("?")[1].slice(4);
  return gravatarUrl;
}

function createBtn() {
  const button = document.createElement("button");
  button.textContent = "Export";
  button.style.transition = "all 1s ease-in-out";
  button.style.width = "100px";
  button.style.padding = "8px 12px";
  button.style.background = "#fff";
  // button.style.display = "none";
  button.style.boxShadow = "0 1px 2px 0 rgb(0 0 0 / 0.05)";
  button.style.borderRadius = "0.25rem";
  button.style.fontSize = ".875rem";
  button.style.color = "rgba(64,65,79,1)";
  button.style.border = "1px solid rgba(0,0,0,.1)";
  button.style.alignSelf = "flex-end";
  button.addEventListener("click", async () => {
    if (isRequesting) return;
    isRequesting = true;
    button.textContent = "Exporting...";

    const threadContainer = document.querySelector(
      "#__next > div > div.flex.flex-1.flex-col.md\\:pl-52.h-full > main > div.Thread__StyledThread-sc-15plnpr-2.crCFRb > div > div > div"
    );

    const avatarElement = document.querySelector(
      "#__next > div > div.flex.flex-1.flex-col.md\\:pl-52.h-full > main > div.Thread__StyledThread-sc-15plnpr-2.crCFRb > div > div > div > div:nth-child(1) > div > div.ConversationItem__Role-sc-18srrdc-2.kYuXcM > div > span > img"
    );

    const conversationData = {
      gravatarUrl: getGravatarSrc(avatarElement.src),
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(conversationData),
    }).catch((err) => {
      isRequesting = false;
      alert(
        `Error saving conversation: ${err.message}. The developer has been notified.`
      );
    });
    const { id } = await res.json();
    const url = `https://shareg.pt/${id}`;
    window.open(url, "_blank");
    button.textContent = "Export";
    isRequesting = false;
  });
  return button;
}

init();
