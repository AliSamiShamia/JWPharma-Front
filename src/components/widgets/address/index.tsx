import themeColor from "@/components/constant/color";
import routeConfig from "@/components/constant/route";
import { post, get } from "@/handler/api.handler";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const Chip = dynamic(() => import("@mui/material/Chip"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const CardHeader = dynamic(() => import("@mui/material/CardHeader"));
const ComponentSpinner = dynamic(
  () => import("@/components/widgets/spinner/component.spinner")
);
import CustomLink from "../link";
import { useAppSelector } from "@/store/hooks";

function UserAddresses() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [address, setAddress] = useState<UserAddressType>(
    {} as UserAddressType
  );
  const user = useAppSelector((state) => state.user.auth);

  const getAddress = async () => {
    setLoading(true);
    const res = await get(routeConfig.account.defaultAddress,user?.token);
    if (res && res.status_code == 200) {
      setAddress(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    getAddress();
    return () => {};
  }, [router.route]);
  return (
    <Grid>
      {loading ? (
        <ComponentSpinner loading={loading} />
      ) : (
        <>
          <Grid mt={2}>
            <Card sx={{ border: 1, borderColor: themeColor.lightGreyColor }}>
              <CardHeader
                title={
                  <Chip color="primary" size="small" label={address.type} />
                }
                action={[
                  <Grid key={"actions"} display={"flex"} alignItems={"center"}>
                    <CustomLink link url={"/account/addresses"}>
                      <Typography
                        variant="caption"
                        color={themeColor.secondary.dark}
                        fontWeight={"bold"}
                      >
                        Change
                      </Typography>
                    </CustomLink>
                  </Grid>,
                ]}
              />
              <CardContent sx={{ pt: 0 }}>
                {address ? (
                  <Grid
                    display={"flex"}
                    justifyContent={"space-between"}
                    flexDirection={"column"}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={"bold"}
                      color={themeColor.textGreyColor}
                    >
                      {address.country ? address.country + ", " : ""}
                      {address.city ? address.city + ", " : ""}
                      {address.building ? address.building + ", " : ""}
                      {address.flat_number ? address.flat_number : ""}
                    </Typography>
                    <Typography
                      variant="caption"
                      fontWeight={"bold"}
                      color={themeColor.textGreyColor}
                    >
                      {address.address ? address.address : ""}
                    </Typography>
                  </Grid>
                ) : null}
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  );
}

UserAddresses.auth = true;
export default UserAddresses;
