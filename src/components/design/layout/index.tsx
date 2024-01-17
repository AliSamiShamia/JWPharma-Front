import { LayoutType } from "@/components/types/layout.types";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import NProgress from "nprogress";
import { Router } from "next/router";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Footer from "../footer";
import routeConfig from "@/components/constant/route";
import { useAppSelector } from "@/store/hooks";
const inter = Inter({ subsets: ["latin"] });

const DrawerAppBar = dynamic(() => import("@/components/design/header/navbar"));
const Container = dynamic(() => import("@mui/material/Container"));
const CustomSpinner = dynamic(() => import("@/components/widgets/spinner"));
const Logo = dynamic(() => import("@/components/widgets/logo"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Fragment = dynamic(() =>
  import("react").then((module) => module.Fragment)
);

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

function Layout(props: LayoutType) {
  const user = useAppSelector((state) => state.user.auth);
  const { children } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (document.readyState === "complete") {
      init();
    } else {
      window.addEventListener("load", init, false);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", init);
    }
  }, []);

  const init = () => {
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <CustomSpinner loading={loading}>
          <Logo />
        </CustomSpinner>
      ) : (
        <Fragment>
          <DrawerAppBar />
          <Box
            component={"main"}
            className={`${styles.main} ${inter.className}`}
          >
            <Container maxWidth={false} disableGutters>
              <Grid minHeight={800}>{children}</Grid>
            </Container>
          </Box>
          <Footer />
        </Fragment>
      )}
    </>
  );
}

export default Layout;
