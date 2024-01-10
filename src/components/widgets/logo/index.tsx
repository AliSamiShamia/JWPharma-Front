import { LogoType } from "@/components/types/logo.types";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

function Logo({ color, size }: LogoType) {
  return (
    <Link href={"/"} variant="button">
      <Box
        component="img"
        sx={{ height: size ? size : { sm: 65, xs: 50 } }}
        alt="Logo"
        src={
          color == "white"
            ? "/static/images/common/white-logo.png"
            : "/static/images/common/logo.png"
        }
      />
    </Link>
  );
}

export default Logo;
