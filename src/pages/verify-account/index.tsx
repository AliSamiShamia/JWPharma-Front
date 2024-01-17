import themeColor from "@/components/constant/color";
import routeConfig from "@/components/constant/route";
import CustomLink from "@/components/widgets/link";
import { post } from "@/handler/api.handler";
import { deleteTempUser, storeTempUser } from "@/store/apps/temp-user";
import { Box, TextField } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
const Layout = dynamic(() => import("@/components/design/layout"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));

function VerifyAccount(props: any) {
  const [otp, setOtp] = useState(["", "", "", ""]); // Array to hold OTP digits
  const [user, setUser] = useState<any>(props.user);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const inputRefs = Array.from({ length: otp.length }, () =>
    useRef<HTMLInputElement>(null)
  );

  useEffect(() => {
    // Autofocus on the first input field
    const nextInputRef = inputRefs[0].current;
    if (nextInputRef) {
      nextInputRef.focus();
    }
  }, []);

  useEffect(() => {
    if (!user) {
      router.replace("/register");
    }
  }, []);

  const handleInputChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newOtp = [...otp];
      newOtp[index] = event.target.value;
      setOtp(newOtp);
      if (event.target.value.length === 1 && index < otp.length - 1) {
        const nextInputRef = inputRefs[index + 1];
        if (nextInputRef && nextInputRef.current) {
          nextInputRef.current.focus();
        }
      }
    };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const form_data = {
        phone_number: user.blank_phone,
        otp: otp.join(""),
      };
      const res = await post(routeConfig.account.otp.check, form_data,null);
      if (res && res.status_code == 200) {
        // dispatch(deleteTempUser());
        // return router.replace();
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const Resend = async () => {
    try {
      setLoading(true);
      const form_data = {
        phone_number: user.phone_number,
        country_code: user.country_code,
      };
      const res = await post(routeConfig.account.otp.send, form_data,null);
      console.log(res);
      if (res && res.status_code == 200) {
        dispatch(storeTempUser(res.data));
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Grid
        container
        mt={6}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid
          item
          lg={6}
          md={6}
          sm={10}
          xs={12}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Card elevation={5}>
            <CardContent>
              <Grid
                width={1}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
              >
                <Typography variant="h5" color={"primary"} fontStyle={"italic"}>
                  We have sent the otp to{" "}
                </Typography>
                <Typography variant="h6" color={"primary"}>
                  {user?.blank_phone}
                </Typography>
              </Grid>
              <Box
                sx={{
                  px: { md: 12, xs: 5 },
                  py: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {inputRefs.map((inputRef, index) => (
                  <Grid p={1}>
                    <TextField
                      key={index}
                      onChange={handleInputChange(index)}
                      variant="outlined"
                      size="medium"
                      // maxLength={1}
                      inputProps={{ maxLength: 1 }}
                      sx={{ width: 50 }}
                      inputRef={inputRef}
                      autoFocus={index === activeIndex}
                      // Add other necessary props like label, helperText, etc.
                    />
                  </Grid>
                ))}
              </Box>
              <Grid
                mb={4}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <CustomLink
                  action={loading == true ? () => {} : onSubmit}
                  size={"large"}
                  padding={1.5}
                  type="contained"
                  color={"primary"}
                  title="Verify"
                  width={300}
                  endIcon={
                    loading == true ? (
                      <ClipLoader size={20} loading={true} />
                    ) : null
                  }
                />
              </Grid>
              <Grid
                width={1}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography
                  variant="body1"
                  color={"primary"}
                  fontStyle={"italic"}
                >
                  You didn`t receive it
                </Typography>
                <CustomLink
                  action={loading == true ? () => {} : Resend}
                  size={"large"}
                  padding={1.5}
                  color={"primary"}
                  title="Resend"
                  width={300}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
const mapStateToProps = (state: any) => ({ user: state.tempUser.info });

export default connect(mapStateToProps)(VerifyAccount);
