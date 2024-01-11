// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios
import axios from "axios";

// ** Config
import routeConfig from "@/components/constant/route";
import { post } from "@/handler/api.handler";
import { useAppSelector } from "@/store/hooks";
import { UserType } from "../types/user.types";
import { useDispatch } from "react-redux";
import { storeUser } from "@/store/apps/user";

// ** Types

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  const auth = useAppSelector((state) => state.user.auth);
  // ** Hooks
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setUser(auth);
      const storedToken = auth.token!;
      if (storedToken) {
        localStorage.setItem("accessToken", storedToken);

        setLoading(true);
        try {
          const res = await post(
            routeConfig.account.profile,
            null,
            storedToken
          );
          if (res && res.status_code == 200) {
            setLoading(false);
            setUser({ ...res.data });
            dispatch(storeUser({ ...res.data, isAuth: true }));
            localStorage.setItem("userData", { ...res.data });
            localStorage.setItem("refreshToken", res.data.token);
            localStorage.setItem("accessToken", res.data.token);
          } else {
            localStorage.removeItem("userData");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            setUser(null);
            setLoading(false);
            if (
              routeConfig.onTokenExpiration === "logout" &&
              !router.pathname.includes("login")
            ) {
              router.replace("/login");
            }
          }
        } catch (e: any) {
          localStorage.removeItem("userData");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          setUser(null);
          setLoading(false);
          if (
            routeConfig.onTokenExpiration === "logout" &&
            !router.pathname.includes("login")
          ) {
            router.replace("/login");
          }
        }
      } else {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = async (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    try {
      const res = await post(routeConfig.account.login, params);
      if (res && res.status_code == 200) {
        params.rememberMe
          ? window.localStorage.setItem(
              routeConfig.storageTokenKeyName,
              res?.data?.token
            )
          : null;
        const returnUrl = router.query.returnUrl;
        setUser({ ...res.data });
        params.rememberMe
          ? window.localStorage.setItem("userData", JSON.stringify(res.data))
          : null;
        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
        router.replace(redirectURL as string);
      }
    } catch (err: any) {
      if (errorCallback) errorCallback(err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(routeConfig.storageTokenKeyName);
    router.push("/login");
  };

  const handleRegister = (
    params: RegisterParams,
    errorCallback?: ErrCallbackType
  ) => {
    axios
      .post(routeConfig.account.register, params)
      .then((res) => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error);
        } else {
          handleLogin({ email: params.email, password: params.password });
        }
      })
      .catch((err: { [key: string]: string }) =>
        errorCallback ? errorCallback(err) : null
      );
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
