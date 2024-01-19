import themeColor from "@/components/constant/color";
import { CartType } from "@/components/types/cart.types";
import { initCart, resetCart } from "@/store/apps/cart";
import { useAppDispatch } from "@/store/hooks";
import { Box } from "@mui/material";
import { FaMinus } from "@react-icons/all-files/fa/FaMinus";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { connect } from "react-redux";
import { destroy, post } from "@/handler/api.handler";
import routeConfig from "@/components/constant/route";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import ComponentSpinner from "@/components/widgets/spinner/component.spinner";
import { UserType } from "@/components/types/user.types";
import { useAuth } from "@/hooks/useAuth";
const Layout = dynamic(() => import("@/components/design/layout"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const Chip = dynamic(() => import("@mui/material/Chip"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Divider = dynamic(() => import("@mui/material/Divider"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const CustomLink = dynamic(() => import("@/components/widgets/link"));
const Product = dynamic(() => import("@/components/views/product"));

function Cart(props: any) {
  const cart = props.cart as CartType[];
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const dispatch = useAppDispatch();

  // Function to calculate total
  const calculateLength = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const calculateTotal = cart.reduce(
    (total, item) => total + item?.product?.price * item.quantity,
    0
  );

  const clearCart = async () => {
    try {
      setLoading(true);
      const res = await destroy(routeConfig.cart.clear, auth.user?.token);
      if (res && res.status_code == 200) {
        dispatch(resetCart(res.data));
        Swal.fire({
          text: "Your cart have been successfully deleted.",
          icon: "success",
        });
      } else {
        Swal.fire({
          text: "Error detected. Please try again.",
          icon: "error",
        });
      }
      setLoading(false);
    } catch (e) {
      Swal.fire({
        text: "Error detected. Please try again.",
        icon: "error",
      });
      setLoading(false);
    }
  };

  const clearFromCart = async (id: number) => {
    try {
      setLoading(true);
      const res = await destroy(routeConfig.cart.list + "/" + id, auth.user?.token);
      if (res && res.status_code == 200) {
        console.log(res.data);
        dispatch(resetCart(res.data));
        Swal.fire({
          text: "Your cart have been successfully updated.",
          icon: "success",
        });
      } else {
        Swal.fire({
          text: "Error detected. Please try again.",
          icon: "error",
        });
      }
      setLoading(false);
    } catch (e) {
      Swal.fire({
        text: "Error detected. Please try again.",
        icon: "error",
      });
      setLoading(false);
    }
  };

  const handleAction = async (
    id: number,
    quantity: number,
    type = true //1 is increase , 0 is decrease
  ) => {
    // quantity
    setUpdateLoading(true);
    if (quantity == 1 && !type) {
      const res = await destroy(routeConfig.cart.list + "/" + id, auth.user?.token);
      if (res && res.status_code == 200) {
        dispatch(initCart(res.data));
      }
      setUpdateLoading(false);
    } else {
      let newQuantity = type ? quantity + 1 : quantity - 1;
      const res = await post(
        routeConfig.cart.quantity + "/" + id,
        {
          quantity: newQuantity,
        },
        auth.user?.token
      );
      if (res && res.status_code == 200) {
        dispatch(initCart(res.data));
      }
      setUpdateLoading(false);
    }
  };

  return (
    <Layout>
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        mt={6}
      >
        <Grid container maxWidth={"lg"} justifyContent={"center"} spacing={2}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            {loading ? (
              <Grid display={"flex"} justifyContent={"center"}>
                <ComponentSpinner size={14} loading={true} />
              </Grid>
            ) : calculateLength > 0 ? (
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
                  <CustomLink
                    width={"auto"}
                    padding={"auto"}
                    title="Clear Cart"
                    action={clearCart}
                    type="contained"
                    color={"error"}
                  />
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
                            width={{ md: 150, xs: 60 }}
                            link
                            url={`/products/d`}
                            params={{
                              slug:item.product.slug
                            }}
                          >
                            <Box
                              component={"img"}
                              alt={"product-" + item.product.slug}
                              sx={{
                                width: { md: 150, xs: 60 },
                                height: { md: 150, xs: 60 },
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
                                <Typography variant="body2" fontWeight={"bold"}>
                                  {item?.product?.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  fontWeight={"bold"}
                                >
                                  ${item?.product?.price}
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
                              <Grid
                                display={"flex"}
                                gap={2}
                                alignItems={"center"}
                              >
                                <Grid
                                  display={"flex"}
                                  gap={1}
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  border={1}
                                  borderRadius={3}
                                  px={1}
                                  py={0.5}
                                  borderColor={themeColor.borderColor}
                                >
                                  {updateLoading ? (
                                    <ClipLoader size={20} loading={true} />
                                  ) : (
                                    <>
                                      <IconButton
                                        size="small"
                                        color={
                                          item.quantity == 1
                                            ? "error"
                                            : "inherit"
                                        }
                                        onClick={() => {
                                          handleAction(
                                            item.id,
                                            item.quantity,
                                            false
                                          );
                                        }}
                                      >
                                        {item.quantity == 1 ? (
                                          <FaTrash size={14} />
                                        ) : (
                                          <FaMinus size={14} />
                                        )}
                                      </IconButton>
                                      <Typography
                                        variant="body2"
                                        px={1}
                                        fontWeight={"bold"}
                                        color={themeColor.primary.dark}
                                      >
                                        {item.quantity}
                                      </Typography>

                                      <IconButton
                                        size="small"
                                        onClick={() => {
                                          handleAction(
                                            item.id,
                                            item.quantity,
                                            true
                                          );
                                        }}
                                      >
                                        <FaPlus size={14} />
                                      </IconButton>
                                    </>
                                  )}
                                </Grid>
                                <Divider flexItem orientation="vertical" />
                                <CustomLink
                                  width={"auto"}
                                  padding={"auto"}
                                  title="Delete"
                                  action={() => {
                                    clearFromCart(item.id);
                                  }}
                                  type="text"
                                  size={"small"}
                                />
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
                  It seems your cart is currently empty. Feel free to browse
                  through our range of products!
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
          {calculateLength > 0 ? (
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
                    {calculateLength + (calculateLength > 0 ? " items" : "")}
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
                {auth.user?.has_permission ? (
                  <Grid
                    my={3}
                    bottom={15}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <CustomLink
                      link
                      size={"large"}
                      url={auth.user?.complete_info ? "/checkout" : "/account"}
                      params={
                        auth.user?.complete_info
                          ? {}
                          : {
                              complete: true,
                            }
                      }
                      type="contained"
                      color={"primary"}
                      title={
                        auth.user?.complete_info ? "Checkout" : "Complete your info"
                      }
                      width={200}
                      endIcon={<FaArrowRight />}
                    />
                  </Grid>
                ) : (
                  <Grid
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    textAlign={"center"}
                  >
                    <Typography variant="caption" color={"error"}>
                      Apologies, you&apos;re currently unable to proceed with the
                      checkout.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          ) : null}
        </Grid>
        {/* <Product perPage={8} /> */}
      </Grid>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  cart: state.cart.items,
  user: state.user.auth,
});

export default connect(mapStateToProps)(Cart);
