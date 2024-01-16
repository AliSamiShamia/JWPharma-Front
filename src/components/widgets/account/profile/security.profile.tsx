import React, { useState } from "react";
import PhoneComponent from "../phone";
import { connect } from "react-redux";
import { post } from "@/handler/api.handler";
import routeConfig from "@/components/constant/route";
import Swal from "sweetalert2";
import { useAppDispatch } from "@/store/hooks";
import { storeUser } from "@/store/apps/user";
import dynamic from "next/dynamic";
import themeColor from "@/components/constant/color";
const TextField = dynamic(() => import("@mui/material/TextField"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const Card = dynamic(() => import("@mui/material/Card"));
const Button = dynamic(() => import("@mui/material/Button"));
const Box = dynamic(() => import("@mui/material/Box"));
const CustomLink = dynamic(() => import("../../link"));

import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import { ClipLoader } from "react-spinners";

function Security(props: any) {
  const { user } = props;
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch();

  const [form_data, setFormData] = useState({
    email: user.email,
    user_name: user.phone_number,
    country_code: user.country_code,
  });

  const handleChange = (key: string, value: string) => {
    let data = {
      ...form_data,
      [key]: value,
    };
    setFormData(data);
  };

  const updateUserSecurity = async () => {
    try {
      let data = {
        email: form_data.email,
        phone_number: form_data.user_name,
        country_code: form_data.country_code,
      };
      const res = await post(routeConfig.account.update.security, data,user.token);
      if (res && res.status_code == 200) {
        Swal.fire({
          text: "Your details have been successfully refreshed.",
          icon: "success",
        });
        dispatch(
          storeUser({
            ...res.data,
            isAuth: true,
          })
        );
      } else {
        Swal.fire({
          text: "Error detected. Review details and retry.",
          icon: "error",
        });
      }
    } catch (e) {
      Swal.fire({
        text: "Error in request, Please try again",
        icon: "error",
      });
    }
  };

  return (
    <Card sx={{ width: 1 }}>
      <CardContent>
        <Grid>
          <Grid display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h6" fontWeight={"bold"}>
              Security
            </Typography>
            {edit ? (
              <Button
                variant="contained"
                size="small"
                color="error"
                endIcon={<MdClose size={15} />}
                onClick={() => {
                  setEdit(false);
                }}
              >
                cancel
              </Button>
            ) : (
              <Button
                color="info"
                size="small"
                variant="outlined"
                endIcon={<MdEdit size={15} />}
                onClick={() => {
                  setEdit(true);
                }}
              >
                edit
              </Button>
            )}
          </Grid>
          {edit ? (
            <>
              <Grid
                mt={3}
                gap={3}
                display={"flex"}
                justifyContent={"space-between"}
                sx={{ flexDirection: { md: "row", xs: "column" } }}
              >
                <TextField
                  size="small"
                  required
                  fullWidth
                  onChange={(e) => {
                    handleChange("email", e.target.value);
                  }}
                  label={"Email Address"}
                  variant="outlined"
                  placeholder="Email Address"
                  value={form_data.email || ""}
                />
                <Grid width={1}>
                  <PhoneComponent
                    form_data={form_data}
                    handleChange={(data) => {
                      setFormData(data);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid mt={3} display={"flex"} justifyContent={"flex-end"}>
                {loading ? (
                  <ClipLoader size={20} loading={true} />
                ) : (
                  <CustomLink
                    width={150}
                    padding={"auto"}
                    action={updateUserSecurity}
                    title="Save"
                    type="contained"
                    color={"info"}
                  />
                )}
              </Grid>
            </>
          ) : (
            <>
              <Grid
                mt={3}
                display={"flex"}
                justifyContent={"space-between"}
                sx={{ flexDirection: { md: "row", xs: "column" } }}
              >
                <Box display={"flex"} gap={1}>
                  <Typography
                    variant="body2"
                    fontWeight={"bold"}
                    color={themeColor.textGreyColor}
                  >
                    Email Address:
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                  >
                    {form_data.email}
                  </Typography>
                </Box>
                <Box display={"flex"} gap={1}>
                  <Typography
                    variant="body2"
                    fontWeight={"bold"}
                    color={themeColor.textGreyColor}
                  >
                    Phone Number:
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                  >
                    {form_data.country_code + form_data.user_name}
                  </Typography>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state: any) => ({ user: state.user.auth });
export default connect(mapStateToProps)(Security);
