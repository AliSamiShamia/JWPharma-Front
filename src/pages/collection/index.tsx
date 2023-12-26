import routeConfig from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import { Box, Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const CustomLink = dynamic(() => import("@/components/widgets/link"));
const ComponentSpinner = dynamic(
  () => import("@/components/widgets/spinner/component.spinner")
);
const Layout = dynamic(() => import("@/components/design/layout"));
const CollectionItem = dynamic(() => import("@/components/views/collection/item"));

function Collection({ perPage }: PaginationPropType) {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([] as CollectionType[]);
  const router = useRouter();
  const [loadMore, setLoadMore] = useState(false);

  const loadData = async (page: number) => {
    setLoadMore(false);
    const res = await get(routeConfig.collection.list, {
      page: page,
      per_page: perPage,
    });
    setLoading(false);
    if (res && res.status_code == 200) {
      setData([...data, ...res.data]);
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
    return () => { };
  }, [page]);

  return (
    <Layout>
      {loading ? (
        <ComponentSpinner loading={loading} />
      ) : (
        <>
          {
            data.length > 0 ? (
              <Grid p={2} container maxWidth={"xl"}>
                {
                  data.map((item, key) => {
                    return (
                      <Grid
                        item
                        key={key}
                        md={4}
                        lg={3}
                        sm={6}
                        xs={6}
                        p={1}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <CollectionItem {...item}></CollectionItem>
                      </Grid>
                    );
                  })
                }
                {
                  loadingMore && <ComponentSpinner loading={true} />
                }
                {
                  loadMore && (
                    <Box display={"flex"} sx={{ width: "100%", justifyContent: "center" }}>
                      <CustomLink
                        url={"#"}
                        title={"Load More"}
                        color={"primary"}
                        type="contained"
                        link={false}
                        action={handleLoadMore}
                        width={"200px"}
                      />
                    </Box>
                  )
                }
              </Grid>
            ) : null}
        </>
      )}
    </Layout>
  );
}

export default Collection;
