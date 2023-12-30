import routeConfig from "@/components/constant/route";
import CustomLink from "@/components/widgets/link";
import { get } from "@/handler/api.handler";
import { addToCart } from "@/store/apps/cart";
import { Box, Divider, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const Layout = dynamic(() => import("@/components/design/layout"));
const Grid = dynamic(() => import("@mui/material/Grid"));
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

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

  return (
    <Layout>
      {loading ? (
        <ComponentSpinner loading={loading} />
      ) : (
        <Grid
          p={3}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Grid container maxWidth={"xl"}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
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
                        borderTopLeftRadius: "1rem",
                        borderTopRightRadius: "1rem",
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
                    <>
                      <Grid>
                        <CustomLink
                          link
                          url={"/collection/products/" + item.slug}
                          padding={0}
                        >
                          <Typography variant="caption">{item.name}</Typography>
                        </CustomLink>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                      </Grid>
                    </>
                  );
                })}
              </Box>
              <Typography variant="h4">{product.name}</Typography>
              <Typography variant="caption">SKU: {product.sku}</Typography>
              <Grid mt={2} p={1} maxWidth={300}>
                {product.price != product.pre_price && (
                  <Grid
                    width={1}
                    display={"flex"}
                    alignItems={"center"}
                    alignContent={"flex-start"}
                  >
                    <Typography variant="body1" color={"#a3a3a3"} width={80}>
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
                <Grid display={"flex"} alignItems={"center"}>
                  <Typography variant="body1" color={"#a3a3a3"} width={80}>
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

              <Grid display={"flex"} justifyContent={"center"} mt={6}>
                <CustomLink
                  action={() => {
                    dispatch(
                      addToCart({
                        product: product,
                        quantity: 1,
                      })
                    );
                  }}
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
