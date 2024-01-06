import routeConfig from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const Typography = dynamic(() => import("@mui/material/Typography"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const Layout = dynamic(() => import("@/components/design/layout"));

function Order() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<OrderType[]>([]);
  const router = useRouter();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await get(routeConfig.order.list);
      if (res && res.status_code == 200) {
        setData(res.data);
      }
      setLoading(false);
    } catch (e) {}
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    loadData();
    return () => {};
  }, [router.route]);

  return (
    <Layout>
      <Grid
        container
        maxWidth={"xl"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={6}
      >
        {data.map((item, key) => {
          return (
            <Grid key={key} item>
              <Card>
                <Grid display={"flex"} justifyContent={"space-between"}>
                  <Typography>{item.tracking_number}</Typography>
                  <Typography>{item.total_amount}</Typography>
                </Grid>
                <Card elevation={1}>
                  <CardContent>
                    {/* <Typography>{item.}</Typography>
                  <Typography>{item.name}</Typography> */}
                  </CardContent>
                </Card>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
}

export default Order;
