import routeConfig from "@/components/constant/route";
import CustomLink from "@/components/widgets/link";
import { get } from "@/handler/api.handler";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CollectionItem from "./item";
const Box = dynamic(() => import("@mui/material/Box"));
const Container = dynamic(() => import("@mui/material/Container"));
const ComponentSpinner = dynamic(
  () => import("@/components/widgets/spinner/component.spinner")
);
import "react-slideshow-image/dist/styles.css";
import ResponsiveSlider from "@/components/design/slider";

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
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

function Collection({ perPage, loadMore, showAll }: PaginationPropType) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([] as CollectionType[]);

  const loadData = async (page: number) => {
    const res = await get(routeConfig.collection.list, {
      page: page,
      per_page: perPage,
    });
    setLoading(false);
    if (res && res.status_code == 200) {
      console.log(res);
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
          <Container disableGutters maxWidth={"xl"}>
            <Box component={"div"} display={"flex"} mt={1}>
              <Box component={"div"} flexGrow={1}>
                {/* <Typography variant="h4">Featured Collections</Typography> */}
              </Box>
              {showAll ? (
                <Box component={"div"}>
                  <CustomLink
                    url={"/collection"}
                    title={"Show All"}
                    color={"primary"}
                    type="outlined"
                    link={true}
                  />
                </Box>
              ) : null}
            </Box>
            <ResponsiveSlider
              autoplay={false}
              arrows={false}
              responsiveSettings={responsiveSettings}
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
        </>
      )}
    </Box>
  );
}

export default Collection;
