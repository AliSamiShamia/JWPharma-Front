import { LayoutType } from "@/components/types/layout.types";
import React, { Fragment, useEffect, useState } from "react";
import DrawerAppBar from "../header/navbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import NProgress from "nprogress";
import { Router } from "next/router";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import CustomSpinner from "@/components/widgets/spinner";
const inter = Inter({ subsets: ["latin"] });

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
  const { children } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return (
    <>
      {loading ? (
        <CustomSpinner loading={loading} />
      ) : (
        <Fragment>
          <DrawerAppBar />

          <Box
            component={"main"}
            className={`${styles.main} ${inter.className}`}
          >
            <Container maxWidth={false} disableGutters>
              <Box height={1000}>{children}</Box>
            </Container>
          </Box>
        </Fragment>
      )}
    </>
  );
}

export default Layout;
