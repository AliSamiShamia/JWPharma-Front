import { ProductType } from "@/components/types/product.types";
import { Box, Grid } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import { Fade } from "react-slideshow-image";
const Typography = dynamic(() => import("@mui/material/Typography"));
import "react-slideshow-image/dist/styles.css";

const Slide = dynamic(() =>
    import("react-slideshow-image").then((module) => module.Slide)
);

function ProductItem({
    id,
    slug,
    name,
    images,
    sku,
    description,
    brief,
    price,
    pre_price,
    weight,
    is_trending,
    is_featured,
    stock,
    discount }: ProductType) {
    const properties = {
        arrows: images.length > 1 ? true : false,
        duration: 700,
        autoplay: false,
    };
    return (
        <>
            <Fade {...properties}>
                {images.length > 0 ? images.map((image, index) => (
                    <Box component={"div"} key={index}>
                        <Box
                            component={"img"}
                            alt={"product-" + name}
                            sx={{
                                width: "100%",
                                height: { xs: 250, sm: 300 },
                                objectFit: "cover",
                            }}
                            src={image.url}
                            borderRadius={"1.5rem"}
                        />

                        <Box
                            mt={2}
                            borderRadius={2}
                            width={"100%"}
                            height={"100%"}
                            zIndex={9999}
                            textAlign={"center"}
                        >
                            <Typography color={"black"}>{name}</Typography>
                        </Box>
                    </Box>
                )) :
                    <Box component={"div"}>
                        <Box
                            component={"img"}
                            alt={"product-" + name}
                            sx={{
                                width: "100%",
                                height: { xs: 250, sm: 300 },
                                objectFit: "cover",
                            }}
                            borderRadius={"1.5rem"}
                            src="https://b797b0-3.myshopify.com/cdn/shop/collections/pexels-photo-3762881.webp?v=1702016304&width=1100"
                        />

                        <Box
                            mt={2}
                            borderRadius={2}
                            width={"100%"}
                            height={"100%"}
                            zIndex={9999}
                            textAlign={"center"}
                        >
                            <Typography color={"black"}>{name}</Typography>
                        </Box>
                    </Box>}
            </Fade>
        </>
    );
}

export default ProductItem;
