"use client";

import { useState } from "react";
import Image from "next/image";
import Popover from "@/components/shared/popover";
import { ChevronDown } from "lucide-react";

export function InstallButton() {
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <div className="flex justify-center items-center mb-3 sm:mr-3 sm:mb-0 rounded-lg bg-[#232c67] md:bg-indigo-500 text-white shadow-md">
      <a
        className="hidden md:flex space-x-3 justify-center items-center px-5 py-3 border-r-2 border-white/25 font-medium md:hover:bg-indigo-600 transition-all rounded-l-lg"
        href="/extension"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image alt="Chrome logo" src="/chrome.svg" width={20} height={20} />
        <p>Install extension</p>
      </a>
      <a
        className="flex md:hidden space-x-3 justify-center items-center px-5 py-3 border-r-2 border-white/25 font-medium md:hover:bg-indigo-600 transition-all rounded-l-lg"
        href="/shortcut"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          alt="iOS Shortcuts logo"
          src="/shortcut.svg"
          width={20}
          height={20}
          className="border-2 border-white/25 rounded-md"
        />
        <p>Add shortcut</p>
      </a>
      <Popover
        setOpenPopover={setOpenPopover}
        align="end"
        openPopover={openPopover}
        content={
          <div className="grid w-full md:w-[14.5rem] p-2">
            <a
              href="/extension"
              target="_blank"
              rel="noopener noreferrer"
              className="flex space-x-3 items-center px-5 py-3 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-md transition-all"
            >
              <Image
                alt="Chrome logo"
                src="/chrome.svg"
                width={20}
                height={20}
              />
              <p>Install extension</p>
            </a>
            <a
              href="/shortcut"
              target="_blank"
              rel="noopener noreferrer"
              className="flex space-x-3 items-center px-5 py-3 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-md transition-all"
            >
              <Image
                alt="iOS Shortcut logo"
                src="/shortcut.svg"
                width={20}
                height={20}
              />
              <p>Add shortcut</p>
            </a>
          </div>
        }
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="px-3 h-12 flex items-center text-white md:hover:bg-indigo-600 transition-all rounded-r-lg"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </Popover>
    </div>
  );
}
