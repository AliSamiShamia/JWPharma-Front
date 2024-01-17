import routeConfig from "@/components/constant/route";
import { get } from "@/handler/api.handler";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AddressItem from "./item";
import NewAddress from "./new";
import { useAppSelector } from "@/store/hooks";
const Grid = dynamic(() => import("@mui/material/Grid"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardHeader = dynamic(() => import("@mui/material/CardHeader"));
const CustomLink = dynamic(() => import("../link"));
const ComponentSpinner = dynamic(
  () => import("@/components/widgets/spinner/component.spinner")
);

function AddressList() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<UserAddressType>();
  const router = useRouter();
  const [data, setData] = useState([] as UserAddressType[]);
  const user = useAppSelector((state) => state.user.auth);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await get(routeConfig.account.addresses,user?.token);
      setLoading(false);
      if (res && res.status_code == 200) {
        setData(res.data);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    loadData();
    return () => {};
  }, [router.route]);

  const handleUpdate = (value: UserAddressType) => {
    setSelected(value);
    setOpen(true);
  };

  return (
    <Grid
      width={1}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {loading ? (
        <Grid>
          <ComponentSpinner loading={true} />
        </Grid>
      ) : (
        <>
          <Grid container maxWidth={"xl"} width={1}>
            <Grid width={1} display={"flex"} justifyContent={"flex-end"}>
              <CustomLink
                width={150}
                padding={"auto"}
                title="New Address"
                action={() => {
                  setOpen(true);
                }}
                type="outlined"
                color={"primary"}
              />
            </Grid>
            <Grid container>
              {data.map((address, key) => {
                return (
                  <AddressItem
                    key={key}
                    address={address}
                    action={loadData}
                    setSelected={handleUpdate}
                  />
                );
              })}
            </Grid>
          </Grid>
        </>
      )}
      <NewAddress
        open={open}
        setOpen={setOpen}
        action={loadData}
        address={selected}
      />
    </Grid>
  );
}

export default AddressList;
