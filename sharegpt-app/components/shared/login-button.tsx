"use client";
import { type Dispatch, type SetStateAction } from "react";

export function LoginButton({
  setModalShown,
}: {
  setModalShown: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => {
        setModalShown(true);
      }}
      className="bg-black text-white text-sm px-4 p-1.5 rounded-md border border-black hover:bg-white hover:text-black transition-all"
    >
      Sign In
    </button>
  );
}
