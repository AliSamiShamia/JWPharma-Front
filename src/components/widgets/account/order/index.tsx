import routeConfig from "@/components/constant/route";
import CustomLink from "@/components/widgets/link";
import OrderItem from "@/components/widgets/order";
import { get } from "@/handler/api.handler";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ComponentSpinner from "../../spinner/component.spinner";
const Typography = dynamic(() => import("@mui/material/Typography"));
const Grid = dynamic(() => import("@mui/material/Grid"));

function MyOrder() {
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
    <Grid
      width={1}
      py={2}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {loading ? (
        <Grid>
          <ComponentSpinner loading={true} />
        </Grid>
      ) : (
        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          // minHight={400}
        >
          {data.length > 0 ? (
            data.map((item, key) => {
              return (
                <Grid key={key} item xs={12} mb={2}>
                  <OrderItem {...item} />
                </Grid>
              );
            })
          ) : (
            <Grid
              item
              md={12}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={3}
            >
              <Grid>
                <Typography variant="h5">You don't have any orders.</Typography>
                <Grid mt={4}>
                  <CustomLink link type="contained" url="/products">
                    Shop Now
                  </CustomLink>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
      {/* <Grid item md={12}>
          <Product perPage={8} />
        </Grid> */}
    </Grid>
  );
}

export default MyOrder;
