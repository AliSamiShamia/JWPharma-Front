import themeColor from "@/components/constant/color";
import routeConfig from "@/components/constant/route";
import { post, get } from "@/handler/api.handler";
import { useAppSelector } from "@/store/hooks";
import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const Chip = dynamic(() => import("@mui/material/Chip"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const CustomLink = dynamic(() => import("../link"));
const ComponentSpinner = dynamic(
  () => import("@/components/widgets/spinner/component.spinner")
);

type PropsType = {
  address: UserAddressType;
  action: () => void;
  setSelected: (address: UserAddressType) => void;
};
function AddressItem({ address, action, setSelected }: PropsType) {
  const user = useAppSelector((state) => state.user.auth);
  const [loading, setLoading] = useState(false);
  //   const [data]
  const setDefault = async () => {
    try {
      setLoading(true);
      const res = await post(
        routeConfig.account.addresses + "/default/" + address.id,
        null,
        user.token
      );
      if (res && res.status_code == 200) {
        action();
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Grid item md={12} p={2}>
      {loading ? (
        <ComponentSpinner loading={loading} />
      ) : (
        <Card elevation={4} sx={{ width: 1, borderRadius: 2 }}>
          <CardContent>
            <Grid display={"flex"} justifyContent={"space-between"}>
              <Chip color="primary" size="small" label={address.type} />
              {address?.is_default ? (
                <Chip size="small" label={"Default"} />
              ) : null}
            </Grid>
            {address ? (
              <Grid
                mt={1}
                display={"flex"}
                justifyContent={"space-between"}
                flexDirection={"column"}
                alignItems={"flex-start"}
              >
                <Grid>
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    color={themeColor.primary}
                  >
                    {address.country ? address.country + ", " : ""}
                    {address.city ? address.city + ", " : ""}
                    {address.building ? address.building + ", " : ""}
                    {address.flat_number ? address.flat_number : ""}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    color={themeColor.primary}
                  >
                    {address.address}
                  </Typography>
                </Grid>
              </Grid>
            ) : null}
            <Grid
              key={"actions"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <CustomLink
                // url={"/account/addresses/" + address.id}
                action={() => {
                  setSelected(address);
                }}
                width={"auto"}
              >
                <Typography
                  variant="caption"
                  color={themeColor.secondary.dark}
                  fontWeight={"bold"}
                >
                  Edit
                </Typography>
              </CustomLink>
              {!address.is_default ? (
                <CustomLink action={setDefault} width={"auto"}>
                  <Typography
                    variant="caption"
                    color={themeColor.secondary.dark}
                    fontWeight={"bold"}
                  >
                    Set As Default
                  </Typography>
                </CustomLink>
              ) : null}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Grid>
  );
}

export default AddressItem;
