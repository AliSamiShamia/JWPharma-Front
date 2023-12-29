import { CartType } from "@/components/types/cart.types";
import CustomLink from "@/components/widgets/link";
import { useAppSelector } from "@/store/hooks";
import { Badge, Box, Typography } from "@mui/material";
import { RiShoppingCart2Line } from "@react-icons/all-files/ri/RiShoppingCart2Line";
import React, { useState } from "react";

function CartNavItem() {
  //Cart  redux state
  const cartState = useAppSelector((state) => state.cart.items);

  //Cart  items
  const [cart, setCart] = useState<CartType[]>([]);
  const [cartLength, setCartLength] = useState(0);

  // Function to calculate total
  const calculateTotal = () => {
    let counts = cartState.reduce((total, item) => total + item.quantity, 0);
    setCartLength(counts);
  };

  React.useEffect(() => {
    setCart(cartState);
    calculateTotal();
  }, [cartState]);

  return (
    <>
      <Box>
        <CustomLink url={"/cart"} link>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: { sm: "flex", xs: "none" } }}>
              <Typography
                ml={0.4}
                mr={0.5}
                variant="body2"
                textTransform={"capitalize"}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                Cart
              </Typography>
            </Box>
            <Badge badgeContent={cartLength} color="info" max={10}>
              <RiShoppingCart2Line size={22} />
            </Badge>
          </Box>
        </CustomLink>
      </Box>
      {/* <Cart open={cartOpen} toggleDrawer={handleCartToggle} /> */}
    </>
  );
}

export default CartNavItem;
