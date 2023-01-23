import Link from "next/link";

export default function notFound() {
  return (
    <div className="flex items-center justify-center h-screen flex-col max-w-[1000px] mx-auto text-center">
      <h1 className="text-4xl">404 - Page Not Found</h1>
      <p className="mt-4">If you&apos;re looking for a conversation created between the 21st and 22nd of January, it&apos;s possible that it was lost due to a database backup.</p>
      <p>We apologize for any inconvenience caused.</p>
      <p className="mt-4">Please <Link className="font-medium underline" href="https://chat.openai.com">navigate back to your saved ChatGPT conversations</Link> and click &apos;share&apos; again to generate a new link.</p>
    </div>
  );
}