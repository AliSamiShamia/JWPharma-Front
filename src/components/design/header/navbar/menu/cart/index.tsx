import routeConfig from "@/components/constant/route";
import { CartType } from "@/components/types/cart.types";
import CustomLink from "@/components/widgets/link";
import { get } from "@/handler/api.handler";
import { useAuth } from "@/hooks/useAuth";
import { initCart, resetCart } from "@/store/apps/cart";
import { useAppSelector } from "@/store/hooks";
import { Badge, Box, Typography } from "@mui/material";
import { RiShoppingCart2Line } from "@react-icons/all-files/ri/RiShoppingCart2Line";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

function CartNavItem(props: any) {
  const { cart, user } = props;
  const auth = useAuth();
  const [cartLength, setCartLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  // Function to calculate total
  const calculateTotal = () => {
    let counts = cart.reduce(
      (total: any, item: any) => total + item.quantity,
      0
    );
    setCartLength(counts);
  };

  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await get(routeConfig.cart.list, user.token);
      if (res && res.status_code == 200) {
        dispatch(initCart(res.data));
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
      if (auth?.user?.isAuth) {
        loadCart();
      }
    }
    return () => {};
  }, [router]);

  useEffect(() => {
    calculateTotal();
  }, [cart]);

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
            {loading ? (
              <ClipLoader size={20} loading={true} />
            ) : (
              <Badge badgeContent={cartLength} color="info" max={10}>
                <RiShoppingCart2Line size={22} />
              </Badge>
            )}
          </Box>
        </CustomLink>
      </Box>
      {/* <Cart open={cartOpen} toggleDrawer={handleCartToggle} /> */}
    </>
  );
}

const mapStateToProps = (state: any) => ({
  cart: state.cart.items,
  user: state.user.auth,
});

export default connect(mapStateToProps)(CartNavItem);
