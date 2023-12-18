import React from "react";
import { BannerType } from "@/components/types/banner.types";
import dynamic from "next/dynamic";
import "react-slideshow-image/dist/styles.css";
import Box from "@mui/material/Box";

const Fade = dynamic(() =>
  import("react-slideshow-image").then((module) => module.Fade)
);

const properties = {
  arrows: false,
  duration: 3000,
};

function Banner({ data }: BannerType) {
  return (
    <Box sx={{ mt: 1 }}>
      <Box component={"div"} className="slide-container">
        <Fade {...properties}>
          {data.map((image, index) => (
            <Box component={"div"} key={index}>
              <Box
                component={"img"}
                alt={"Banner-" + image.title}
                sx={{
                  width: "100%",
                  maxHeight: { xs: 500, sm: 600 },
                  objectFit: "cover",
                }}
                src={image.url}
              />
            </Box>
          ))}
        </Fade>
      </Box>
    </Box>
  );
}

export default Banner;
