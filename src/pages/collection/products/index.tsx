import routeConfig from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
const Box = dynamic(() => import("@mui/material/Box"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Container = dynamic(() => import("@mui/material/Container"));
const CustomLink = dynamic(() => import("@/components/widgets/link"));
const ComponentSpinner = dynamic(
  () => import("@/components/widgets/spinner/component.spinner")
);
const Layout = dynamic(() => import("@/components/design/layout"));
const ProductItem = dynamic(() => import("@/components/views/product/item"));

function Product({ perPage, loadMore, showAll }: PaginationPropType) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({} as CollectionType);
  const router = useRouter();
  const { s } = router.query;

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
    if (!router.isReady) {
      return;
    }

    if (document.readyState == "complete" && s) {
      loadData(page);
    }
    return () => { };
  }, [page, s]);

  return (
    <Layout>
      {loading ? (
        <ComponentSpinner loading={loading} />
      ) : (
        <>
          {
            data.products.length > 0 ? (
              <Grid p={2} container maxWidth={"xl"}>
                <Grid
                  item
                  sm={12}
                  md={3}
                  border={1}
                  borderColor={"#F7F7FA"}
                  sx={{
                    display: { md: "flex", xs: "none" },
                    backgroundColor: "#F7F7FA",
                  }}
                >
                  <Box>
                    <Typography variant="h5" color={"primary"}>
                      Filter
                    </Typography>
                    <Grid>
                      {data.filter.map((item, key) => {
                        return (
                          <Grid key={key}>
                            <Typography>{item.title}</Typography>
                            {Object.entries(item.values).map((value, key1) => {
                              return <Fragment key={key1}>{JSON.stringify(value)}</Fragment>;
                            })}
                            {/* {typeof(item.values)==Array?(<></>):(<></>)} */}
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </Grid>
                <Grid item sm={12} md={9}>
                  <Grid container>
                    {data.products.map((item, key) => {
                      return (
                        <Grid
                          item
                          key={key}
                          md={4}
                          lg={3}
                          sm={6}
                          xs={12}
                          p={1}
                          justifyContent={"center"}
                          alignItems={"center"}
                          width={"100%"}
                        >
                          <ProductItem {...item} />
                        </Grid>
                      );
                    })}
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
                </Grid>
              </Grid>
            ) : null
          }
        </>
      )}
    </Layout>
  );
}

export default Product;
