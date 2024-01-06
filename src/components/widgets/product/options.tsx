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
    <Grid display={"flex"} alignItems={"center"} my={3}>
      {product.params.map((param, key) => {
        return (
          <Grid
            key={key}
            mt={1}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={3}
          >
            <Typography
              variant="caption"
              color={themeColor.greyColor}
              fontWeight={"bold"}
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
