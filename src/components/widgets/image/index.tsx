import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

type PropType = {
  height: any;
  url: string;
  alt: string;
};
function CustomImage(props: PropType) {
  return (
    <Box
      sx={{
        height: props.height,
        width: "100%",
        position: "relative",
        "&:hover": { transform: "scale(1.12)" },
      }}
    >
      <Box
        sx={{
          display: "block",
          overflow: "hidden",
          transition: "transform 1s linear ",
        }}
      >
        <Image
          objectFit="cover"
          objectPosition="50% 50%"
          src={props.url}
          fill
          alt={props.alt}
        />
      </Box>
    </Box>
  );
}

export default CustomImage;
