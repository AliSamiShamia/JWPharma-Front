import Box from "@mui/material/Box";
import React from "react";
import CartNavItem from "./cart";
import { Divider } from "@mui/material";
import WishlistNavItem from "./wishlist";
import UserNavItem from "./account";

function CustomMenu() {
  return (
    <>
      <Box
        sx={{
          position: { sm: "absolute", xs: "relative" },
          right: "3rem",
          top: "2rem",
          display: { sm: "flex", xs: "none" },
          justifyContent: "space-around",
        }}
      >
        <UserNavItem />
        <Divider orientation="vertical" variant="middle" flexItem />
        <WishlistNavItem />
        <Divider orientation="vertical" variant="middle" flexItem />
        <CartNavItem />
      </Box>
    </>
  );
}

export default CustomMenu;
