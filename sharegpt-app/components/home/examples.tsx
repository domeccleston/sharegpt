import { ReactNode } from "react";

export function ExamplesSection({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="py-4 px-2 sm:max-w-screen-lg w-full">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold font-display">
          Browse Examples
        </h2>
        {children}
      </div>
    </>
  );
}
