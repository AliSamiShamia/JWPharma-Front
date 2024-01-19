import { Box, IconButton, Stack, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Fade } from "react-slideshow-image";
import { MdAddShoppingCart } from "@react-icons/all-files/md/MdAddShoppingCart";
import { MdFavoriteBorder } from "@react-icons/all-files/md/MdFavoriteBorder";
import { MdFavorite } from "@react-icons/all-files/md/MdFavorite";
const Typography = dynamic(() => import("@mui/material/Typography"));
import "react-slideshow-image/dist/styles.css";
import { destroy, post } from "@/handler/api.handler";
import routeConfig from "@/components/constant/route";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/apps/cart";
import { addToWishlist, deleteFromWishlist } from "@/store/apps/wishlist";
import { useRouter } from "next/router";
import CustomLink from "@/components/widgets/link";
import { useAppSelector } from "@/store/hooks";
import { ClipLoader } from "react-spinners";
import themeColor from "@/components/constant/color";

type PropType = {
  product: ProductType;
  action: () => void;
};

function ProductItem({ product, action }: PropType) {
  const user = useAppSelector((state) => state.user.auth);
  const properties = {
    arrows: false,
    duration: 700,
    autoplay: false,
  };
  const theme = useTheme();
  const [imageLoaded, setImageLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { s } = router.query;

  const handleAddToCart = async () => {
    const convertedArray = Object.entries(product.params).map(
      ([key, value]) => {
        return { [key]: value };
      }
    );
    if (convertedArray.length > 0) {
      router.push({
        pathname: "/products/d",
        query: {
          slug: product.slug,
        },
      });
    } else {
      if (user.isAuth) {
        setAddToCartLoading(true);
        const res = await post(
          routeConfig.cart.store,
          {
            product_id: product.id,
            quantity: 1,
          },
          user.token
        );
        setAddToCartLoading(false);
        if (res && res.status_code == 200) {
          dispatch(
            addToCart({
              quantity: 1,
              product: product,
            })
          );
        }
      } else {
        router.push({
          pathname: "/login",
          query: {
            redirectURL: "/products/d?slug" + product.slug,
          },
        });
      }
    }
  };
  const handleDeteleFromWishlist = async () => {
    if (user.isAuth) {
      setWishlistLoading(true);
      const res = await destroy(
        routeConfig.wishlist.list + "/" + product.id,
        user.token
      );
      setWishlistLoading(false);
      if (res && res.status_code == 200) {
        dispatch(
          deleteFromWishlist({
            product: product,
          })
        );
        action();
      }
    } else {
      router.push({
        pathname: "/login",
        query: {
          redirectURL: "/products/d?slug" + product.slug,
        },
      });
    }
  };

  const handleAddToWishlist = async () => {
    if (user.isAuth) {
      setWishlistLoading(true);
      const res = await post(
        routeConfig.wishlist.list,
        {
          product_id: product.id,
        },
        user.token
      );
      setWishlistLoading(false);
      if (res && res.status_code == 200) {
        dispatch(
          addToWishlist({
            product: product,
          })
        );
        action();
      }
    } else {
      router.push({
        pathname: "/login",
        query: {
          redirectURL: "/products/d?slug" + product.slug,
        },
      });
    }
  };

  const handleAction = () => {
    if (s) {
      if (product.slug == s.toString()) {
      }
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    handleAction();
    return () => {};
  }, [router.route]);

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
        {wishlistLoading ? (
          <ClipLoader loading={true} />
        ) : (
          <IconButton
            color="primary"
            onClick={(e) =>
              product.is_fav
                ? handleDeteleFromWishlist()
                : handleAddToWishlist()
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {product.is_fav ? (
              <MdFavorite size={22} color={themeColor.secondary.dark} />
            ) : (
              <MdFavoriteBorder size={22} />
            )}
          </IconButton>
        )}
      </Box>
      <Fade {...properties}>
        {/* {product.media.map((image, index) => ( */}
        <Box component={"div"} display={"relative"}>
          <CustomLink
            padding={0}
            link
            url={`/products/d`}
            params={{
              slug: product.slug,
            }}
          >
            {imageLoaded && product.thumbnail.url ? (
              <Box
                zIndex={99999}
                position={"absolute"}
                top={0}
                bottom={0}
                left={0}
                right={0}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  backgroundColor: "#00000077",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
              >
                <ClipLoader loading={true} />
              </Box>
            ) : null}
            {product.thumbnail.url ? (
              <Box
                component={"img"}
                onLoad={() => {
                  setImageLoading(false);
                }}
                onLoadStartCapture={() => {
                  setImageLoading(true);
                }}
                alt={"product-" + product.name}
                sx={{
                  width: "100%",
                  height: { xs: 250, sm: 300 },
                  objectFit: "cover",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
                src={product.thumbnail.url}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: themeColor.lightGreyColor,
                  height: { xs: 250, sm: 300 },
                  objectFit: "cover",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
              />
            )}
          </CustomLink>
        </Box>
        {/* ))} */}
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
          bottom={0}
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
          {product.stock > 0 ? (
            addToCartLoading ? (
              <ClipLoader loading={true} />
            ) : (
              <IconButton
                color="primary"
                onClick={handleAddToCart}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MdAddShoppingCart size={22} />
              </IconButton>
            )
          ) : null}
        </Box>
      </Box>

      <Stack
        direction={"column"}
        alignItems={"start"}
        paddingRight={1}
        paddingLeft={1}
      >
        <Typography color={"black"} width={280}>
          {product.name}
        </Typography>
        <Stack
          direction={"row"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          gap={1}
          py={1}
        >
          <Typography color={"black"} fontWeight={"bold"}>
            {product.price}$
          </Typography>
          {product.price != product.pre_price && (
            <Typography
              // m={1}
              color={"#8C0013"}
              fontSize={14}
              sx={{ textDecoration: "line-through" }}
            >
              {product.pre_price}$
            </Typography>
          )}
        </Stack>
        {product.stock > 0 && product.stock <= 5 && (
          <Typography
            color={theme.palette.warning.main}
            variant="caption"
            pb={2}
          >
            Almost sold out!!
          </Typography>
        )}
        {product.stock == 0 && (
          <Typography color={theme.palette.error.main} variant="caption" pb={2}>
            Item out of stock
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default ProductItem;
