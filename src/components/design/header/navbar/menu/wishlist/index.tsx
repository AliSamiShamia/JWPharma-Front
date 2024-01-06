import routeConfig from "@/components/constant/route";
import { WishListType } from "@/components/types/wishlist.types";
import CustomLink from "@/components/widgets/link";
import { get } from "@/handler/api.handler";
import { useAuth } from "@/hooks/useAuth";
import { initWishlist } from "@/store/apps/wishlist";
import { useAppSelector } from "@/store/hooks";
import { Badge, Box, Button, Link, Typography } from "@mui/material";
import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

function WishlistNavItem(props: any) {
  const { wishlists } = props;

  // Wishlist redux state
  const dispatch = useDispatch();
  const auth = useAuth();

  //Wishlist items
  const [loading, setLoading] = useState(false);
  const [wishlistLength, setWishlistLength] = useState(0);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await get(routeConfig.wishlist.list);
      if (res && res.status_code == 200) {
        dispatch(initWishlist(res.data));
      }
      setLoading(false);
    } catch (e) {
      dispatch(initWishlist([]));
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    let counts = wishlists.reduce((total: any) => total, 0);
    setWishlistLength(counts);
  };

  useEffect(() => {
    if (auth.user) {
      loadData();
    }
  }, [auth]);

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

const mapStateToProps = (state: any) => ({ wishlists: state.wishlist.products });

export default connect(mapStateToProps)(WishlistNavItem);
