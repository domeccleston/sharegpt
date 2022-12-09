import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useView = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  useEffect(() => {
    if (id) {
      fetch(`/api/conversations/${id}/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.views === 1) {
            navigator.clipboard
              .writeText(`https://shareg.pt/${id}`)
              .then(() => {
                toast.success("Link copied to clipboard");
              });
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // to make sure hook is only called once on mount
}; // not when reactStrictMode is true, this is fired twice, but it only happens in dev, not prod
