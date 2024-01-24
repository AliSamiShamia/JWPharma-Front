import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { WishListType } from "@/components/types/wishlist.types";
import ProductItem from "@/components/views/product/item";

type PropType = {
  wishlist: WishListType[];
  action: () => void;
};

function WishlistWidget({ wishlist, action }: PropType) {
  return (
    <Grid
      mt={6}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid
        container
        maxWidth={"lg"}
        spacing={2}
        display={"flex"}
        justifyContent={"center"}
      >
        {wishlist.map((item: WishListType, key) => {
          return (
            <Grid key={key} item lg={3} md={3} xs={12}>
              <ProductItem product={item.product} action={action} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default WishlistWidget;
