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
                style={{ width: "100%" }}
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
