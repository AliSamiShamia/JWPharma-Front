import dynamic from "next/dynamic";
import React, { useState } from "react";
import CustomLink from "../link";
import { multipart } from "@/handler/api.handler";
import routeConfig from "@/components/constant/route";
import { ClipLoader } from "react-spinners";
import { saveAs } from "file-saver";
import themeColor from "@/components/constant/color";
import { Box, Button } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
const Grid = dynamic(() => import("@mui/material/Grid"));
const Tooltip = dynamic(() => import("@mui/material/Tooltip"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const Typography = dynamic(() => import("@mui/material/Typography"));

function OrderItem(order: OrderType) {
  const user = useAppSelector((state) => state.user.auth);
  const [loading, setLoading] = useState(false);
  const invoice = async () => {
    setLoading(true);
    try {
      const res = await multipart(
        routeConfig.order.invoice + "/" + order.id,
        user.token
      );
      if (res && res.status_code == 200) {
        saveAs(res.data.url, "invoice.pdf");
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <Card sx={{ width: 1 }} elevation={5}>
      <CardContent sx={{ width: 1, p: 0 }}>
        <Grid
          sx={{
            backgroundColor: "#F0F2F2",
            flexDirection: { md: "row", xs: "column" },
            alignItems: { md: "center", xs: "flex-start" },
          }}
          display={"flex"}
          justifyContent={"space-between"}
          mb={1}
          px={2}
          py={1}
          gap={1}
        >
    
          <Grid
            display={"flex"}
            sx={{
              flexDirection: { md: "row", xs: "column" },
              width: { md: 0.6, xs: 1 },
            }}
            justifyContent={"space-between"}
            gap={0.6}
          >
            <Grid
              display={"flex"}
              sx={{
                flexDirection: { md: "column", xs: "row" },
              }}
              alignItems={"center"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              gap={0.6}
            >
              <Typography
                variant="caption"
                fontWeight={"bold"}
                textTransform={"uppercase"}
                color={themeColor.textGreyColor}
              >
                Order Placed
              </Typography>
              <Typography variant="caption" color={themeColor.textGreyColor}>
                {order.created_at}
              </Typography>
            </Grid>
            <Grid
              display={"flex"}
              sx={{
                flexDirection: { md: "column", xs: "row" },
              }}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={0.6}
            >
              <Typography
                variant="caption"
                fontWeight={"bold"}
                textTransform={"uppercase"}
                color={themeColor.textGreyColor}
              >
                Total
              </Typography>
              <Typography
                variant="caption"
                fontWeight={"bold"}
                color={themeColor.textGreyColor}
              >
                ${order.total_amount}
              </Typography>
            </Grid>
            <Grid
              display={"flex"}
              sx={{
                flexDirection: { md: "column", xs: "row" },
              }}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={0.6}
            >
              <Typography
                variant="caption"
                fontWeight={"bold"}
                textTransform={"uppercase"}
                color={themeColor.textGreyColor}
              >
                Ship To
              </Typography>
              <Tooltip
                arrow
                disableInteractive
                title={`${order.user_address.country}, ${order.user_address.city}, ${order.user_address.building}, ${order.user_address.flat_number}`}
              >
                <Button variant="text" sx={{ p: 0 }}>
                  <Typography
                    variant="caption"
                    color={themeColor.textGreyColor}
                  >
                    {order.user}
                  </Typography>
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
            alignItems={"flex-end"}
            sx={{ width: { md: "auto", xs: 1 } }}
            gap={1}
          >
            <Grid
              width={1}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={0.5}
            >
              <Typography
                variant="caption"
                fontWeight={"bold"}
                textTransform={"uppercase"}
                color={themeColor.textGreyColor}
              >
                Order #
              </Typography>
              <Typography variant="caption" fontStyle={"italic"}>
                {order.tracking_number}
              </Typography>
            </Grid>
            <Grid width={1}>
              {loading ? (
                <ClipLoader size={20} loading={true} />
              ) : (
                <Grid
                  display={"flex"}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                >
                  <CustomLink
                    type="text"
                    action={invoice}
                    padding={0}
                    size={"small"}
                  >
                    <Typography variant="caption" color={themeColor.textOrange}>
                      Invoice
                    </Typography>
                  </CustomLink>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          px={2}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant="subtitle2"
            fontWeight={"bold"}
            fontStyle={"italic"}
          >
            {order.quantity} (items)
          </Typography>
          <Typography variant="button" color={themeColor.textOrange}>
            {order.status}
          </Typography>
        </Grid>
        <Grid
          px={2}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          {order.items.map((item, key) => {
            return (
              <Grid
                key={key}
                display={"flex"}
                my={2}
                border={1}
                borderColor={themeColor.lightGreyColor}
              >
                <CustomLink
                  width={"auto"}
                  link
                  padding={0}
                  url={"/products/" + item.product.slug}
                >
                  <Box
                    component={"img"}
                    alt={"product-" + item.product.name}
                    sx={{
                      width: 100,
                      height: { xs: 100, sm: 100 },
                      objectFit: "cover",
                    }}
                    src={item.product.thumbnail.url}
                  />
                </CustomLink>

                <Grid px={2} width={1} py={2}>
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    textAlign={"left"}
                  >
                    {item.product.name}
                  </Typography>

                  <Grid
                    display={"flex"}
                    width={1}
                    justifyContent={"space-between"}
                    sx={{ flexDirection: { md: "row", xs: "column" } }}
                  >
                    <Typography variant="caption" fontWeight={"bold"}>
                      ${item?.product?.price}
                      {item?.quantity > 0 ? " x " + item?.quantity : ""}
                    </Typography>
                    <Typography variant="caption" fontWeight={"bold"}>
                      ${item.price * item.quantity}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default OrderItem;
