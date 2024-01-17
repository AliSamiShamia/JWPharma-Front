import themeColor from "@/components/constant/color";
import routeConfig from "@/components/constant/route";
import AddToCartWidget from "@/components/widgets/cart/add";
import CustomLink from "@/components/widgets/link";
import ProductOptions from "@/components/widgets/product/options";
import { destroy, get, post } from "@/handler/api.handler";
import { addToCart } from "@/store/apps/cart";
import { addToWishlist, deleteFromWishlist } from "@/store/apps/wishlist";
import { useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
const Layout = dynamic(() => import("@/components/design/layout"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Divider = dynamic(() => import("@mui/material/Divider"));
const Typography = dynamic(() => import("@mui/material/Typography"));
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Swal from "sweetalert2";

const ComponentSpinner = dynamic(
  () => import("@/components/widgets/spinner/component.spinner")
);

const properties = {
  arrows: true,
  duration: 700,
  autoplay: true,
};

function ProductDetails() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.auth);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const { slug } = router.query;
  const [product, setProduct] = useState({} as ProductType);
  const dispatch = useDispatch();
  const [options, setOptions] = useState([] as OptionItem[]);
  const [quantity, setQuantity] = useState(1);
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await get(routeConfig.product.list + "/" + slug, user.token);
      setLoading(false);
      if (res && res.status_code == 200) {
        setProduct(res.data);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (document.readyState == "complete") {
      loadData();
    }
    return () => {};
  }, [slug]);

  const handleAddToCart = async () => {
    if (product.params.length > 0 && options.length == 0) {
      Swal.fire({
        icon: "warning",
        text: "Before adding items to your cart, kindly select your preferred options",
        confirmButtonColor: themeColor.primary.dark,
      });
    } else {
      if (user.isAuth) {
        setLoading(true);
        let data = {
          product_id: product.id,
          quantity: quantity,
          options: options,
        };
        const res = await post(routeConfig.cart.store, data, user.token);
        setLoading(false);
        if (res && res.status_code == 200) {
          dispatch(
            addToCart({
              quantity: quantity,
              product: product,
            })
          );
        }
      } else {
        router.push({
          pathname: "/login",
          query: {
            redirectURL: "/products/" + product.slug,
            options: JSON.stringify(options),
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
      }
    } else {
      router.push({
        pathname: "/login",
        query: {
          redirectURL: "/products/" + product.slug,
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
      }
    } else {
      router.push({
        pathname: "/login",
        query: {
          redirectURL: "/products/" + product.slug,
        },
      });
    }
  };

  const handleParamChange = (option: OptionItem) => {
    let newOptions = options.filter((item) => item.id != option.id);
    newOptions.push(option);
    setOptions(newOptions);
  };

  return (
    <Layout>
      {loading ? (
        <ComponentSpinner loading={loading} />
      ) : (
        <Grid p={3} display={"flex"} justifyContent={"center"}>
          <Grid container maxWidth={"xl"} spacing={2} my={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Fade {...properties}>
                {product.media.map((image, index) => (
                  <Box component={"div"} key={index}>
                    <Box
                      component={"img"}
                      alt={"product-" + index}
                      sx={{
                        width: "100%",
                        height: { sm: 500, xs: 250 },
                        objectFit: "cover",
                        borderRadius: "1rem",
                      }}
                      src={image.url}
                    />
                  </Box>
                ))}
              </Fade>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box display={"flex"}>
                {product.categories.map((item, key) => {
                  return (
                    <Grid
                      key={key}
                      py={0}
                      display={"flex"}
                      gap={1}
                      alignItems={"center"}
                    >
                      <CustomLink
                        link
                        type="text"
                        width={"auto"}
                        url={"/collection/products/" + item.slug}
                        padding={0}
                      >
                        <Typography variant="caption">{item.name}</Typography>
                      </CustomLink>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        sx={{
                          height: 20,
                          borderColor: themeColor.greyColor,
                        }}
                        flexItem
                      />
                    </Grid>
                  );
                })}
              </Box>
              <Grid display={"flex"} justifyContent={"space-between"}>
                <Typography variant="subtitle1" fontWeight={"bold"}>
                  {product.name}
                </Typography>

                <CustomLink
                  action={
                    product.is_fav
                      ? handleDeteleFromWishlist
                      : handleAddToWishlist
                  }
                  title={
                    product.is_fav ? "Remove from Wishlist" : "Add To Wishlist"
                  }
                  width={250}
                  padding={"auto"}
                  type="contained"
                  size={"small"}
                  color={product.is_fav ? "error" : "primary"}
                />
              </Grid>
              <Typography variant="caption" color={themeColor.greyColor}>
                SKU: {product.sku}
              </Typography>
              <Grid mt={2} p={1}>
                {product.price != product.pre_price && (
                  <Grid
                    width={1}
                    display={"flex"}
                    alignItems={"center"}
                    alignContent={"flex-start"}
                  >
                    <Typography variant="caption" color={"#a3a3a3"} width={80}>
                      Was:
                    </Typography>
                    <Typography
                      variant="caption"
                      color={"#a3a3a3"}
                      fontStyle={"italic"}
                      sx={{
                        textDecoration: "line-through",
                      }}
                    >
                      {product.pre_price}$
                    </Typography>
                  </Grid>
                )}
                <Grid display={"flex"} alignItems={"center"} mb={1}>
                  <Typography variant="caption" color={"#a3a3a3"} width={80}>
                    Now:
                  </Typography>
                  <Grid display={"flex"} alignItems={"center"} gap={1}>
                    <Typography
                      variant="body1"
                      color={"primary"}
                      fontWeight={"bold"}
                    >
                      {product.price}$
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {product.params.length > 0 ? (
                <>
                  <Divider flexItem />
                  <Grid my={2}>
                    <ProductOptions
                      options={options}
                      handleParamChange={handleParamChange}
                      product={product}
                    />
                  </Grid>
                </>
              ) : null}
              <Divider flexItem />
              <Grid my={1}>
                <AddToCartWidget
                  product={product}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </Grid>
              <Grid display={"flex"} justifyContent={"center"} mt={6}>
                <CustomLink
                  action={handleAddToCart}
                  title="Add To Cart"
                  width={200}
                  padding={"auto"}
                  type="contained"
                  size={"large"}
                  color={"primary"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
const mapStateToProps = (state: any) => ({
  wishlist: state.wishlist.products,
  user: state.user.auth,
});
export default connect(mapStateToProps)(ProductDetails);
