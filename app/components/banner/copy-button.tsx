import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link as LinkIcon, Check } from "lucide-react";

export default function CopyButton() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const copyRef = useRef<HTMLButtonElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    copyRef?.current?.focus();
  }, []);

  return (
    <button
      ref={copyRef}
      onClick={() =>
        navigator.clipboard.writeText(`https://shareg.pt/${id}`).then(() => {
          toast.success("Link copied to clipboard");
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
      }
      className="p-2 flex flex-col space-y-1 items-center rounded-md w-12 hover:bg-gray-100 active:bg-gray-200 transition-all"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <LinkIcon className="h-4 w-4 text-gray-600" />
      )}
      <p className="text-center text-gray-600 text-sm">Copy</p>
    </button>
  );
}
