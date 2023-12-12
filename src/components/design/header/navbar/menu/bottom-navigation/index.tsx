import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import UserNavItem from "../account";
import CartNavItem from "../cart";
import { MdHome } from "@react-icons/all-files/md/MdHome";
import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
import { RiShoppingCart2Line } from "@react-icons/all-files/ri/RiShoppingCart2Line";
import { MdPersonOutline } from "@react-icons/all-files/md/MdPersonOutline";

function CustomBottomNavigation() {
  const [value, setValue] = React.useState("home");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    switch (newValue) {
      case "home":
        console.log("Home");
        break;
      case "wishlist":
        console.log("wishlist");
        break;
      case "cart":
        console.log("cart");
        break;
      case "account":
        console.log("account");
        break;
    }
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          value={"home"}
          icon={<MdHome size={"1.6rem"} />}
        />

        <BottomNavigationAction
          value={"wishlist"}
          icon={<FiHeart size={"1.6rem"} />}
        />
        <BottomNavigationAction
          value={"cart"}
          icon={<RiShoppingCart2Line size={"1.6rem"} />}
        />
        <BottomNavigationAction
          value={"account"}
          icon={<MdPersonOutline size={"1.6rem"} />}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default CustomBottomNavigation;
