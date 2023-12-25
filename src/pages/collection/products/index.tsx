import routeConfig from "@/components/constant/route";
import Layout from "@/components/design/layout";
import ProductItem from "@/components/views/product/item";
import CustomLink from "@/components/widgets/link";
import { get } from "@/handler/api.handler";
import { Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const Box = dynamic(() => import("@mui/material/Box"));
const Container = dynamic(() => import("@mui/material/Container"));
const CustomSpinner = dynamic(() => import("@/components/widgets/spinner"));

function ProductsByCategory({
  perPage,
  loadMore,
  showAll,
}: PaginationPropType) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({} as CollectionType);
  const router = useRouter();
  const { s } = router.query;
  //   const params = params;

  const loadData = async (page: number) => {
    const res = await get(routeConfig.collection.list + "/" + s, {
      page: page,
      per_page: perPage,
    });
    setLoading(false);
    if (res && res.status_code == 200) {
      setData(res.data);
    }
  };
  const handleLoadMore = () => {
    let newPage = page + 1;
    setPage(newPage);
  };

  useEffect(() => {
    if (s) {
      loadData(page);
    }
    return () => {};
  }, [page, s]);

  return (
    <Layout>
      <Box>
        {loading ? (
          <CustomSpinner loading={loading} />
        ) : (
          <>
            <Container disableGutters maxWidth={"xl"}>
              <Grid
                container
                padding={5}
                display={"flex"}
                justifyContent={"center"}
              >
                <Grid
                  item
                  md={3}
                  border={1}
                  padding={2}
                  sx={{
                    display: { md: "flex", xs: "none" },
                    borderColor: "#F7F7FA",
                    backgroundColor: "#F7F7FA",
                  }}
                >
                  <Typography color={"primary"} variant="h5">
                    Filters
                  </Typography>
                </Grid>
                <Grid
                  display={"flex"}
                  justifyContent={"center"}
                  item
                  md={9}
                  xs={12}
                >
                  {data?.products.map((item, key) => {
                    return (
                      <Grid padding={1} item sm={2} md={3} lg={4} key={key}>
                        <ProductItem key={key} {...item} />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>

              {loadMore ? (
                <CustomLink
                  url={"#"}
                  title={"Load More"}
                  color={"primary"}
                  type="contained"
                  link={false}
                  action={handleLoadMore}
                />
              ) : null}
            </Container>
          </>
        )}
      </Box>
    </Layout>
  );
}

export default ProductsByCategory;
