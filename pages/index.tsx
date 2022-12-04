import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="mx-8 my-4">
      <h1 className="font-bold text-4xl">ChatGPT Share</h1>
      <p className="italic py-2">How to get started:</p>
      <ol className="list-decimal">
        <li>
          Download the Chrome Extension{" "}
          <Link className="underline text-indigo-500" href="https://github.com/domeccleston/chatgpt-extension">
            here
          </Link>
        </li>
        <li>
          Visit <Link className="underline text-indigo-500" href="https://chat.openai.com">ChatGPT</Link> and hit
          the new `Export` button to generate a permanent link to share with your
          friends
        </li>
      </ol>
    </div>
  );
};

export default Home;
