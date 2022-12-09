import Modal from "@/components/shared/modal";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import LoadingDots from "@/components/shared/icons/loading-dots";
import Link from "next/link";
import Twitter from "../shared/icons/twitter";
import Image from "next/image";

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="inline-block w-full sm:max-w-md py-8 px-4 sm:px-16 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <div>
          <h3 className="font-display font-bold text-3xl mb-4 tracking-tight sm:tracking-wide">
            Sign In
          </h3>
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <a
              href="/terms"
              target="_blank"
              className="font-medium hover:text-black transition-all ease duration-150"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              target="_blank"
              className="font-medium hover:text-black transition-all ease duration-150"
            >
              Privacy Policy
            </a>
          </p>
        </div>

        <div className="mt-5 flex flex-col space-y-2">
          <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? "cursor-not-allowed bg-gray-100 border-gray-200"
                : "bg-white text-black border border-gray-200 hover:bg-gray-50"
            } flex justify-center items-center space-x-3 shadow-sm w-full text-sm h-10 rounded-md border transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
              signIn("google");
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Image
                  alt="Chrome logo"
                  src="/chrome.svg"
                  width={20}
                  height={20}
                />
                <p>Sign In with Google</p>
              </>
            )}
          </button>
          <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? "cursor-not-allowed bg-gray-100 border-gray-200"
                : "bg-white text-black border border-gray-200 hover:bg-gray-50"
            } flex justify-center items-center space-x-3 shadow-sm w-full text-sm h-10 rounded-md border transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
              signIn("twitter");
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Twitter className="text-[#1DA1F2] w-5 h-5" />
                <p>Sign In with Twitter</p>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback]
  );
}
