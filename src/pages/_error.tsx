import React from "react";
import dynamic from "next/dynamic";
// import useTranslation from 'next-translate/useTranslation';
import { useRouter } from "next/router";
import Image from "next/image";
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Button = dynamic(() => import("@mui/material/Button"));
const Container = dynamic(() => import("@mui/material/Container"));
const Layout = dynamic(() => import("@/components/design/layout"));

import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
type ErrorProps = {
  statusCode: number;
};
type InitialProps = {
  res: any;
  err: any;
};

function Error({ statusCode }: ErrorProps) {
  // const { t, lang } = useTranslation()
  const router = useRouter();

  return (
    <Layout>
      <Grid
        sx={{
          backgroundColor: "#fcfcfc",
        }}
      >
        <Container sx={{ minHeight: "100vh", overflowY: "auto" }}>
          <Grid
            height={"100vh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Grid
                sx={{
                  width: { md: 600, xs: "100%" },
                  height: { md: 400, xs: 100 },
                  position: "relative",
                }}
              >
                <Image
                  priority={true}
                  src={"/static/images/common/_404.gif"}
                  alt={"404 Error"}
                  fill
                />
              </Grid>
              <Grid mt={4}>
                <Typography color={"primary"} variant="h5">
                  {statusCode
                    ? statusCode == 404
                      ? `404 - Page Not Found`
                      : `An error ${statusCode} occurred on server`
                    : "An error occurred on client"}
                </Typography>
              </Grid>
              <Grid mt={4}>
                <Button
                  variant="contained"
                  onClick={() => {
                    router.push("/", undefined);
                  }}
                  size="medium"
                  endIcon={<FaArrowRight />}
                >
                  home
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Layout>
  );
}

export const getStaticProps = ({ res, err }: InitialProps) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { props: { statusCode: statusCode } };
};

export default Error;
