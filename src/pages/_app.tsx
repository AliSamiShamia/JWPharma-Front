import React, { Suspense } from "react";
import themeConfig from "@/components/constant/theme";
import themeColor from "@/components/constant/color";
import type { EmotionCache } from "@emotion/cache";
import { Provider } from "react-redux";
import { store } from "@/store";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { createEmotionCache } from "@/components/utils/create-emotion-cache";

import { CacheProvider, ThemeProvider } from "@emotion/react";
import Head from "next/head";
const clientSideEmotionCache = createEmotionCache();
import { createTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import GlobalStyling from './_global'
import CustomSpinner from "@/components/widgets/spinner";

type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

const theme = createTheme({
  palette: {
    primary: themeColor.primary,
    secondary: themeColor.secondary,
  },
});

const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <Suspense fallback={<CustomSpinner loading={true}/>}>
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
            <Component {...pageProps} />
          </CacheProvider>
        </ThemeProvider>
      </Provider>
    </Suspense>
  );
};

export default App;
