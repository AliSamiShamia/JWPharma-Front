import { LogoType } from "@/components/types/logo.types";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

function Logo(props: LogoType) {
  return (
    <Link href={"/"} variant="button">
      <Box
        component="img"
        sx={{ height: { sm: 65, xs: 50 } }}
        alt="Logo"
        src={"/static/images/common/logo.jpg"}
      />
    </Link>
  );
}

export default Logo;
