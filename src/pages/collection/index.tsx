import themeColor from "@/components/constant/color";
import routeConfig from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import { useAppSelector } from "@/store/hooks";
import { Box, Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const CustomLink = dynamic(() => import("@/components/widgets/link"));
const ComponentSpinner = dynamic(
  () => import("@/components/widgets/spinner/component.spinner")
);
const Layout = dynamic(() => import("@/components/design/layout"));
const CollectionItem = dynamic(
  () => import("@/components/views/collection/item")
);

function Collection({ perPage }: PaginationPropType) {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([] as CollectionType[]);
  const router = useRouter();
  const [loadMore, setLoadMore] = useState(false);
  const user = useAppSelector((state) => state.user.auth);

  const loadData = async (page: number) => {
    setLoadMore(false);
    const res = await get(routeConfig.collection.list,user.token, {
      page: page,
      per_page: perPage,
    });
    setLoading(false);
    if (res && res.status_code == 200) {
      if (page <= 1) {
        setData(res.data);
      } else {
        setData([...data, ...res.data]);
      }
      if ((res.perPage ?? 0) * (res.page ?? 1) < (res.total ?? 0)) {
        setLoadMore(true);
      }
    }
    setLoadingMore(false);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    let newPage = page + 1;
    setPage(newPage);
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (document.readyState == "complete") {
      loadData(page);
    }
    return () => {};
  }, [page]);

  return (
    <Layout>
      {loading ? (
        <ComponentSpinner loading={loading} />
      ) : (
        <Grid
          p={3}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          {data.length > 0 ? (
            <Grid
              p={2}
              container
              maxWidth={"xl"}
              display={"flex"}
              justifyContent={"center"}
            >
              {data.map((item, key) => {
                return (
                  <Grid item key={key} lg={4} md={4} sm={6} xs={12}>
                    <CollectionItem {...item} />
                  </Grid>
                );
              })}
              {loadingMore && <ComponentSpinner loading={true} />}
              {loadMore && (
                <Box
                  display={"flex"}
                  sx={{ width: "100%", justifyContent: "center" }}
                >
                  <CustomLink
                    title={"Load More"}
                    color={"primary"}
                    type="contained"
                    action={handleLoadMore}
                    width={"200px"}
                  />
                </Box>
              )}
            </Grid>
          ) : (
            <Typography
              variant="h6"
              color={themeColor.secondary.dark}
              display={"flex"}
              justifyContent={"center"}
            >
              Oops, there are currently no collections available.
            </Typography>
          )}
        </Grid>
      )}
    </Layout>
  );
}

export default Collection;
