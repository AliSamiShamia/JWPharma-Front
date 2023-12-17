import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
const Link = dynamic(() => import("next/link"));
const Button = dynamic(() => import("@mui/material/Button"));
const Box = dynamic(() => import("@mui/material/Box"));
import { OverridableStringUnion } from "@mui/types";

type PropType = {
  url?: string;
  title?: string;
  color?: OverridableStringUnion<
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
  >;
  type?: OverridableStringUnion<"text" | "outlined" | "contained">;
  target?: string;
  link?: boolean;
  action?: () => any;
  children?: ReactNode;
  params?: any;
};
function CustomLink({
  url,
  title,
  color,
  type,
  target,
  link,
  action,
  children,
  params,
}: PropType) {
  return (
    <Box m={1}>
      {link ? (
        <Link
          href={{
            pathname: url,
            query: params,
          }}
          target={target}
        >
          <Button
            variant={type}
            sx={{ borderRadius: 6, width: "100%" }}
            color={color}
          >
            {children ? children : title}
          </Button>
        </Link>
      ) : (
        <Button
          onClick={action}
          variant={type}
          sx={{ borderRadius: 6, width: "100%" }}
          color={color}
        >
          {children ? children : title}
        </Button>
      )}
    </Box>
  );
}

export default CustomLink;
