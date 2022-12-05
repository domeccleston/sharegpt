import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <Link
      className="fixed bottom-5 inset-x-0 mx-auto w-60 flex space-x-3 items-center justify-center rounded-lg py-3 font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors duration-75 border border-gray-100 shadow-md"
      href="/"
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
  );
}
