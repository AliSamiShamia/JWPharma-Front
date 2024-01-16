import dynamic from "next/dynamic";
import React, { useState } from "react";
import { connect } from "react-redux";
const Layout = dynamic(() => import("@/components/design/layout"));

import { WishListType } from "@/components/types/wishlist.types";
import WishlistWidget from "@/components/widgets/wishlist";

function WishList(props: any) {
  const wishlist = props.wishlist as WishListType[];

  return (
    <Layout>
      <WishlistWidget wishlist={wishlist} />
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  wishlist: state.wishlist.products,
  user: state.user.auth,
});
WishList.auth = true;
export default connect(mapStateToProps)(WishList);
