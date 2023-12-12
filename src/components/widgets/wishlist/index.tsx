import { CartType } from "@/components/types/cart.types";
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
import React, { useState } from "react";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import CustomDrawer from "../drawer";
import { WishListType } from "@/components/types/wishlist.types";

type PropType = {
  open: boolean;
  toggleDrawer: (status: boolean) => any;
};

function Wishlist({ open, toggleDrawer }: PropType) {
  const wishlistState = useAppSelector((state) => state.wishlist.products);
  const [wishlist, setWishlist] = useState<WishListType[]>([]);

  React.useEffect(() => {
    setWishlist(wishlistState);
  }, []);

  return (
    <CustomDrawer open={open} toggleDrawer={toggleDrawer}>
      <Card sx={{ width: 1, p: 2 }}>
        <CardHeader
          title={
            <Typography variant={"h5"} fontWeight={500}>
              My Wishlist({wishlist.length})
            </Typography>
          }
          action={
            <IconButton
              onClick={() => {
                toggleDrawer(false);
              }}
            >
              <MdClose size={30} />
            </IconButton>
          }
        />
        <CardContent>
          {wishlist.map((item: WishListType, key) => {
            return <Grid key={key}>{item.product.title}</Grid>;
          })}
        </CardContent>
      </Card>
    </CustomDrawer>
  );
}

export default Wishlist;
