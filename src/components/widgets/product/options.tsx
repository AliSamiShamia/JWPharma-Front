import React from "react";
import dynamic from "next/dynamic";
import themeColor from "@/components/constant/color";
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Button = dynamic(() => import("@mui/material/Button"));

type PropsType = {
  product: ProductType;
  handleParamChange: (value: OptionItem) => void;
  options: OptionItem[];
};
function ProductOptions({ product, options, handleParamChange }: PropsType) {
  return (
    <Grid display={"flex"} flexDirection={"column"} my={3}>
      {product.params.map((param, key) => {
        return (
          <Grid key={key} my={1} display={"flex"} alignItems={"center"}>
            <Typography
              variant="subtitle2"
              color={themeColor.secondary.dark}
              fontWeight={"bold"}
              width={100}
            >
              {param.title}
            </Typography>
            <Grid display={"flex"} gap={2}>
              {param.values.map((value, key1) => {
                return (
                  <Button
                    variant={
                      options.find((item) => item.value_id == value.id)
                        ? "contained"
                        : "outlined"
                    }
                    sx={{ p: 0 }}
                    key={key1}
                    onClick={() => {
                      handleParamChange({
                        id: param.id,
                        value_id: value.id,
                      });
                    }}
                  >
                    {value.value}
                  </Button>
                );
              })}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ProductOptions;
