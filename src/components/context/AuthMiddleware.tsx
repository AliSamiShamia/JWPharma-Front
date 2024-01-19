import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function AuthMiddleware({ children }: any) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (auth.user === null && !window.localStorage.getItem("userData")) {
        if (router.asPath !== "/") {
          router.replace({
            pathname: "/login",
            query: { returnUrl: router.asPath },
          });
        } else {
          router.replace("/login");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  );

  return children;
}

export default AuthMiddleware;
