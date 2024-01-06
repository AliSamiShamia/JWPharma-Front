import themeColor from "@/components/constant/color";
import { CartType } from "@/components/types/cart.types";
import {
  addToCart,
  decrementQantity,
  deleteFromCart,
  incrementQuantity,
  initCart,
} from "@/store/apps/cart";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Chip, IconButton } from "@mui/material";
import { FaMinus } from "@react-icons/all-files/fa/FaMinus";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { destroy, get, post } from "@/handler/api.handler";
import routeConfig from "@/components/constant/route";
import { ClipLoader } from "react-spinners";
const Layout = dynamic(() => import("@/components/design/layout"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const CardHeader = dynamic(() => import("@mui/material/CardHeader"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const CustomLink = dynamic(() => import("@/components/widgets/link"));

function Cart(props: any) {
  const [cart, setCart] = useState<CartType[]>(props.cart);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

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

  const handleAction = async (
    id: number,
    quantity: number,
    type = true //1 is increase , 0 is decrease
  ) => {
    // quantity
    setLoading(true);
    if (quantity == 1 && !type) {
      const res = await destroy(routeConfig.cart.list + "/" + id);
      if (res && res.status_code == 200) {
        dispatch(initCart(res.data));
      }
      setLoading(false);
    } else {
      let newQuantity = type ? quantity + 1 : quantity - 1;
      const res = await post(routeConfig.cart.quantity + "/" + id, {
        quantity: newQuantity,
      });
      console.log(res);
      if (res && res.status_code == 200) {
        dispatch(initCart(res.data));
      }
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
        <Grid
          container
          maxWidth={"lg"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Grid item lg={9} md={9} sm={12} xs={12}>
            {calculateLength > 0 ? (
              <Card
                sx={{ width: 1, p: 2, backgroundColor: "transparent" }}
                elevation={0}
              >
                <CardHeader
                  title={
                    <Typography variant={"h5"} fontWeight={500}>
                      Cart (
                      {calculateLength + (calculateLength > 0 ? " items" : "")})
                    </Typography>
                  }
                  action={
                    <CustomLink
                      title="Clear Cart"
                      action={() => {}}
                      type="contained"
                      color={"error"}
                    />
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
                                <Grid display={"flex"}>
                                  {item.options.map((option, key1) => {
                                    return (
                                      <Chip
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
                              <Box
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
                                {loading ? (
                                  <ClipLoader size={20} loading={true} />
                                ) : (
                                  <>
                                    <IconButton
                                      size="small"
                                      color={
                                        item.quantity == 1 ? "error" : "inherit"
                                      }
                                      onClick={() => {
                                        handleAction(
                                          item.id,
                                          item.quantity,
                                          false
                                        );

                                        // getCart();
                                      }}
                                    >
                                      {item.quantity == 1 ? (
                                        <FaTrash />
                                      ) : (
                                        <FaMinus />
                                      )}
                                    </IconButton>
                                    <Typography
                                      variant="h6"
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
                                      <FaPlus />
                                    </IconButton>
                                  </>
                                )}
                              </Box>
                              <Typography
                                sx={{ mt: { md: 2, xs: 0 } }}
                                fontWeight={"bold"}
                                variant="h6"
                              >
                                $
                                {(item.quantity * item.product.price).toFixed(
                                  2
                                )}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    );
                  })}
                </CardContent>
              </Card>
            ) : (
              <Grid
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                minHeight={500}
                gap={10}
              >
                <Grid
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography variant="h4" color={"secondary"}>
                    Oops...
                  </Typography>
                  <Typography variant="h5" color={"secondary"}>
                    Your cart is empty
                  </Typography>
                </Grid>
                <Grid>
                  <CustomLink
                    type="contained"
                    width={300}
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
            <Grid
              item
              lg={3}
              md={3}
              sm={12}
              xs={12}
              sx={{ p: { md: 1, xs: 3 } }}
            >
              <Card elevation={2} sx={{ width: 1, position: "relative" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                  >
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
                    <CustomLink
                      link
                      size={"large"}
                      padding={1.5}
                      url="/checkout"
                      type="contained"
                      color={"primary"}
                      title="Checkout"
                      width={300}
                      endIcon={<FaArrowRight />}
                    />
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  cart: state.cart.items,
  user: state.user.info,
});

export default connect(mapStateToProps)(Cart);
