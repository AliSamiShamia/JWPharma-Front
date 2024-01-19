import routeConfig from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import { useAuth } from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect, } from "react-redux";
const Box = dynamic(() => import("@mui/material/Box"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Container = dynamic(() => import("@mui/material/Container"));
const ProductItem = dynamic(() => import("./item"));
const CustomLink = dynamic(() => import("@/components/widgets/link"));
const ComponentSpinner = dynamic(
  () => import("@/components/widgets/spinner/component.spinner")
);
const ResponsiveSlider = dynamic(() => import("@/components/design/slider"));

const responsiveSettings = [
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4,
    },
  },
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
    },
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 380,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
];

function Product({ perPage, loadMore, showAll }: PaginationPropType) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([] as ProductType[]);
  const auth = useAuth();

  const router = useRouter();
  const loadData = async (page: number) => {
    setData([]);
    const res = await get(routeConfig.product.listWihtoutFilter, auth.user?.token, {
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
    if (!router.isReady) return;
    if (document.readyState == "complete") {
      loadData(page);
    }
    return () => {};
  }, [page]);

  return (
    <Box>
      {loading ? (
        <ComponentSpinner loading={loading} />
      ) : (
        <>
          {data.length > 0 ? (
            <Container maxWidth={"xl"}>
              <Box
                component={"div"}
                display={"flex"}
                sx={{
                  m: {
                    xs: 2,
                    sm: 5,
                  },
                  ml: {
                    xs: 2,
                    sm: 2,
                  },
                  mr: {
                    xs: 2,
                    sm: 0,
                  },
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box component={"div"} flexGrow={1}>
                  <Typography variant="h3">Our Products</Typography>
                </Box>
                <Box component={"div"}>
                  <CustomLink
                    url={"/products"}
                    title={"Show All"}
                    color={"primary"}
                    type="contained"
                    link={true}
                    padding={"auto"}
                    size={"medium"}
                  />
                </Box>
              </Box>
              <ResponsiveSlider
                responsiveSettings={responsiveSettings}
                autoplay={false}
              >
                {data.map((item, key) => {
                  return (
                    <Box key={key} m={1}>
                      <ProductItem
                        product={item}
                        action={() => {
                          loadData(page);
                        }}
                      />
                    </Box>
                  );
                })}
              </ResponsiveSlider>
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
          ) : null}
        </>
      )}
    </Box>
  );
}

const mapStateToProps = (state: any) => ({ wishlist: state.wishlist.items });

export default connect(mapStateToProps)(Product);
