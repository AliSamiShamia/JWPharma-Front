import React, { useEffect, useState } from "react";

import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from "@mui/material/BottomNavigation";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material";
import { Badge as BaseBadge, badgeClasses } from "@mui/base/Badge";
import { MdHome } from "@react-icons/all-files/md/MdHome";
import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { RiShoppingCart2Line } from "@react-icons/all-files/ri/RiShoppingCart2Line";
import { RiShoppingCart2Fill } from "@react-icons/all-files/ri/RiShoppingCart2Fill";
import { MdPersonOutline } from "@react-icons/all-files/md/MdPersonOutline";
import { MdPerson } from "@react-icons/all-files/md/MdPerson";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { connect, useDispatch } from "react-redux";
import routeConfig from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import { initCart, resetCart } from "@/store/apps/cart";

const Badge = styled(BaseBadge)(
  ({ theme }) => `
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  font-family: 'IBM Plex Sans', sans-serif;
  position: relative;
  display: inline-block;
  line-height: 1;

  & .${badgeClasses.badge} {
    z-index: auto;
    position: absolute;
    top: 0;
    right: 0;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    color: #fff;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    white-space: nowrap;
    text-align: center;
    border-radius: 12px;
    background:#007FFF;
    box-shadow: 0px 4px 8px ${
      theme.palette.mode === "dark" ? "#1C2025" : "#C7D0DD"
    };
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
  `
);

function CustomBottomNavigation(props: any) {
  const { cart } = props;
  const [value, setValue] = React.useState("home");
  const router = useRouter();
  const { tab } = router.query;
  const auth = useAuth();
  const [cartLength, setCartLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await get(routeConfig.cart.list, auth.user?.token);
      if (res && res.status_code == 200) {
        dispatch(initCart(res.data));
      } else {
        dispatch(resetCart());
      }
      setLoading(false);
    } catch (e) {
      dispatch(initCart([]));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (document.readyState == "complete") {
      if (auth?.user) {
        loadCart();
      }
    }

    return () => {};
  }, [router, auth.user]);

  const calculateTotal = () => {
    let counts = cart.reduce(
      (total: any, item: any) => total + item.quantity,
      0
    );
    setCartLength(counts);
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

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
              cartLength > 0 ? (
                <Badge color="primary" badgeContent={cartLength}>
                  <RiShoppingCart2Fill size={"1.6rem"} />
                </Badge>
              ) : (
                <RiShoppingCart2Fill size={"1.6rem"} />
              )
            ) : cartLength > 0 ? (
              <Badge badgeContent={cartLength} showZero={false}>
                <RiShoppingCart2Line size={"1.6rem"} />
              </Badge>
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

const mapStateToProps = (state: any) => ({
  cart: state.cart.items,
  user: state.user.auth,
});

export default connect(mapStateToProps)(CustomBottomNavigation);
