import routeConfig from "@/components/constant/route";
import Layout from "@/components/design/layout";
import { ProductType } from "@/components/types/product.types";
import ProductItem from "@/components/views/product/item";
import CustomLink from "@/components/widgets/link";
import { get } from "@/handler/api.handler";
import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const Box = dynamic(() => import("@mui/material/Box"));
const Container = dynamic(() => import("@mui/material/Container"));
const CustomSpinner = dynamic(() => import("@/components/widgets/spinner"));

type PropType = {
    categorySlug: string;
    perPage: number;
    loadMore?: boolean;
    showAll?: boolean;
};


function ProductsByCategory({
    perPage,
    loadMore,
    showAll,
}: PropType) {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([] as ProductType[]);
    const searchParams = useSearchParams();

    const loadData = async (page: number) => {
        const res = await get(routeConfig.product.list, {
            page: page,
            per_page: perPage,
            categories: [searchParams.get('category')],
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
        return () => { };
    }, [page]);

    return (
        <Layout>
            <Box>
                {loading ? (
                    <CustomSpinner loading={loading} />
                ) : (
                    <>
                        <Container disableGutters maxWidth={"xl"}>
                            <Grid container padding={5}>
                                {data.map((item, key) => {
                                    return (
                                        <Grid padding={2} item sm={2} md={3} lg={4} key={key}>
                                            <ProductItem
                                                key={key}
                                                id={item.id}
                                                slug={item.slug}
                                                name={item.name}
                                                sku={item.sku}
                                                description={item.description}
                                                brief={item.brief}
                                                price={item.price}
                                                pre_price={item.pre_price}
                                                weight={item.weight}
                                                is_trending={item.is_trending}
                                                is_featured={item.is_featured}
                                                stock={item.stock}
                                                discount={item.discount}
                                                images={item.images}
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
                        </Container>
                    </>
                )}
            </Box>
        </Layout>
    );
}

export default ProductsByCategory;
