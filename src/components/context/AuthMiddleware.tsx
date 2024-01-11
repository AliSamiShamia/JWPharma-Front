import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function AuthMiddleware({ children }: any) {
  const router = useRouter();
  const user = useAppSelector((item) => item.user.auth);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!user.id) {
        if (router.asPath !== "/") {
        router.replace({
          pathname: "/login",
          query: { returnUrl: router.asPath },
        });
      } else {
        router.replace("/login");
      }
    }
  }, [router.route]);

  return children;
}

export default AuthMiddleware;
