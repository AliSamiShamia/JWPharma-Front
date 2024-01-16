import themeColor from "@/components/constant/color";
import routeConfig from "@/components/constant/route";
import { CartType } from "@/components/types/cart.types";
import { UserType } from "@/components/types/user.types";
import UserAddresses from "@/components/widgets/address";
import ComponentSpinner from "@/components/widgets/spinner/component.spinner";
import { post } from "@/handler/api.handler";
import { useAppSelector } from "@/store/hooks";
import { Box, Chip } from "@mui/material";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
const Layout = dynamic(() => import("@/components/design/layout"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const CardHeader = dynamic(() => import("@mui/material/CardHeader"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const CustomLink = dynamic(() => import("@/components/widgets/link"));
const Product = dynamic(() => import("@/components/views/product"));

function Checkout(props: any) {
  const cart = props.cart as CartType[];
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = useAppSelector((state) => state.user.auth);

  // Function to calculate total
  const calculateLength = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const calculateTotal = cart.reduce(
    (total, item) => total + item?.product?.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    setLoading(true);
    try {
      const res = await post(routeConfig.order.placeorder, null, user.token);
      if (res && res.status_code == 200) {
        router.push(res.data.url);
      } else {
        Swal.fire({
          title: "Oops...",
          text: "Something went wrong, Please try again!",
          icon: "error",
        });
      }
      setLoading(false);
    } catch (e) {
      Swal.fire({
        title: "Oops...",
        text: "Something went wrong, Please try again!",
        icon: "error",
      });
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={6}
      >
        {!loading && calculateLength > 0 ? (
          <Grid
            container
            maxWidth={"lg"}
            display={"flex"}
            justifyContent={"center"}
            spacing={2}
          >
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Grid border={1} borderColor={themeColor.lightGreyColor}>
                <Grid
                  display={"flex"}
                  p={2}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  sx={{ backgroundColor: themeColor.lightGreyColor }}
                >
                  <Typography
                    variant="subtitle1"
                    textTransform={"capitalize"}
                    fontWeight={"bold"}
                    color={themeColor.textGreyColor}
                  >
                    Shopping Cart (
                    {calculateLength + (calculateLength > 0 ? " items" : "")})
                  </Typography>
                </Grid>
                {cart.map((item: CartType, key) => {
                  return (
                    <Grid
                      key={key}
                      px={1}
                      m={1}
                      py={2}
                      border={1}
                      borderColor={themeColor.lightGreyColor}
                    >
                      <Grid
                        container
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Grid
                          item
                          md={10}
                          xs={9}
                          key={key}
                          display={"flex"}
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
                                objectFit: "cover",
                              }}
                              src={item.product.thumbnail.url}
                            />
                          </CustomLink>
                          <Grid>
                            <Grid
                              display={"flex"}
                              flexDirection={"column"}
                              gap={2}
                            >
                              <Grid>
                                <Typography variant="body1" fontWeight={"bold"}>
                                  {item?.product?.name}
                                </Typography>
                                <Typography variant="body2" fontWeight={"bold"}>
                                  ${item?.product?.price}
                                  {item?.quantity > 0
                                    ? " x " + item?.quantity
                                    : ""}
                                </Typography>
                              </Grid>
                              <Grid display={"flex"}>
                                {item.options?.map((option, key1) => {
                                  return (
                                    <Chip
                                      sx={{ mx: 0.4 }}
                                      key={key1}
                                      color="primary"
                                      size="small"
                                      label={option.value}
                                    />
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          md={2}
                          xs={3}
                          display={"flex"}
                          flexDirection={"column"}
                          alignItems={"flex-end"}
                        >
                          <Typography fontWeight={"bold"} variant="body1">
                            ${(item.quantity * item.product.price).toFixed(2)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Grid
                sx={{
                  width: 1,
                  position: "relative",
                  border: 1,
                  borderColor: themeColor.lightGreyColor,
                }}
              >
                <Grid
                  width={1}
                  p={2}
                  sx={{ backgroundColor: themeColor.lightGreyColor }}
                >
                  <Typography
                    variant="subtitle1"
                    textTransform={"capitalize"}
                    fontWeight={"bold"}
                    color={themeColor.textGreyColor}
                  >
                    Shipping Address
                  </Typography>
                </Grid>
                <Grid p={1}>
                  <UserAddresses />
                </Grid>
              </Grid>
              <Grid
                sx={{
                  mt: 3,
                  width: 1,
                  position: "relative",
                  border: 1,
                  pb: 2,
                  borderColor: themeColor.lightGreyColor,
                }}
              >
                <Grid
                  width={1}
                  p={2}
                  sx={{ backgroundColor: themeColor.lightGreyColor }}
                >
                  <Typography
                    variant="subtitle1"
                    textTransform={"capitalize"}
                    fontWeight={"bold"}
                    color={themeColor.textGreyColor}
                  >
                    Order Summary
                  </Typography>
                </Grid>
                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  px={2}
                  my={1}
                >
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    color={themeColor.textGreyColor}
                  >
                    Number of items
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    color={themeColor.textGreyColor}
                  >
                    {calculateLength +
                      (calculateLength > 0
                        ? calculateLength > 1
                          ? " items"
                          : " item"
                        : "")}
                  </Typography>
                </Grid>
                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  px={2}
                  my={1}
                >
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    color={themeColor.textGreyColor}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    color={themeColor.textGreyColor}
                  >
                    ${calculateTotal.toFixed(2)}
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
                  {loading ? (
                    <ComponentSpinner loading={loading} />
                  ) : (
                    <CustomLink
                      action={placeOrder}
                      size={"large"}
                      padding={"auto"}
                      type="contained"
                      color={"primary"}
                      title="Place order"
                      width={200}
                      endIcon={<FaArrowRight />}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            minHeight={400}
            width={1}
            gap={5}
            border={1}
            borderColor={themeColor.lightGreyColor}
          >
            <Typography
              variant="h6"
              maxWidth={400}
              textAlign={"center"}
              textTransform={"capitalize"}
              color={themeColor.textOrange}
            >
              It seems your cart is currently empty. Feel free to browse through
              our range of products!
            </Typography>
            <Grid>
              <CustomLink
                type="contained"
                width={200}
                link
                url="/products"
                size={"large"}
                title="Start Shopping"
              />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Product perPage={4} />
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  cart: state.cart.items,
});

Checkout.auth = true;
export default connect(mapStateToProps)(Checkout);
