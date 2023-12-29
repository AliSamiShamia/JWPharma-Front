import Layout from "@/components/design/layout";
import { CartType } from "@/components/types/cart.types";
import CustomLink from "@/components/widgets/link";
import { useAppSelector } from "@/store/hooks";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function Cart() {
  const cartState = useAppSelector((state) => state.cart.items);
  const [cart, setCart] = useState<CartType[]>([]);
  const [cartLength, setCartLength] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  React.useEffect(() => {
    setCart(cartState);
    calculateTotal();
  }, []);

  // Function to calculate total
  const calculateTotal = () => {
    let total = cartState.reduce(
      (total, item) => total + item?.product?.price * item.quantity,
      0
    );
    let counts = cartState.reduce((total, item) => total + item.quantity, 0);

    setCartLength(counts);
    setCartTotal(total);
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
          maxWidth={"xl"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item lg={9} md={9} sm={12} xs={12}>
            <Card
              sx={{ width: 1, p: 2, backgroundColor: "transparent" }}
              elevation={0}
            >
              <CardHeader
                title={
                  <Typography variant={"h5"} fontWeight={500}>
                    Cart ({cartLength + (cartLength > 0 ? " items" : "")})
                  </Typography>
                }
              />
              <CardContent sx={{ p: 5 }}>
                {cart.map((item: CartType, key) => {
                  return (
                    <Grid
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Grid
                        key={key}
                        display={"flex"}
                        alignItems={"center"}
                        gap={2}
                      >
                        <CustomLink
                          padding={0}
                          width={100}
                          link
                          url={`/products/${item.product.slug}`}
                        >
                          <Box
                            component={"img"}
                            alt={"product-" + item.product.slug}
                            sx={{
                              width: 100,
                              height: { xs: 100 },
                              objectFit: "contain",
                            }}
                            src={item.product.thumbnail.url}
                          />
                        </CustomLink>
                        <Grid>
                          <Typography variant="body1">
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
                      <Grid>
                        <Typography variant="h6">
                          {item.quantity} items
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Cart;
