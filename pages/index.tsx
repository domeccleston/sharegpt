import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import { useDebounce } from "use-debounce";
import Image from "next/image";
import Meta from "@/components/meta";

const staggerChildVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const onLoad = () => {
    setLoading(false);
  };
  // workarouond to avoid the blinking effect when Spline loads
  const [opacity] = useDebounce(loading ? 0 : 1, 200);

  const [showText] = useDebounce(loading ? false : true, 800);
  return (
    <>
      <Meta />
      <div className="flex h-screen flex-col items-center">
        <motion.div
          className="z-10"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div
            className={`${
              loading ? "scale-[25%] blur-md" : "scale-100 blur-0"
            } mt-[7vh] h-[50vh] w-screen object-cover transition-all duration-1000`}
          >
            <Spline
              onLoad={onLoad}
              style={{ opacity: opacity }}
              scene="https://prod.spline.design/0ltUkWtcK1TcSvfM/scene.splinecode"
            />
          </div>
          {showText && (
            <motion.div
              variants={{
                show: {
                  transition: {
                    staggerChildren: 0.25,
                  },
                },
              }}
              initial="hidden"
              animate="show"
              className="mx-5 flex flex-col items-center space-y-8 text-center sm:mx-auto"
            >
              <motion.h1
                className="font-display text-4xl text-gray-800 transition-colors sm:text-5xl"
                variants={staggerChildVariants}
              >
                ShareGPT
              </motion.h1>
              <motion.p
                className="max-w-lg text-gray-500 transition-colors sm:text-lg"
                variants={staggerChildVariants}
              >
                Share your wildest ChatGPT conversations with one click.
              </motion.p>
              <motion.div
                variants={staggerChildVariants}
                className="flex flex-col space-y-3"
              >
                <a
                  className="flex space-x-3 items-center rounded-lg px-5 py-3 font-medium text-gray-600 bg-white hover:bg-[#fcfcfc] transition-colors duration-75 border border-gray-100 shadow-md"
                  href="https://github.com/domeccleston/sharegpt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    alt="Chrome logo"
                    src="/chrome.svg"
                    width={20}
                    height={20}
                  />
                  <p>Get the Chrome Extension</p>
                </a>
                <Link
                  href="/r4c5h9egfk"
                  className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                >
                  View an example
                </Link>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Home;
