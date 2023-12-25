import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  styled,
} from "@mui/material";

const ProductItem = (product:ProductType) => {
  const AnimatedImage = styled(CardMedia)(({ theme }) => ({
    // Base styles for the image
    width: "100%",
    height: 300, // Adjust as needed
    transition: "transform 0.3s ease-in-out", // Use transform for smoother scaling

    "&:hover": {
      transform: "scale(1.1)", // Expand slightly on hover
    },
  }));

  return (
    <Card>
      <AnimatedImage image={product.thumbnail.url}  />

      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          {product.brief}
        </Typography>
        <Typography variant="body2">Price: ${product.price}</Typography>
        <Button variant="contained">Add to Cart</Button>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
