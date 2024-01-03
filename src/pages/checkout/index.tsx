import { CartType } from "@/components/types/cart.types";
import UserAddresses from "@/components/widgets/address";
import { Box } from "@mui/material";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
const Layout = dynamic(() => import("@/components/design/layout"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const CardHeader = dynamic(() => import("@mui/material/CardHeader"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const CustomLink = dynamic(() => import("@/components/widgets/link"));

function Checkout(props: any) {
  const [cart, setCart] = useState<CartType[]>(props.cart);

  useEffect(() => {
    setCart(props.cart);
  }, [props.cart]);

  useEffect(() => {
    setCart(props.cart);
  }, []);

  // Function to calculate total
  const calculateLength = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const calculateTotal = cart.reduce(
    (total, item) => total + item?.product?.price * item.quantity,
    0
  );

  return (
    <Layout>
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={6}
      >
        <Grid
          container
          maxWidth={"lg"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card
              sx={{ width: 1, p: 2, backgroundColor: "transparent" }}
              elevation={0}
            >
              <CardHeader
                title={
                  <Typography variant={"h5"} fontWeight={500}>
                    Order (
                    {calculateLength + (calculateLength > 0 ? " items" : "")})
                  </Typography>
                }
              />
              <CardContent sx={{ p: { md: "inherit", xs: 0 } }}>
                {cart.map((item: CartType, key) => {
                  return (
                    <Card key={key} sx={{ borderRadius: 3, mt: 3 }}>
                      <CardContent>
                        <Grid
                          container
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Grid
                            item
                            md={9}
                            xs={12}
                            key={key}
                            display={"flex"}
                            alignItems={"center"}
                            gap={2}
                          >
                            <CustomLink
                              padding={0}
                              width={{ md: 100, xs: 60 }}
                              link
                              url={`/products/${item.product.slug}`}
                            >
                              <Box
                                component={"img"}
                                alt={"product-" + item.product.slug}
                                sx={{
                                  width: { md: 100, xs: 60 },
                                  height: { md: 100, xs: 60 },
                                  objectFit: "contain",
                                }}
                                src={item.product.thumbnail.url}
                              />
                            </CustomLink>
                            <Grid>
                              <Typography variant="caption">
                                {item?.product?.name}
                              </Typography>
                              <Typography variant="h6" fontWeight={"bold"}>
                                ${item?.product?.price}
                              </Typography>
                              <Typography variant="caption">
                                ${item?.product?.sku}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            md={3}
                            xs={12}
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"center"}
                            sx={{
                              mt: { md: "inherit", xs: 2 },
                              flexDirection: { md: "column", xs: "row" },
                              justifyContent: { xs: "space-between" },
                            }}
                          >
                            <Typography
                              sx={{ mt: { md: 2, xs: 0 } }}
                              fontWeight={"bold"}
                              variant="h6"
                            >
                              ${(item.quantity * item.product.price).toFixed(2)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: { md: 1, xs: 3 } }}>
            <Card elevation={2} sx={{ width: 1, position: "relative" }}>
              <CardContent>
                <Typography variant="h5" fontWeight={"bold"}>
                  Shipping Address
                </Typography>
                <UserAddresses />
              </CardContent>
            </Card>
            <Card elevation={2} sx={{ width: 1, mt: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight={"bold"}>
                  Order Summary
                </Typography>
                <Grid
                  mt={5}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  height={80}
                  mb={4}
                >
                  <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    color={"darkgrey"}
                  >
                    Total (
                    {calculateLength + (calculateLength > 0 ? " items" : "")})
                  </Typography>
                  <Typography variant="h6" fontWeight={"bold"}>
                    ${calculateTotal}
                  </Typography>
                </Grid>
                <Grid
                  mt={3}
                  bottom={15}
                  // maxWidth={300}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CustomLink
                    link
                    size={"large"}
                    padding={1.5}
                    url="/checkout"
                    type="contained"
                    color={"primary"}
                    title="Place order"
                    width={300}
                    endIcon={<FaArrowRight />}
                  />
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({ cart: state.cart.items });

Checkout.auth = true;
export default connect(mapStateToProps)(Checkout);
