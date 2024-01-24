import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
const Layout = dynamic(() => import("@/components/design/layout"));

import { WishListType } from "@/components/types/wishlist.types";
import WishlistWidget from "@/components/widgets/wishlist";
import { get } from "@/handler/api.handler";
import routeConfig from "@/components/constant/route";
import { useAuth } from "@/hooks/useAuth";
import { initWishlist, resetWishlist } from "@/store/apps/wishlist";
import { ClipLoader } from "react-spinners";
import ComponentSpinner from "@/components/widgets/spinner/component.spinner";
import { useRouter } from "next/router";
import { Grid, Typography } from "@mui/material";
import themeColor from "@/components/constant/color";
import CustomLink from "@/components/widgets/link";

function WishList(props: any) {
  const wishlist = props.wishlist as WishListType[];
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const auth = useAuth();
  const router = useRouter();

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

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    loadData();

    return () => {};
  }, [router.isReady]);

  return (
    <Layout>
      {loading ? (
        <ComponentSpinner loading={true} />
      ) : wishlist.length > 0 ? (
        <WishlistWidget wishlist={wishlist} action={loadData} />
      ) : (
        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          minHeight={400}
          width={1}
          gap={5}
          border={1}
          borderColor={themeColor.lightGreyColor}
        >
          <Typography
            variant="h6"
            maxWidth={400}
            textAlign={"center"}
            textTransform={"capitalize"}
            color={themeColor.textOrange}
          >
            It seems your wishlist is currently empty. Feel free to browse
            through our range of products!
          </Typography>
          <Grid>
            <CustomLink
              type="contained"
              width={200}
              link
              url="/products"
              size={"large"}
              title="Add To Wishlist"
            />
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  wishlist: state.wishlist.products,
  user: state.user.auth,
});
WishList.auth = true;
export default connect(mapStateToProps)(WishList);
