import React, { Suspense } from "react";
import themeConfig from "@/components/constant/theme";
import themeColor from "@/components/constant/color";
import type { EmotionCache } from "@emotion/cache";
import { Provider } from "react-redux";
import { store } from "@/store";
import type { NextComponentType } from "next";
import type { AppProps } from "next/app";
import { createEmotionCache } from "@/components/utils/create-emotion-cache";

import { CacheProvider, ThemeProvider } from "@emotion/react";
import Head from "next/head";
const clientSideEmotionCache = createEmotionCache();
import { createTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import GlobalStyling from "./_global";
import CustomSpinner from "@/components/widgets/spinner";
import { AuthProvider } from "@/components/context/AuthContext";
import AuthMiddleware from "@/components/context/AuthMiddleware";

type ExtendedAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
  emotionCache: EmotionCache;
};
// Update the Button's color options to include a violet option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    light: true;
    dark: true;
  }
}
declare module "@mui/material/styles" {
  interface Palette {
    light: Palette["primary"];
  }
  interface PaletteOptions {
    light?: PaletteOptions["primary"];
    dark?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  typography: {
    fontFamily: `"Open-Sans", "Helvetica", "Arial", sans-serif`,
    h1: {
      "@media (min-width:360px)": {
        fontSize: "2rem",
      },
      "@media (min-width:480px)": {
        fontSize: "3rem",
      },
      "@media (min-width:600px)": {
        fontSize: "5em",
      },
    },
    h2: {
      "@media (min-width:360px)": {
        fontSize: "1.5rem",
      },
      "@media (min-width:480px)": {
        fontSize: "2rem",
      },
      "@media (min-width:600px)": {
        fontSize: "4em",
      },
    },
    h3: {
      "@media (min-width:360px)": {
        fontSize: "1.5rem",
      },
      "@media (min-width:480px)": {
        fontSize: "1.5rem",
      },
      "@media (min-width:600px)": {
        fontSize: "3em",
      },
    },
    h6: {
      "@media (min-width:360px)": {
        fontSize: "1rem",
      },
      "@media (min-width:480px)": {
        fontSize: "1rem",
      },
      "@media (min-width:600px)": {
        fontSize: "1.2em",
      },
    },
    subtitle1: {
      "@media (min-width:360px)": {
        fontSize: "1rem",
      },
      "@media (min-width:480px)": {
        fontSize: "1rem",
      },
      "@media (min-width:600px)": {
        fontSize: "1.2em",
      },
    },
  },

  palette: {
    primary: themeColor.primary,
    secondary: themeColor.secondary,
    light: themeColor.white,
    dark: themeColor.black,
  },
});

const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <Suspense fallback={<CustomSpinner loading={true} />}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles styles={() => GlobalStyling(theme)} />

          <CacheProvider value={emotionCache}>
            <Head>
              <title>{`${themeConfig.websiteName} `}</title>
              <meta
                name="description"
                content={`${themeConfig.websiteName}  `}
              />
              <meta
                name="keywords"
                content="E-Commerce JWPharma JW Pharam Middle East City"
              />
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            {Component.auth ? (
              <AuthMiddleware>
                <Component {...pageProps} />
              </AuthMiddleware>
            ) : (
              <Component {...pageProps} />
            )}
          </CacheProvider>
        </ThemeProvider>
      </Provider>
    </Suspense>
  );
};

export default App;
