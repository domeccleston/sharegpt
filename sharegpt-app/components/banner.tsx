import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="fixed bottom-5 inset-x-0 mx-auto max-w-fit rounded-lg p-2 bg-white border border-gray-100 shadow-md flex justify-between space-x-1 items-center">
      <Link
        href="https://sharegpt.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex space-x-3 items-center justify-center font-medium text-gray-600 px-3 py-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all"
      >
        <Image
          alt="ShareGPT logo"
          src="/logo.svg"
          width={20}
          height={20}
          className="rounded-sm"
        />
        <p>Shared via ShareGPT</p>
      </Link>
      <Link
        href="https://sharegpt.com/extension"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all"
      >
        <Image alt="Chrome logo" src="/chrome.svg" width={20} height={20} />
      </Link>
    </div>
  );
}
