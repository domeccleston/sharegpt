import Image from "next/image";
import { ReactNode } from "react";
import Meta from "./meta";
import { useSession } from "next-auth/react";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { motion, AnimatePresence } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import Link from "next/link";

export default function Layout({
	meta,
	children,
}: {
	meta?: {
		title?: string;
		description?: string;
		image?: string;
		imageAlt?: string;
		canonical?: string;
	};
	children: ReactNode;
}) {
	const { data: session, status } = useSession();
	const { SignInModal, setShowSignInModal } = useSignInModal();
	return (
		<div>
			<Meta {...meta} />
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
				</div>
			</div>
			{children}
		</div>
	);
}
