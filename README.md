<a href="https://sharegpt.com">
  <img alt="ShareGPT – Share your wildest ChatGPT conversations with one click." src="https://user-images.githubusercontent.com/28986134/207940414-b2314f7c-de04-4007-bc76-2ebb9d4f993c.png">
  <h1 align="center">ShareGPT</h1>
</a>

<p align="center">
  Share your wildest ChatGPT conversations with one click.
</p>

<p align="center">
  <a href="https://twitter.com/ShareGPT">
    <img src="https://img.shields.io/twitter/follow/sharegpt?style=flat&label=%40dubdotsh&logo=twitter&color=0bf&logoColor=fff" alt="Twitter" />
  </a>
  <a href="https://github.com/domeccleston/sharegpt/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/domeccleston/sharegpt?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#rest-api"><strong>REST API</strong></a>
</p>
<br/>

## Introduction

ShareGPT is an open-source Chrome Extension for you to share your wildest ChatGPT conversations with one click.

### Features

- Share your ChatGPT conversations with one-click
- Browse examples on sharegpt.com/explore
- Save your favorite conversations for later
- Leave comments on conversations

## Tech Stack

ShareGPT is built with the following stack:

- [Next.js](https://nextjs.org/) – framework
- [Typescript](https://www.typescriptlang.org/) – language
- [Tailwind](https://tailwindcss.com/) – CSS
- [Upstash](https://upstash.com/) – redis
- [Planetscale](https://planetscale.com/) – database
- [NextAuth.js](https://next-auth.js.org/) – auth
- [Vercel](https://vercel.com/) – hosting

## REST API

The ShareGPT API is a REST-styled API that allows you to write and read conversations from our database, exposed as HTTP endpoints.

### Conversations Endpoint

#### POST: `https://sharegpt.com/api/conversations`

You can use this endpoint to add new conversations to our database.

<details>
<summary>First, if you haven't already, process the ShareGPT conversation using the following code:</summary>

```ts
function conversationData() {
  const threadContainer = document.querySelector(
    "#__next main div:nth-of-type(1) div:nth-of-type(1) div:nth-of-type(1) div:nth-of-type(1)"
  );

  var result = {
    avatarUrl: getAvatarImage(),
    items: [],
  };

  for (const node of threadContainer.children) {
    const markdownContent = node.querySelector(".markdown");

    // tailwind class indicates human or gpt
    if ([...node.classList].includes("dark:bg-gray-800")) {
      result.items.push({
        from: "human",
        value: node.textContent,
      });
      // if it's a GPT response, it might contain code blocks
    } else if ([...node.classList].includes("bg-gray-50")) {
      result.items.push({
        from: "gpt",
        value: markdownContent.outerHTML,
      });
    }
  }

  return result;
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
```

</details>

Then, send a POST request to the endpoint above with the following payload and request headers:

```ts
const res = await fetch("https://sharegpt.com/api/conversations", {
  body: JSON.stringify(conversationData),
  headers: {
    "Content-Type": "application/json",
  },
  method: "POST",
});
```

This will return an object with an `id` attribute which will be the unique identifier for the generated post:

```ts
const { id } = await res.json();
const url = `https://shareg.pt/${id}`; // short link to the ShareGPT post
```

#### GET: `https://sharegpt.com/api/conversations`

*PLEASE NOTE:* This endpoint is currently disabled due to excess traffic.

This endpoint takes 3 optional query parameters:

- `type`:
  - Used for sorting the results.
  - Takes 2 string values: `"new" | "top"`
  - `"new"` sorts conversations by creation time
  - `"top"` sorts conversations by number of views
  - If `undefined`, defaults to `"top"`
- `page`:
  - Used for pagination
  - Takes an integer value as a factor of the `PAGINATION_LIMIT`, which is set to 50.
  - E.g. to get posts 100 - 150, set `page` to `3`
  - If `undefined`, defaults to `1`
- `search`
  - Used for filtering records by title.
  - E.g. `search = "python"` returns all records with the word "python" in the title
  - If `undefined`, search results are not filtered

Example:

```ts
await fetch(
  "https://sharegpt.com/api/conversations?type=new&page=2&search=python"
);
```

This returns a list of conversations with the following type:

```ts
interface ConversationMeta {
  id: string; // unique id for the conversation
  title: string; // title of the conversation (first user prompt)
  avatar: string; // base64 encoded URI of the user's avatar
  saves: number; // number of times the conversation is saved on ShareGPT
  comments: number; // number of comments the conversation has on ShareGPT
  views: number; // number of times the conversation has been viewed on ShareGPT
  createdAt: Date; // timestamp when the conversation was creataed
}
[];
```
