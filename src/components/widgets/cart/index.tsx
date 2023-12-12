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

type CartProp = {
  open: boolean;
  toggleDrawer: (status: boolean) => any;
};

function Cart({ open, toggleDrawer }: CartProp) {
  const cartState = useAppSelector((state) => state.cart.items);
  const [cart, setCart] = useState<CartType[]>([]);

  React.useEffect(() => {
    setCart(cartState);
  }, []);

  return (
    <CustomDrawer open={open} toggleDrawer={toggleDrawer}>
      <Card sx={{ width: 1, p: 2 }}>
        <CardHeader
          title={
            <Typography variant={"h5"} fontWeight={500}>
              My Cart({cart.length})
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
          {cart.map((item: CartType, key) => {
            return <Grid key={key}>{item.product.title}</Grid>;
          })}
        </CardContent>
      </Card>
    </CustomDrawer>
  );
}

export default Cart;
