import Link from "next/link";
import Image from "next/image";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Layout from "@/components/layout";
import { useState } from "react";

export default function Home({}: {}) {
	const [openPopover, setOpenPopover] = useState(false);
	return (
		<Layout>
			<div className="flex flex-col items-center py-28 bg-gray-50">
				<div className="flex flex-col items-center space-y-8 text-center mx-5 sm:mx-auto">
					<h1 className="font-display tracking-tight font-bold text-4xl text-gray-800 transition-colors sm:text-7xl">
						ShareGPT
					</h1>
					<p className="max-w-lg font-medium text-gray-600 transition-colors sm:text-lg">
						ShareGPT is deprecated. Please use OpenAI&apos;s built-in sharing
						instead. Thanks to everyone who used ShareGPT to share over 438,000
						conversations.
					</p>
				</div>
				<div className="my-16 px-0 sm:px-2 sm:max-w-screen-lg w-full">
					<LiteYouTubeEmbed
						id="lrjC9PTemJw"
						poster="maxresdefault"
						title="Whats new in Material Design for the web (Chrome Dev Summit 2019)"
					/>
				</div>
				<div className="w-full bg-gray-100 py-5 sm:py-10 mb-10">
					<div className="flex justify-center space-x-5">
						<Link
							href="https://techcrunch.com/2022/12/08/sharegpt-lets-you-easily-share-your-chatgpt-conversations/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src="/techcrunch.png"
								alt="TechCrunch logo"
								width={2244}
								height={318}
								className="w-48 sm:w-60 hover:scale-105 transition-all"
							/>
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
}
