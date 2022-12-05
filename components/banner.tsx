import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <Link
      className="sticky bottom-5 inset-x-0 mx-auto flex space-x-3 items-center rounded-lg px-5 py-3 font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors duration-75 border border-gray-100 shadow-md"
      href="/"
    >
      <Image
        alt="ShareGPT logo"
        src="/logo.svg"
        width={20}
        height={20}
        className="rounded-sm"
      />
      <p>Shared with ChatGPT</p>
    </Link>
  );
}
