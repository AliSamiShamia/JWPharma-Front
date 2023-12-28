import themeColor from "@/components/constant/color";
import routeConfig from "@/components/constant/route";
import FilterList from "@/components/widgets/filter";
import { get } from "@/handler/api.handler";
import { Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
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
  const [filterParams, setFilterParam] = useState({} as any);
  const router = useRouter();
  const { s } = router.query;

  const loadData = async (page: number) => {
    let data = {
      page: page,
      per_page: perPage ? perPage : 12,
      ...filterParams,
    };
    console.log(data);
    setLoading(true);
    const res = await get(routeConfig.collection.list + "/" + s, data);
    setLoading(false);
    if (res && res.status_code == 200) {
      setData(res.data);
      if (!filterParams.price)
        setFilterParam({
          ...filterParams,
          price: res.data.price_range,
        });
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
    return () => {};
  }, [page, s, filterParams]);

  return (
    <Layout>
      {loading ? (
        <ComponentSpinner loading={loading} />
      ) : (
        <>
          <FilterList
            filters={data.filter}
            handleAction={loadData}
            setFilterParam={setFilterParam}
            params={filterParams}
          />
          {data.products.length > 0 ? (
            <>
              <Grid
               p={2}
                container
                maxWidth={"xl"}
                display={"flex"}
                justifyContent={"center"}
              >
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
            </>
          ) : (
            <Typography
              variant="h6"
              color={themeColor.secondary.dark}
              display={"flex"}
              justifyContent={"center"}
            >
              Oops, there are currently no products available.
            </Typography>
          )}
        </>
      )}
    </Layout>
  );
}

export default Product;
