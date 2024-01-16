import React from "react";
import { BannerType } from "@/components/types/banner.types";
import dynamic from "next/dynamic";
import "react-slideshow-image/dist/styles.css";
import Box from "@mui/material/Box";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import { Grid } from "@mui/material";
const Fade = dynamic(() =>
  import("react-slideshow-image").then((module) => module.Fade)
);
const CustomLink = dynamic(() => import("@/components/widgets/link"));
const Typography = dynamic(() => import("@mui/material/Typography"));

const properties = {
  arrows: false,
  duration: 3000,
};

function Banner({ data }: BannerType) {
  return (
    <Box sx={{ mt: 1 }}>
      <Box component={"div"} position={"relative"} className="slide-container">
        <Fade {...properties}>
          {data.map((image, index) => (
            <Box
              component={"div"}
              key={index}
              sx={{
                "&::before": {
                  content: "''",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "#00000055",
                  width: "100%",
                  height: "100%",
                  zIndex: 9999,
                },
              }}
            >
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
              <Box
                position={"absolute"}
                top={0}
                left={0}
                sx={{
                  width: { sm: "50%", xs: "100%" },
                  height: "100%",
                  zIndex: 9999,
                  display: "flex",
                  alignItems: "center",
                  p: 5,
                }}
              >
                <Box>
                  <Typography
                    color={"white"}
                    variant="h3"
                    sx={{}}
                    mb={3}
                    textTransform={"uppercase"}
                  >
                    {image.title}
                  </Typography>
                  <Typography
                    color={"white"}
                    variant="subtitle1"
                    maxWidth={500}
                  >
                    {image.subtitle}
                  </Typography>
                  <Grid my={2}>
                    <CustomLink
                      url={"/collection"}
                      width={300}
                      padding={"auto"}
                      link={true}
                      title="SHOP ALL"
                      endIcon={<FaArrowRight />}
                      type="outlined"
                      color={"light"}
                      size={"large"}
                    />
                  </Grid>
                </Box>
              </Box>
            </Box>
          ))}
        </Fade>
      </Box>
    </Box>
  );
}

export default Banner;
