import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import FocusTrap from "focus-trap-react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

export default function SideModal({
  children,
  showModal,
  setShowModal,
}: {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { comment, position } = router.query;
  const mobileModalRef = useRef(null);
  const desktopModalRef = useRef(null);

  const closeModal = useCallback(() => {
    if (comment || position) {
      router.replace(
        {
          pathname: "/c/[id]",
          query: {
            id: router.query.id,
          },
        },
        undefined,
        { shallow: true, scroll: false }
      );
    } else {
      setShowModal(false);
    }
  }, [comment, position, router, setShowModal]);

  const controls = useAnimation();
  const transitionProps = { type: "spring", stiffness: 500, damping: 30 };
  useEffect(() => {
    controls.start({
      y: 0,
      transition: transitionProps,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDragEnd(_: any, info: any) {
    const offset = info.offset.y;
    const velocity = info.velocity.y;
    // @ts-ignore
    const height = mobileModalRef.current.getBoundingClientRect().height;
    if (offset > height / 2 || velocity > 800) {
      await controls.start({ y: "100%", transition: transitionProps });
      closeModal();
    } else {
      controls.start({ y: 0, transition: transitionProps });
    }
  }

  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <FocusTrap
          focusTrapOptions={{
            initialFocus: false,
            clickOutsideDeactivates: true,
          }}
        >
          <div className="absolute">
            <motion.div
              ref={mobileModalRef}
              key="mobile-modal"
              className="group fixed inset-x-0 bottom-0 z-40 w-screen cursor-grab active:cursor-grabbing sm:hidden"
              initial={{ y: "100%" }}
              animate={controls}
              exit={{ y: "100%" }}
              transition={transitionProps}
              drag="y"
              dragDirectionLock
              onDragEnd={handleDragEnd}
              dragElastic={{ top: 0, bottom: 1 }}
              dragConstraints={{ top: 0, bottom: 0 }}
            >
              <div
                className={`h-7 bg-white rounded-t-4xl -mb-1 flex w-full items-center justify-center border-t border-gray-200`}
              >
                <div className="-mr-1 h-1 w-6 rounded-full bg-gray-300 transition-all group-active:rotate-12" />
                <div className="h-1 w-6 rounded-full bg-gray-300 transition-all group-active:-rotate-12" />
              </div>
              {children}
            </motion.div>
            <motion.div
              ref={desktopModalRef}
              key="desktop-modal"
              className="fixed top-0 right-0 z-40 hidden sm:block h-screen p-5"
              initial={{ translateX: 2000 }}
              animate={{ translateX: 0 }}
              exit={{ translateX: 2000 }}
            >
              {children}
            </motion.div>
          </div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
}
