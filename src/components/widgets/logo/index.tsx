import { LogoType } from "@/components/types/logo.types";
import Box from "@mui/material/Box";
import React from "react";

function Logo(props: LogoType) {
  return (
    <Box
      component="img"
      sx={{ height: { sm: 65, xs: 50 } }}
      alt="Logo"
      src={"/static/images/common/logo.jpg"}
    />
  );
}

export default Logo;
