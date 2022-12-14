import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { LogOut } from "lucide-react";
import React, { ReactNode } from "react";

export default function HoverCard({
  content,
  children,
}: {
  content: ReactNode;
  children: ReactNode;
}) {
  return (
    <HoverCardPrimitive.Root openDelay={100} closeDelay={200}>
      <HoverCardPrimitive.Trigger asChild>
        {children}
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          align="center"
          sideOffset={4}
          className="radix-side-top:animate-slide-down-fade radix-side-bottom:animate-slide-up-fade z-10"
        >
          <HoverCardPrimitive.Arrow className="fill-current text-white dark:text-gray-800" />

          {content}
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
}
