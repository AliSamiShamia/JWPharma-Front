import dynamic from "next/dynamic";
import React from "react";
const Layout = dynamic(() => import("@/components/design/layout"));

function index() {
  return <Layout>Hi</Layout>;
}

export default index;
