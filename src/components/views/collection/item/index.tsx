import CustomLink from "@/components/widgets/link";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
const Typography = dynamic(() => import("@mui/material/Typography"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const CardActions = dynamic(() => import("@mui/material/CardActions"));
const CardHeader = dynamic(() => import("@mui/material/CardHeader"));

type PropType = {
  id: string;
  slug: string;
  title: string;
  image: string;
};

function CollectionItem({ id, slug, title, image }: PropType) {
  return (
    <CustomLink
      url={"/collection/i"}
      link={true}
      params={{
        slug: slug,
      }}
    >
      <Box
        position={"relative"}
        borderRadius={2}
        sx={{
          gridColumn: { sm: "span 1", xs: "span 3" },
          m: { xs: 1, sm: 0 },
          width: "100%",
          "&::after": {
            content: `''`,
            backgroundColor: "#00000066",
            position: "absolute",
            zIndex: 999,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          },
        }}
      >
        <Box
          src={image}
          component={"img"}
          alt={title}
          width={"100%"}
          maxHeight={600}
          borderRadius={2}
          m={0}
          sx={{
            objectFit: "cover",
          }}
          sizes="(min-width: 750px) 50vw, 100vw"
        />

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
          <Typography color={"white"}>{title}</Typography>
        </Box>
      </Box>
    </CustomLink>
  );
}

export default CollectionItem;
