import routeConfig from "@/components/constant/route";
import { WishListType } from "@/components/types/wishlist.types";
import CustomLink from "@/components/widgets/link";
import { get } from "@/handler/api.handler";
import { useAuth } from "@/hooks/useAuth";
import { initWishlist, resetWishlist } from "@/store/apps/wishlist";
import { useAppSelector } from "@/store/hooks";
import { Badge, Box, Button, Link, Typography } from "@mui/material";
import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

function WishlistNavItem(props: any) {
  const { wishlists, user } = props;

  const auth = useAuth();

  // Wishlist redux state
  const dispatch = useDispatch();

  const router = useRouter();
  //Wishlist items
  const [loading, setLoading] = useState(false);
  const [wishlistLength, setWishlistLength] = useState(0);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await get(routeConfig.wishlist.list, auth.user?.token);
      if (res && res.status_code == 200) {
        dispatch(initWishlist(res.data));
      }
      setLoading(false);
    } catch (e) {
      dispatch(resetWishlist());
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    let counts = wishlists.length;
    setWishlistLength(counts);
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (document.readyState == "complete") {
      if (auth?.user) {
        loadData();
      }
    }
    return () => {};
  }, [router]);

  useEffect(() => {
    calculateTotal();
  }, [wishlists]);

  return (
    <>
      <Box>
        <CustomLink url={"/wishlist"} link>
          <Box sx={{ display: { sm: "flex", xs: "none" } }}>
            <Typography
              ml={0.4}
              mr={0.5}
              variant="body2"
              textTransform={"capitalize"}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              Wishlist
            </Typography>
          </Box>
          {loading ? (
            <ClipLoader size={20} loading={true} />
          ) : (
            <Badge badgeContent={wishlistLength} color="info" max={10}>
              <FiHeart size={22} />
            </Badge>
          )}
        </CustomLink>
      </Box>
      {/* <Wishlist open={wishlistOpen} toggleDrawer={handleWishlistToggle} /> */}
    </>
  );
}

const mapStateToProps = (state: any) => ({
  wishlists: state.wishlist.products,
  user: state.user.auth,
});

export default connect(mapStateToProps)(WishlistNavItem);
