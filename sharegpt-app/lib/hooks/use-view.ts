import { useRouter } from "next/router";
import { useEffect } from "react";

const useView = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  useEffect(() => {
    if (id) {
      fetch(`/api/conversations/${id}/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // to make sure hook is only called once on mount
}; // not when reactStrictMode is true, this is fired twice, but it only happens in dev, not prod

export default useView;
