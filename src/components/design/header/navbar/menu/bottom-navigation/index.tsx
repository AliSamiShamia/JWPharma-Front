import React, { useEffect } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

import { MdHome } from "@react-icons/all-files/md/MdHome";
import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { RiShoppingCart2Line } from "@react-icons/all-files/ri/RiShoppingCart2Line";
import { RiShoppingCart2Fill } from "@react-icons/all-files/ri/RiShoppingCart2Fill";
import { MdPersonOutline } from "@react-icons/all-files/md/MdPersonOutline";
import { MdPerson } from "@react-icons/all-files/md/MdPerson";
import { useRouter } from "next/router";

function CustomBottomNavigation() {
  const [value, setValue] = React.useState("home");
  const router = useRouter();
  const { tab } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (document.readyState == "complete") {
      if (tab) {
        setValue(tab.toString());
      }
    }
  }, [tab]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    switch (newValue) {
      case "home":
        router.replace({
          pathname: "/",
          query: {
            tab: "home",
          },
        });
        break;
      case "wishlist":
        router.replace({
          pathname: "/wishlist",
          query: {
            tab: "wishlist",
          },
        });
        break;
      case "cart":
        router.replace({
          pathname: "/cart",
          query: {
            tab: "cart",
          },
        });
        break;
      case "account":
        router.push("/account");
        router.replace({
          pathname: "/account",
          query: {
            tab: "account",
          },
        });
        break;
    }
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          value={"home"}
          icon={<MdHome size={"1.6rem"} />}
        />

        <BottomNavigationAction
          value={"wishlist"}
          icon={
            value == "wishlist" ? (
              <FaHeart size={"1.6rem"} />
            ) : (
              <FiHeart size={"1.6rem"} />
            )
          }
        />
        <BottomNavigationAction
          value={"cart"}
          icon={
            value == "cart" ? (
              <RiShoppingCart2Fill size={"1.6rem"} />
            ) : (
              <RiShoppingCart2Line size={"1.6rem"} />
            )
          }
        />
        <BottomNavigationAction
          value={"account"}
          icon={
            value == "account" ? (
              <MdPerson size={"1.6rem"} />
            ) : (
              <MdPersonOutline size={"1.6rem"} />
            )
          }
        />
      </BottomNavigation>
    </Paper>
  );
}

export default CustomBottomNavigation;
