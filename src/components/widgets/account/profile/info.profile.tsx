import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { post } from "@/handler/api.handler";
import routeConfig from "@/components/constant/route";
import { storeUser } from "@/store/apps/user";
import { useAppDispatch } from "@/store/hooks";
import dynamic from "next/dynamic";
const CustomLink = dynamic(() => import("../../link"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const TextField = dynamic(() => import("@mui/material/TextField"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Button = dynamic(() => import("@mui/material/Button"));
const Box = dynamic(() => import("@mui/material/Box"));
import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import themeColor from "@/components/constant/color";
import Country from "@/components/widgets/country";
import { ClipLoader } from "react-spinners";
import { useAuth } from "@/hooks/useAuth";

function GeneralInfo(props: any) {
  const auth = useAuth();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [form_data, setFormData] = useState({
    first_name: auth.user?.first_name,
    middle_name: auth.user?.middle_name,
    last_name: auth.user?.last_name,
    country: auth.user?.country,
  });

  useEffect(() => {
    if (auth.user) {
      setFormData({
        first_name: auth.user.first_name,
        middle_name: auth.user.middle_name,
        last_name: auth.user.last_name,
        country: auth.user.country,
      });
    } else {
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        country: "",
      });
    }
  }, [auth]);

  const handleChange = (key: string, value: string) => {
    let data = {
      ...form_data,
      [key]: value,
    };
    setFormData(data);
  };

  const updateUserInfo = async () => {
    try {
      setLoading(true);
      const res = await post(
        routeConfig.account.update.info,
        form_data,
        auth.user?.token
      );
      if (res && res.status_code == 200) {
        dispatch(
          storeUser({
            ...res.data,
            isAuth: true,
          })
        );
        Swal.fire({
          text: "Your details have been successfully refreshed.",
          icon: "success",
        });
      } else {
        Swal.fire({
          text: "Error detected. Review details and retry.",
          icon: "error",
        });
      }
      setLoading(false);
    } catch (e) {
      Swal.fire({
        text: "Error in request, Please try again",
        icon: "error",
      });
      setLoading(false);
    }
  };

  return (
    <Card sx={{ width: 1 }}>
      <CardContent>
        <Grid>
          <Grid display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h6" fontWeight={"bold"}>
              General Information
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
                display={"flex"}
                gap={1}
                justifyContent={"space-between"}
                sx={{ flexDirection: { md: "row", xs: "column" } }}
              >
                <TextField
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  label={"First Name"}
                  placeholder="First Name"
                  value={form_data.first_name || ""}
                  onChange={(e) => {
                    handleChange("first_name", e.target.value);
                  }}
                />
                <TextField
                  size="small"
                  placeholder="Middle Name"
                  fullWidth
                  label={"Middle Name"}
                  variant="outlined"
                  value={form_data.middle_name || ""}
                  onChange={(e) => {
                    handleChange("middle_name", e.target.value);
                  }}
                />
                <TextField
                  size="small"
                  placeholder="Last Name"
                  label={"Last Name"}
                  fullWidth
                  required
                  variant="outlined"
                  value={form_data.last_name || ""}
                  onChange={(e) => {
                    handleChange("last_name", e.target.value);
                  }}
                />
              </Grid>
              <Grid
                mt={3}
                container
                display={"flex"}
                justifyContent={"center"}
                sx={{ flexDirection: { md: "row", xs: "column" } }}
              >
                <Grid item md={6}>
                  <Country
                    value={form_data.country}
                    handleChange={(value: any) => {
                      handleChange("country", value.label);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid display={"flex"} justifyContent={"flex-end"}>
                {loading ? (
                  <ClipLoader size={20} loading={true} />
                ) : (
                  <CustomLink
                    width={150}
                    padding={"auto"}
                    action={updateUserInfo}
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
                    Name:
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                  >
                    {form_data.first_name +
                      " " +
                      form_data.middle_name +
                      " " +
                      form_data.last_name}
                  </Typography>
                </Box>
                {form_data.country && form_data.country != "" ? (
                  <Box display={"flex"} gap={1}>
                    <Typography
                      variant="body2"
                      fontWeight={"bold"}
                      color={themeColor.textGreyColor}
                    >
                      Country:
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={"bold"}
                      fontStyle={"italic"}
                    >
                      {form_data.country}
                    </Typography>
                  </Box>
                ) : null}
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state: any) => ({ user: state.user.auth });

GeneralInfo.auth = true;

export default connect(mapStateToProps)(GeneralInfo);
