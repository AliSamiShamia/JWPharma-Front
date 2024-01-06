import themeColor from "@/components/constant/color";
import routeConfig from "@/components/constant/route";
import AddToCartWidget from "@/components/widgets/cart/add";
import CustomLink from "@/components/widgets/link";
import ProductOptions from "@/components/widgets/product/options";
import { get, post } from "@/handler/api.handler";
import { useAuth } from "@/hooks/useAuth";
import { addToCart } from "@/store/apps/cart";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const Layout = dynamic(() => import("@/components/design/layout"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Button = dynamic(() => import("@mui/material/Button"));
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
  const [loading, setLoading] = useState(true);
  const { slug } = router.query;
  const [product, setProduct] = useState({} as ProductType);
  const dispatch = useDispatch();
  const [options, setOptions] = useState([] as OptionItem[]);
  const [quantity, setQuantity] = useState(1);
  const auth = useAuth();
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await get(routeConfig.product.list + "/" + slug);
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
      if (auth.user) {
        setLoading(true);

        const res = await post(routeConfig.cart.store, {
          product_id: product.id,
          quantity: quantity,
          options: options,
        });
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
          <Grid container maxWidth={"xl"}>
            <Grid item lg={6} md={6} sm={12} xs={12} p={3}>
              <Fade {...properties}>
                {product.media.map((image, index) => (
                  <Box component={"div"} key={index}>
                    <Box
                      component={"img"}
                      alt={"product-" + index}
                      sx={{
                        width: "100%",
                        height: { xs: 250, sm: 500 },
                        objectFit: "cover",
                        borderRadius: "1rem",
                      }}
                      src={image.url}
                    />
                  </Box>
                ))}
              </Fade>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} p={2}>
              <Box display={"flex"}>
                {product.categories.map((item, key) => {
                  return (
                    <Grid key={key}>
                      <CustomLink
                        link
                        url={"/collection/products/" + item.slug}
                        padding={0}
                      >
                        <Typography fontStyle={"italic"} variant="caption">
                          {item.name}
                        </Typography>
                      </CustomLink>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                    </Grid>
                  );
                })}
              </Box>
              <Typography variant="h4">{product.name}</Typography>
              <Typography variant="caption" pl={1} color={themeColor.greyColor}>
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
                      variant="body1"
                      color={"#a3a3a3"}
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
                      variant="h6"
                      color={"primary"}
                      fontWeight={"bold"}
                    >
                      {product.price}$
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider flexItem />
              <Grid my={3}>
                <ProductOptions
                  options={options}
                  handleParamChange={handleParamChange}
                  product={product}
                />
              </Grid>
              <Divider flexItem />
              <Grid my={3}>
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
                  width={300}
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

export default ProductDetails;
