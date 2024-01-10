import React from "react";
import { FaMinus } from "@react-icons/all-files/fa/FaMinus";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import dynamic from "next/dynamic";
import themeColor from "@/components/constant/color";
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Button = dynamic(() => import("@mui/material/Button"));
const TextField = dynamic(() => import("@mui/material/TextField"));

type PropsType = {
  product: ProductType;
  quantity: number;
  setQuantity: (value: number) => void;
};
function AddToCartWidget({ product, quantity, setQuantity }: PropsType) {
  return (
    <Grid display={"flex"} alignItems={"center"} gap={2}>
      <Typography
        variant="caption"
        px={1}
        fontWeight={"bold"}
        color={themeColor.greyColor}
      >
        Quantity
      </Typography>
      <Grid
        width={150}
        display={"flex"}
        sx={{ backgroundColor: "white" }}
        gap={1}
        alignItems={"center"}
        justifyContent={"center"}
        border={1}
        borderRadius={3}
        px={1}
        py={0.5}
        borderColor={themeColor.borderColor}
      >
        <Button
          size="small"
          sx={{ minWidth: 10, p: 1 }}
          onClick={() => {
            let newQuantity = quantity - 1;
            if (newQuantity > 0) {
              setQuantity(newQuantity);
            } else {
              setQuantity(1);
            }
          }}
        >
          {<FaMinus size={20} />}
        </Button>
        <TextField
          value={quantity}
          sx={{ width: 70 }}
          autoComplete={"quantity"}
          inputProps={{ style: { textAlign: "center" } }}
          onChange={(e) => {
            let newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
              setQuantity(parseInt(e.target.value));
            }
          }}
          size="small"
        ></TextField>

        <Button
          size="small"
          sx={{ minWidth: 10, p: 1 }}
          onClick={() => {
            let newQuantity = quantity + 1;
            if (newQuantity <= product.stock) {
              setQuantity(newQuantity);
            } else {
              setQuantity(1);
            }
          }}
        >
          <FaPlus size={20} />
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddToCartWidget;
