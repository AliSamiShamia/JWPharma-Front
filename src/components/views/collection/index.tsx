import routeConfig from "@/components/constant/route";
import CustomLink from "@/components/widgets/link";
import { get } from "@/handler/api.handler";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CollectionItem from "./item";
import ResponsiveSlider from "@/components/design/slider";
import { useAppSelector } from "@/store/hooks";
const Box = dynamic(() => import("@mui/material/Box"));
const Container = dynamic(() => import("@mui/material/Container"));
const ComponentSpinner = dynamic(
  () => import("@/components/widgets/spinner/component.spinner")
);

const responsiveSettings = [
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
    },
  },
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
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
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

function Collection({ perPage, loadMore, showAll }: PaginationPropType) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([] as CollectionType[]);

  const user = useAppSelector((state) => state.user.auth);

  const loadData = async (page: number) => {
    const res = await get(routeConfig.collection.list, user?.token, {
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
                justifyContent={"flex-end"}
                mb={4}
                mt={4}
              >
                <Box component={"div"}>
                  <CustomLink
                    url={"/collection"}
                    title={"Show All"}
                    color={"primary"}
                    type="contained"
                    link={true}
                    size={"medium"}
                  />
                </Box>
              </Box>
              <ResponsiveSlider
                arrows={false}
                responsiveSettings={responsiveSettings}
                autoplay={true}
              >
                {data.map((item, key) => {
                  return <CollectionItem key={key} {...item} />;
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

export default Collection;
