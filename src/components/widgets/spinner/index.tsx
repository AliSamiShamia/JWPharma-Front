import themeColor from "@/components/constant/color";
import dynamic from "next/dynamic";
import React from "react";
const FadeLoader = dynamic(() =>
  import("react-spinners/FadeLoader").then((module) => module.default)
);
const Grid = dynamic(() =>
  import("@mui/material/Grid").then((module) => module.default)
);

interface ItemSpinnerInterface {
  loading: boolean;
}
function CustomSpinner({ loading }: ItemSpinnerInterface) {
  return (
    <>
      <Grid display={"flex"} justifyContent={"center"}>
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
