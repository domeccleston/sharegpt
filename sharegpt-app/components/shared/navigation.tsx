"use client";

import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";

import { motion, AnimatePresence } from "framer-motion";

import { useSignInModal } from "@/components/layout/sign-in-modal";
import UserDropdown from "@/components/layout/user-dropdown";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";

export function Navigation({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
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
          <div>
            <AnimatePresence>
              {/* TODO: use suspense / possibly edge ss */}
              {!session ? (
                <motion.button
                  className="bg-black text-white text-sm px-4 p-1.5 rounded-md border border-black hover:bg-white hover:text-black transition-all"
                  onClick={() => setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Sign In
                </motion.button>
              ) : (
                <UserDropdown session={session} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
