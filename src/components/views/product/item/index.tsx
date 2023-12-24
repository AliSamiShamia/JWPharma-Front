import { ProductType } from "@/components/types/product.types";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Fade } from "react-slideshow-image";
import { MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md";
const Typography = dynamic(() => import("@mui/material/Typography"));
import "react-slideshow-image/dist/styles.css";
import { get } from "@/handler/api.handler";
import routeConfig from "@/components/constant/route";
import CustomSpinner from "@/components/widgets/spinner";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/apps/cart";

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

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleAddToCart = async (event: any) => {
        dispatch(addToCart({
            quantity: 1,
            id: id
        }))
        event.preventDefault();
        setLoading(true);
        const res = await get(routeConfig.product.list, {
            productId: id,
        });
        setLoading(false);
        if (res && res.status_code == 200) {
        }
    };
    return (
        <Box
            component={"div"}
            position={"relative"}
            style={{
                backgroundColor: "#F7F7FA",
            }}
            borderRadius={"1rem"}
            height={"100%"}
        >
            {
                loading &&
                <CustomSpinner loading={true}></CustomSpinner>
            }
            <Box
                width={35}
                height={35}
                position={"absolute"}
                top={"0.75rem"}
                right={"0.75rem"}
                sx={{ backgroundColor: "rgba(255,255,255,0.6)", verticalAlign: "middle" }}
                zIndex={10}
                fontSize={30}
                boxShadow={5}
                borderRadius={"50%"}
                padding={0}
                textAlign={"center"}
            >
                <a href="#"
                    style={{
                        position: "absolute",
                        left: 0,
                        width: "100%",
                        color: "#8C0013",
                    }}><MdFavoriteBorder /></a>
            </Box>
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
                                borderTopLeftRadius: "1rem",
                                borderTopRightRadius: "1rem",
                            }}
                            src={image.url}
                        />
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
                                borderTopLeftRadius: "1rem",
                                borderTopRightRadius: "1rem",
                            }}
                            src="https://b797b0-3.myshopify.com/cdn/shop/collections/pexels-photo-3762881.webp?v=1702016304&width=1100"
                        />
                    </Box>}
            </Fade>
            <Box
                pb={1}
                width={"100%"}
                height={"100%"}
                zIndex={50}
                position={"relative"}
            >
                <Box
                    position={"absolute"}
                    top={"-2rem"}
                    right={"0.5rem"}
                    width={"3.5rem"}
                    height={"3.5rem"}
                    sx={{ backgroundColor: "rgba(255,255,255)" }}
                    zIndex={10}
                    fontSize={"2rem"}
                    boxShadow={5}
                    borderRadius={"50%"}
                    padding={0}
                    textAlign={"center"}
                >
                    {stock == 0 ?
                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                height: "100%",
                                fontSize: "2rem",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            <MdAddShoppingCart />
                        </div> :
                        <a
                            href="#"
                            onClick={(e) => handleAddToCart(e)}
                            style={{
                                display: "flex",
                                width: "100%",
                                height: "100%",
                                fontSize: "2rem",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            <MdAddShoppingCart />
                        </a>
                    }

                </Box>
                <Stack direction={"column"} alignItems={"start"} paddingRight={1} paddingLeft={1}>
                    <Typography color={"black"}>{name}</Typography>
                    <Stack direction={"row"} width={"100%"} justifyContent={"space-evenly"}>
                        <Typography color={"black"}>{price}$</Typography>
                        {price != pre_price && <Typography color={"#8C0013"} style={{ textDecoration: "line-through" }}>{pre_price}$</Typography>}
                    </Stack>
                    {(stock > 0 && stock <= 5) && <Typography color={"black"}>Almost sold out!!</Typography>}
                    {stock == 0 && <Typography color={"black"}>Item out of stock</Typography>}
                </Stack>
            </Box>
        </Box >
    );
}

export default ProductItem;
