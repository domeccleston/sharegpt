"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function ViewTracker() {
  const params = useSearchParams();

  // @ts-expect-error this errors because the 'pages' dir exists, but we'll remove it
  const id = params.get("id");

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
  }, [id]); // to make sure hook is only called once on mount

  return null;
}
