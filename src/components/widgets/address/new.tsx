import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import Country from "../country";
import routeConfig from "@/components/constant/route";
import { post, put } from "@/handler/api.handler";
import { useAuth } from "@/hooks/useAuth";
import ComponentSpinner from "../spinner/component.spinner";
const CustomLink = dynamic(() => import("../link"));
const Radio = dynamic(() => import("@mui/material/Radio"));
const FormControl = dynamic(() => import("@mui/material/FormControl"));
const FormControlLabel = dynamic(
  () => import("@mui/material/FormControlLabel")
);
const FormLabel = dynamic(() => import("@mui/material/FormLabel"));
const RadioGroup = dynamic(() => import("@mui/material/RadioGroup"));
const TextField = dynamic(() => import("@mui/material/TextField"));
const Modal = dynamic(() => import("@mui/material/Modal"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));

type PropsType = {
  open: boolean;
  setOpen: (status: boolean) => void;
  action: () => void;
  address?: any;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function NewAddress({ open, setOpen, action, address }: PropsType) {
  const handleClose = () => setOpen(false);
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [form_data, setFormData] = useState<UserAddressType>({
    id: "-1",
    country: "",
    country_code: "",
    city: "",
    building: "",
    flat_number: "",
    map_url: "",
    address: "",
    type: "Home",
    is_default: false,
  });

  useEffect(() => {
    if (address) {
      setFormData(address);
    }
  }, [address]);
  const handleChange = (key: string, value: string) => {
    let data = {
      ...form_data,
      [key]: value,
    } as UserAddressType;
    setFormData(data);
  };
  const submit = async () => {
    let data = {
      ...form_data,
    };
    try {
      setLoading(true);
      if (address) {
        const res = await put(
          routeConfig.account.addresses + "/" + address.id,
          data,
          auth.user?.token
        );
        if (res && res.status_code == 200) {
          setOpen(false);
          action();
        }
      } else {
        const res = await post(
          routeConfig.account.addresses,
          data,
          auth.user?.token
        );
        if (res && res.status_code == 200) {
          setOpen(false);
          action();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-new-address"
      >
        <Box sx={{ ...style, width: { md: "50%", xs: 400 } }}>
          <Typography variant="h5" id="add-new-address">
            Add New Address
          </Typography>
          <Grid
            container
            mt={3}
            gap={2}
            display={"flex"}
            justifyContent={"center"}
          >
            <Grid item md={12} xs={12}>
              <Country
                value={form_data.country}
                handleChange={(value: any) => {
                  // handleChange("country", value);
                  // handleChange("country_code", value.code);
                  setFormData({
                    ...form_data,
                    country: value.label,
                    country_code: value.code,
                  });
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                size="small"
                autoComplete={"false"}
                placeholder="City"
                fullWidth
                value={form_data?.city}
                onChange={(e) => {
                  handleChange("city", e.target.value);
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                size="small"
                autoComplete={"false"}
                placeholder="Building"
                fullWidth
                value={form_data?.building}
                onChange={(e) => {
                  handleChange("building", e.target.value);
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                size="small"
                autoComplete={"false"}
                placeholder="Flat Number"
                fullWidth
                value={form_data?.flat_number}
                onChange={(e) => {
                  handleChange("flat_number", e.target.value);
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                size="small"
                autoComplete={"false"}
                placeholder="Address"
                multiline
                rows={3}
                fullWidth
                value={form_data?.address}
                onChange={(e) => {
                  handleChange("address", e.target.value);
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="home"
                  value={form_data?.type}
                  name="radio-buttons-group"
                  onChange={(e) => {
                    handleChange("type", e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="home"
                    control={<Radio value={"home"} />}
                    label="Home"
                  />
                  <FormControlLabel
                    value="work"
                    control={<Radio value={"work"} />}
                    label="Work"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid mt={4} display={"flex"} justifyContent={"center"}>
            {loading ? (
              <ComponentSpinner loading={true} />
            ) : (
              <CustomLink
                action={submit}
                title="Save"
                type="contained"
                width={300}
              />
            )}
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default NewAddress;
