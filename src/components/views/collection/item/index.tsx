import CustomLink from "@/components/widgets/link";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
const Typography = dynamic(() => import("@mui/material/Typography"));

function CollectionItem(collection: CollectionType) {
  return (
    <CustomLink
      url={"/collection/products"}
      link={true}
      params={{
        s: collection.slug,
      }}
    >
      <Box
        position={"relative"}
        borderRadius={2}
        sx={{
          width: "100%",
          backgroundImage: `url(${collection.url})`,
          height: { sm: 600, xs: 400 },
          backgroundSize: "cover",
          backgroundPosition: "center center",
          borderRadius: 2,
          "&::before": {
            content: `''`,
            backgroundColor: "#00000066",
            borderRadius: 2,
            position: "absolute",
            zIndex: 999,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          },
        }}
      >
        <Box
          position={"absolute"}
          top={0}
          left={0}
          mt={2}
          borderRadius={2}
          width={"100%"}
          height={"100%"}
          zIndex={9999}
        >
          <Typography color={"white"} variant="h5">{collection.name}</Typography>
        </Box>
      </Box>
    </CustomLink>
  );
}

export default CollectionItem;
