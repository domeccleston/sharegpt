import { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export function Navigation({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-full absolute top-0">
        <div className="max-w-screen-xl mx-5 xl:mx-auto flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center font-display font-bold text-xl"
          >
            <Image
              src="/logo.png"
              alt="Logo image of a chat bubble"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>ShareGPT</p>
          </Link>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
