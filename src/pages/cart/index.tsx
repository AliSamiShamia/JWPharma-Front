import dynamic from "next/dynamic";
import React from "react";
const Layout = dynamic(() => import("@/components/design/layout"));

function Cart() {
  return <Layout>Hi</Layout>;
}

export default Cart;
