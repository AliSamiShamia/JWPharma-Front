import routeConfig from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const TextField = dynamic(() => import("@mui/material/TextField"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Layout = dynamic(() => import("@/components/design/layout"));

function OrderDetails() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { key } = router.query;
  const [order, setOrder] = useState({} as OrderItemType);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await get(routeConfig.order.view + "/" + key);
      if (res && res.status_code == 200) {
        setOrder(res.data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    loadData();
  }, [router]);

  return (
    <Layout>
      <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Grid container maxWidth={"md"} mt={3}>
          <Typography>Your Orders</Typography>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default OrderDetails;
