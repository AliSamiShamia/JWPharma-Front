import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Fade } from "react-slideshow-image";
import { MdAddShoppingCart } from "@react-icons/all-files/md/MdAddShoppingCart";
import { MdFavoriteBorder } from "@react-icons/all-files/md/MdFavoriteBorder";
const Typography = dynamic(() => import("@mui/material/Typography"));
import "react-slideshow-image/dist/styles.css";
import { get } from "@/handler/api.handler";
import routeConfig from "@/components/constant/route";
import CustomSpinner from "@/components/widgets/spinner";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/apps/cart";

function ProductItem(product: ProductType) {
  const properties = {
    arrows: false,
    duration: 700,
    autoplay: false,
  };

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCart = async (event: any) => {
    dispatch(
      addToCart({
        quantity: 1,
        id: product.id,
      })
    );
    event.preventDefault();
    setLoading(true);
    const res = await get(routeConfig.product.list, {
      productId: product.id,
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
      {loading && <CustomSpinner loading={true}></CustomSpinner>}
      <Box
        width={35}
        height={35}
        position={"absolute"}
        top={10}
        right={10}
        sx={{
          backgroundColor: "rgba(255,255,255,0.6)",
          verticalAlign: "middle",
        }}
        zIndex={10}
        fontSize={30}
        boxShadow={5}
        borderRadius={"100%"}
        padding={0}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <a href="#">
          <MdFavoriteBorder size={22} />
        </a>
      </Box>
      <Fade {...properties}>
        {product.media.map((image, index) => (
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
        ))}
      </Fade>
      <Box
        pb={1}
        width={"100%"}
        // height={"100%"}
        zIndex={50}
        position={"relative"}
      >
        <Box
          position={"absolute"}
          bottom={60}
          right={15}
          width={40}
          height={40}
          sx={{ backgroundColor: "rgba(255,255,255)" }}
          zIndex={10}
          fontSize={"2rem"}
          boxShadow={5}
          borderRadius={"50%"}
          padding={0}
          textAlign={"center"}
        >
          {product.stock == 0 ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdAddShoppingCart size={22} />
            </div>
          ) : (
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
              }}
            >
              <MdAddShoppingCart size={22} />
            </a>
          )}
        </Box>
        <Stack
          direction={"column"}
          alignItems={"start"}
          paddingRight={1}
          paddingLeft={1}
        >
          <Typography color={"black"}>
            {product.name + " " + product.name}
          </Typography>
          <Stack
            direction={"row"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color={"black"} m={1}>
              {product.price}$
            </Typography>
            {product.price != product.pre_price && (
              <Typography
                m={1}
                color={"#8C0013"}
                fontSize={14}
                sx={{ textDecoration: "line-through" }}
              >
                {product.pre_price}$
              </Typography>
            )}
          </Stack>
          {product.stock > 0 && product.stock <= 5 && (
            <Typography color={"black"}>Almost sold out!!</Typography>
          )}
          {product.stock == 0 && (
            <Typography color={"black"}>Item out of stock</Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

export default ProductItem;
