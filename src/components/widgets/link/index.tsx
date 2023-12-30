import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
const Link = dynamic(() => import("next/link"));
const Button = dynamic(() => import("@mui/material/Button"));
const Box = dynamic(() => import("@mui/material/Box"));
import { OverridableStringUnion } from "@mui/types";
import themeColor from "@/components/constant/color";

type PropType = {
  url?: string;
  title?: string;
  color?: any;
  size?: any;
  type?: OverridableStringUnion<"text" | "outlined" | "contained">;
  target?: string;
  link?: boolean;
  action?: () => any;
  children?: ReactNode;
  padding?: any;
  params?: any;
  endIcon?: any;
  startIcon?: any;
  width?: any;
};
function CustomLink({
  url,
  title,
  color,
  type,
  target,
  size,
  link,
  action,
  children,
  padding,
  params,
  endIcon,
  startIcon,
  width,
}: PropType) {
  return (
    <Box sx={{ width: width ?? "100%" }}>
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
            size={size ? size : "medium"}
            sx={{
              borderRadius: 6,
              borderWidth: 1,
              width: "100%",
              fontWeight: "bold",
              p: padding >= 0 ? padding : "auto",
              "&:hover": {
                backgroundColor: "transparent",
                color: themeColor.primary.dark,
              },
            }}
            color={color}
            endIcon={endIcon}
            startIcon={startIcon}
          >
            {children ? children : title}
          </Button>
        </Link>
      ) : (
        <Button
          onClick={action}
          size={size ? size : "medium"}
          variant={type}
          sx={{
            borderRadius: 6,
            width: "100%",
            p: padding ? padding : "auto",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "transparent",
              color: themeColor.primary.dark,
            },
          }}
          color={color}
          endIcon={endIcon}
          startIcon={startIcon}
        >
          {children ? children : title}
        </Button>
      )}
    </Box>
  );
}

export default CustomLink;
