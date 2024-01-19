import themeColor from "@/components/constant/color";
import routeConfig from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import { useAppSelector } from "@/store/hooks";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
const CustomLink = dynamic(() => import("@/components/widgets/link"));
const ComponentSpinner = dynamic(
  () => import("@/components/widgets/spinner/component.spinner")
);
const FilterList = dynamic(() => import("@/components/widgets/filter"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Layout = dynamic(() => import("@/components/design/layout"));
const ProductItem = dynamic(() => import("@/components/views/product/item"));

function Product({ perPage, loadMore, showAll }: PaginationPropType) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({} as CollectionType);
  const [filterParams, setFilterParam] = useState({} as any);
  const router = useRouter();
  const { slug, keys } = router.query;
  const user = useAppSelector((state) => state.user.auth);

  const loadData = async (
    page: number,
    filterData: any,
    action?: (status: boolean) => void
  ) => {
    let filters = [];
    if (typeof filterData == "string") {
      filters = JSON.parse(filterData);
    } else {
      filters = JSON.parse(JSON.stringify(filterData));
    }

    let data = {
      page: page,
      per_page: perPage ? perPage : 12,
      ...filters,
    };
    setFilterParam(filters);

    if (filterParams.price) {
      const { min, max } = filterParams.price;
      if (min > max) {
        Swal.fire({
          icon: "warning",
          confirmButtonColor: themeColor.secondary.dark,
          title: "Oops...",
          text: "The minimum price must not exceed the maximum price.",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            action ? action(true) : null;
          }
        });
        return;
      }
    }
    setLoading(true);
    const res = await get(
      routeConfig.collection.list + "/" + slug,
      user.token,
      data
    );
    setLoading(false);
    action ? action(false) : null;

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

    if (document.readyState == "complete" && slug) {
      if (keys) {
        loadData(page, keys);
      } else {
        loadData(page, JSON.stringify(filterParams));
      }
    }
    return () => {};
  }, [page, slug]);

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
          {data.products && data.products.length > 0 ? (
            <Grid
              alignItems={"center"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Grid
                p={2}
                container
                maxWidth={"lg"}
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
                      p={2}
                      justifyContent={"center"}
                      alignItems={"center"}
                      width={"100%"}
                    >
                      <ProductItem
                        product={item}
                        action={() => {
                          loadData(page, filterParams);
                        }}
                      />
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
