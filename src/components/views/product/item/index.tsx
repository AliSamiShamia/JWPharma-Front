import ResponsiveSlider from "@/components/design/slider";
import CustomImage from "@/components/widgets/image";
import CustomLink from "@/components/widgets/link";
import { Box, CardActions, CardContent, Zoom } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
const Typography = dynamic(() => import("@mui/material/Typography"));
const Card = dynamic(() => import("@mui/material/Card"));

function ProductItem(product: ProductType) {
  return (
    <Card
      elevation={1}
      
      sx={{
        m: { xs: 1, sm: 4 },
        width: 1,
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          p: 0,
          "&:last-child": {
            paddingBottom: 1,
          },

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomLink
          url={"/product/i"}
          link={true}
          padding={0}
          params={{
            slug: product.slug,
          }}
        >
          <CustomImage
            height={{ sm: 350, xs: 250 }}
            url={product.thumbnail.url}
            alt={product.name}
          />
        </CustomLink>
    
            <Box m={1} display={"flex"} width={1} p={2}>
              <Typography variant="subtitle2">{product.name}</Typography>
            </Box>
            <Box sx={{ width: 1, display: "flex" }}>
              <Box width={1} m={1} maxWidth={300}>
                <CustomLink
                  url={"/product/i"}
                  link={true}
                  params={{
                    slug: product.slug,
                  }}
                  color={"primary"}
                  type="contained"
                  size={"medium"}
                  title="Add to cart"
                />
              </Box>
              <Box width={1} m={1} maxWidth={300}>
                <CustomLink
                  url={"/product/i"}
                  link={true}
                  params={{
                    slug: product.slug,
                  }}
                  type="outlined"
                  size={"medium"}
                  title="Buy Now"
                />
           
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductItem;
