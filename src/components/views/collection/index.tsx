import routeConfig from "@/components/constant/route";
import CustomLink from "@/components/widgets/link";
import { get } from "@/handler/api.handler";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CollectionItem from "./item";
const Box = dynamic(() => import("@mui/material/Box"));
const Container = dynamic(() => import("@mui/material/Container"));
const ComponentSpinner = dynamic(() => import("@/components/widgets/spinner/component.spinner"));

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
            <Container disableGutters maxWidth={"xl"}>
              <Box component={"div"} display={"flex"} mt={1}>
                <Box component={"div"} flexGrow={1}>
                  {/* <Typography variant="h4">Collections</Typography> */}
                </Box>
                <Box component={"div"}>
                  <CustomLink
                    url={"/collection"}
                    title={"Show All"}
                    color={"primary"}
                    type="outlined"
                    link={true}
                  />
                </Box>
              </Box>
              <Box
                display="grid"
                gridTemplateColumns={"repeat(3, 1fr)"}
                gap={2}
              >
                {data.map((item, key) => {
                  return <CollectionItem key={key} {...item} />;
                })}
              </Box>

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
