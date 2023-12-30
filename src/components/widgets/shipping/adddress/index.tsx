import routeConfig from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import React from "react";

function ShippingAddress() {
  const loadData = async () => {
    try {
        const res=get(routeConfig.account.addresses)
    } catch (e) {}
  };

  return <div></div>;
}

export default ShippingAddress;
