import { WishListType } from "@/components/types/wishlist.types";
import Wishlist from "@/components/widgets/wishlist";
import { useAppSelector } from "@/store/hooks";
import { Badge, Box, Button, Link, Typography } from "@mui/material";
import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
import React, { useState } from "react";

function WishlistNavItem() {
  // Wishlist redux state
  const wishlistState = useAppSelector((state) => state.wishlist.products);

  //Wishlist items
  const [wishlist, setWishList] = useState<WishListType[]>([]);

  React.useEffect(() => {
    setWishList(wishlistState);
  }, [wishlistState]);

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
          href={"/wishlist"}
        >
          <Button>
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
                  Wishlist
                </Typography>
              </Box>
              <Badge badgeContent={wishlist.length} color="info" max={10}>
                <FiHeart size={22} />
              </Badge>
            </Box>
          </Button>
        </Link>
      </Box>
      {/* <Wishlist open={wishlistOpen} toggleDrawer={handleWishlistToggle} /> */}
    </>
  );
}

export default WishlistNavItem;
