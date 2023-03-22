"use client";

import { useState } from "react";
import { LoginButton } from "@/components/shared/login-button";
import { UserDropdown } from "@/components/layout/user-dropdown";
import { SignInModal } from "../layout/sign-in-modal";

export function LoginSection({ session }: { session: any }) {
  const [modalShown, setModalShown] = useState(false);
  console.log(modalShown)
  return (
    <>
      {session ? (
        <UserDropdown session={session} />
      ) : (
        <LoginButton setModalShown={setModalShown} />
      )}
      {modalShown && (
        <SignInModal
          showSignInModal={modalShown}
          setShowSignInModal={setModalShown}
        />
      )}
    </>
  );
}
