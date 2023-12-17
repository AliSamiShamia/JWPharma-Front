import { CartType } from "@/components/types/cart.types";
import { useAppSelector } from "@/store/hooks";
import { Badge, Box, Button, Link, Typography } from "@mui/material";
import { RiShoppingCart2Line } from "@react-icons/all-files/ri/RiShoppingCart2Line";
import React, { useState } from "react";

function CartNavItem() {
  //Cart  redux state
  const cartState = useAppSelector((state) => state.cart.items);

  //Cart  items
  const [cart, setCart] = useState<CartType[]>([]);

  React.useEffect(() => {
    setCart(cartState);
  }, [cartState]);

  return (
    <>
      <Box>
        <Link
          underline="none"
          variant="button"
          color={"primary"}
          textTransform={"capitalize"}
          ml={0.4}
          mr={0.5}
          href={"/cart"}
        >
          <Button
            variant="text"
            color="primary"
            sx={{
              "&:hover": { backgroundColor: "transparent" },
              minWidth: 20,
              ml: { sm: 0.3, xs: 1 },
            }}
          >
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
              <Badge badgeContent={cart.length} color="info" max={10}>
                <RiShoppingCart2Line size={22} />
              </Badge>
            </Box>
          </Button>
        </Link>
      </Box>
      {/* <Cart open={cartOpen} toggleDrawer={handleCartToggle} /> */}
    </>
  );
}

export default CartNavItem;
