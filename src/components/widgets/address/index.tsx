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
import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import CustomLink from "../link";

function UserAddresses() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [address, setAddress] = useState<UserAddressType>(
    {} as UserAddressType
  );
  const getAddress = async () => {
    setLoading(true);
    const res = await get(routeConfig.account.defaultAddress);
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
            <Card sx={{ backgroundColor: themeColor.lightGreyColor }}>
              <CardHeader
                title={<Chip color="primary" label={address.type} />}
                action={[
                  <Grid display={"flex"} alignItems={"center"}>
                    <CustomLink link url={"/account/addresses/" + address.id}>
                      <Typography
                        variant="caption"
                        color={themeColor.secondary.dark}
                        fontWeight={"bold"}
                      >
                        Edit
                      </Typography>
                    </CustomLink>

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
                    alignItems={"center"}
                  >
                    <Grid>
                      <Typography variant="body1" fontWeight={"bold"}>
                        {address.country ? address.country + ", " : ""}
                        {address.city ? address.city + ", " : ""}
                        {address.building ? address.building + ", " : ""}
                        {address.flat_number ? address.flat_number : ""}
                      </Typography>
                    </Grid>
                    {/* <Grid>
                      <Chip label={address.type} size="small" color="primary" />
                    </Grid> */}
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
