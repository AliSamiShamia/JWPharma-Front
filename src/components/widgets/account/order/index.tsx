import routeConfig from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
const Typography = dynamic(() => import("@mui/material/Typography"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const ComponentSpinner = dynamic(
  () => import("../../spinner/component.spinner")
);
const OrderItem = dynamic(() => import("@/components/widgets/order"));
const CustomLink = dynamic(() => import("@/components/widgets/link"));

function MyOrder() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<OrderType[]>([]);
  const router = useRouter();
  const auth = useAuth();
  const [page, setPage] = useState(1);

  const loadData = async () => {
    setLoading(true);
    try {
      let data = {
        page: page,
        per_page: 5,
      };
      const res = await get(routeConfig.order.list, auth.user?.token, data);
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
  }, [page, router]);

  const handleLoadMore = () => {
    let newPage = page + 1;
    setPage(newPage);
  };

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
        >
          {data.length > 0 ? (
            <>
              {data.map((item, key) => {
                return (
                  <Grid key={key} item xs={12} mb={2}>
                    <OrderItem {...item} />
                  </Grid>
                );
              })}
              <CustomLink
                url={"#"}
                title={"Load More"}
                color={"primary"}
                type="contained"
                link={false}
                action={handleLoadMore}
              />
            </>
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
                <Typography variant="h5">
                  You don&apos;t have any orders.
                </Typography>
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
