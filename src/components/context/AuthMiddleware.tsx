import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function AuthMiddleware({ children }: any) {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!auth.user) {
        if (router.asPath !== "/") {
        router.replace({
          pathname: "/login",
          query: { returnUrl: router.asPath },
        });
      } else {
        router.replace("/login");
      }
    }
  }, [router.route, auth]);

  return children;
}

export default AuthMiddleware;
