import routeConfig from "@/components/constant/route";
import CustomLink from "@/components/widgets/link";
import { get } from "@/handler/api.handler";
import { Link } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CollectionItem from "./item";
const Box = dynamic(() => import("@mui/material/Box"));
const Container = dynamic(() => import("@mui/material/Container"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const CustomSpinner = dynamic(() => import("@/components/widgets/spinner"));

type PropType = {
  perPage: number;
  loadMore?: boolean;
  showAll?: boolean;
};
type CollectionType={
  id: number,
  slug: string,
  name: string,
  url:string,
}
function Collection({ perPage, loadMore, showAll }: PropType) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data,setData]=useState([] as CollectionType[]);

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
    if (document.readyState=="complete") {
      loadData(page);
    }
    return () => {
    };
  }, [page]);

  return (
    <Box>
      {loading ? (
        <CustomSpinner loading={loading} />
      ) : (
        <>
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
            <Box display="grid" gridTemplateColumns={"repeat(3, 1fr)"} gap={2}>
              {data.map((item,key)=>{
                return <CollectionItem key={key} id={item.id} slug={item.slug} title={item.name} image={item.url ?? "https://b797b0-3.myshopify.com/cdn/shop/collections/pexels-photo-3762881.webp?v=1702016304&width=1100"} />
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
        </>
      )}
    </Box>
  );
}

export default Collection;
