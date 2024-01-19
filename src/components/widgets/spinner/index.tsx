import themeColor from "@/components/constant/color";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
const FadeLoader = dynamic(() =>
  import("react-spinners/FadeLoader").then((module) => module.default)
);
const Grid = dynamic(() =>
  import("@mui/material/Grid").then((module) => module.default)
);

interface ItemSpinnerInterface {
  loading: boolean;
  children?: ReactNode;
}
function CustomSpinner({ loading, children }: ItemSpinnerInterface) {
  return (
    <>
      <Grid
        container
        display={"flex"}
        direction="column"
        justifyContent="center"
        alignItems="center"
        border={1}
        position={"fixed"}
        top={0}
        left={0}
        bottom={0}
        right={0}
        zIndex={10000}
      >
        <Box sx={{ mb: 2 }}>{children}</Box>
        <FadeLoader
          color={themeColor.secondary.main}
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Grid>
    </>
  );
}

export default CustomSpinner;
