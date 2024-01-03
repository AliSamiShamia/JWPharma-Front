// ** React Imports
import { useEffect, useState } from "react";

// ** Next Imports
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

// ** Icon Imports
import { FaRegEye } from "@react-icons/all-files/fa/FaRegEye";
import { FaRegEyeSlash } from "@react-icons/all-files/fa/FaRegEyeSlash";
import { FaSignInAlt } from "@react-icons/all-files/fa/FaSignInAlt";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import {
  Alert,
  Button,
  Divider,
  FormControlLabelProps,
  FormHelperText,
  Grid,
  TypographyProps,
} from "@mui/material";
import Layout from "@/components/design/layout";
import dynamic from "next/dynamic";
import { post } from "@/handler/api.handler";
import routeConfig from "@/components/constant/route";
import { ClipLoader } from "react-spinners";
import { connect, useDispatch } from "react-redux";
import { storeUser } from "@/store/apps/user";
import PhoneComponent from "@/components/widgets/account/phone";
import EmailComponent from "@/components/widgets/account/email";
import Swal from "sweetalert2";
import { storeTempUser } from "@/store/apps/temp-user";

const Checkbox = dynamic(() => import("@mui/material/Checkbox"));
const TextField = dynamic(() => import("@mui/material/TextField"));
const InputLabel = dynamic(() => import("@mui/material/InputLabel"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const FormControl = dynamic(() => import("@mui/material/FormControl"));
const OutlinedInput = dynamic(() => import("@mui/material/OutlinedInput"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const MuiFormControlLabel = dynamic(
  () => import("@mui/material/FormControlLabel")
);
const CustomLink = dynamic(() => import("@/components/widgets/link"));

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { mt: theme.spacing(8) },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    "& .MuiFormControlLabel-label": {
      fontSize: "0.875rem",
      color: theme.palette.text.secondary,
    },
  })
);

const RegisterPage = (props: any) => {
  const router = useRouter();
  const { user } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [form_data, setFormData] = useState({
    user_name: "",
    country_code: "",
  } as any);
  const [registerByPhone, setRegisterByPhone] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [user_name, setUsername] = useState("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<string>();
  const [generalError, setGeneralError] = useState<string>("");

  const dispatch = useDispatch();
  useEffect(()=>{
    if(user.isAuth){
      router.replace('/profile');
    }
  },[user])

  const validataForm = () => {
    if (registerByPhone) {
      if (form_data.country_code === "") {
        Swal.fire({
          text: "Country code is required.",
          icon: "warning",
        });
        return false;
      } else if (form_data.user_name === "") {
        Swal.fire({
          text: "Phone Number is required.",
          icon: "warning",
        });
        return false;
      } else {
        const pattern = /^[0-9]+$/;
        if (!pattern.test(form_data.user_name)) {
          // setError("Please enter a valid phone number.");
          Swal.fire({
            text: "Please enter a valid phone number.",
            icon: "warning",
          });
          return false;
        }
      }
      return true;
    } else {
      if (form_data.user_name === "") {
        Swal.fire({
          text: "Email is required!",
          icon: "warning",
        });

        return false;
      } else {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!pattern.test(form_data.user_name)) {
          Swal.fire({
            text: "Please enter a valid email address.",
            icon: "warning",
          });
          return false;
        }
      }
      return true;
    }
  };

  const handleOtpInput = (value: string) => {
    const onlyNums = value.replace(/[^0-9]/g, "");
    setOtp(onlyNums);
  };

  const onSubmit = async () => {
    setGeneralError("");
    if (otpSent) {
      verifyOtp();
    } else {
      register();
    }
  };

  const sendOtp = async () => {
    setError(false);
    if (validataForm()) {
      setLoading(true);

      let data = {
        ...form_data,
        user_id: user?.id,
      };
      const res = await post(routeConfig.account.otp.send, data);
      if (res && res.status_code == 200) {
        setOtpSent(true);
        dispatch(
          storeTempUser({
            ...res.data,
            user_name: form_data.user_name,
          })
        );
      } else {
        Swal.fire({
          title: "Oops...",
          text: "Something went wrong, Please check the details!",
          icon: "error",
        });
      }
      setLoading(false);
    }
  };

  const register = async () => {
    setError(false);
    if (validataForm()) {
      setLoading(true);
      const res = await post(routeConfig.account.register, form_data);
      if (res && res.status_code == 200) {
        setOtpSent(true);
        dispatch(
          storeTempUser({
            ...res.data,
            user_name: form_data.user_name,
          })
        );
      } else {
        Swal.fire({
          title: "Oops...",
          text: "Something went wrong, Please check the details!",
          icon: "error",
        });
      }
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setOtpError("");
    if (otp === "") {
      setOtpError("Please Enter the OTP.");
    } else if (otp.length < 6) {
      setOtpError("OTP should be 6 digits");
    } else {
      setLoading(true);
      const formData = {
        user_name: user.user_name,
        otp: otp,
        user_id: user?.user_id,
      };
      const res = await post(routeConfig.account.otp.check, formData);
      if (res && res.status_code == 200) {
        dispatch(
          storeUser({
            ...res.data,
            isAuth: true,
          })
        );
        window.localStorage.setItem(
          routeConfig.storageTokenKeyName,
          `${res.data.token}`
        );
        router.replace("/profile");
      } else {
        Swal.fire({
          title: "Oops...",
          text: "The entered OTP is incorrect.",
          icon: "error",
        });
      }
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
        <Grid item lg={6} md={8} sm={10} xs={12}>
          <Box
            sx={{
              px: { md: 12, xs: 5 },
              py: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BoxWrapper>
              <Box sx={{ mb: 4 }}>
                <TypographyStyled variant="h5">
                  Welcome to JWPharma City Middle East! 👋🏻
                </TypographyStyled>
                {otpSent ? (
                  <Typography variant="body2" display={"flex"} gap={0.6}>
                    We sent an OTP to
                    <Typography
                      variant="body2"
                      fontStyle={"italic"}
                      fontWeight={"bold"}
                    >
                      {user_name}
                    </Typography>
                    , Please enter the code you received
                  </Typography>
                ) : null}
              </Box>
              <form noValidate autoComplete="off">
                <FormControl fullWidth>
                  {generalError && (
                    <Alert
                      severity="error"
                      sx={{ mb: 3 }}
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => setGeneralError("")}
                        >
                          <FaTimes />
                        </IconButton>
                      }
                    >
                      {generalError}
                    </Alert>
                  )}
                  {otpSent ? (
                    <>
                      <TextField
                        autoFocus
                        label="OTP"
                        value={otp}
                        error={Boolean(otpError)}
                        onChange={(e) => handleOtpInput(e.target.value)}
                        placeholder="Enter OTP"
                        inputProps={{ maxLength: 6 }}
                      />
                      {otpError && (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {otpError}
                        </FormHelperText>
                      )}
                      <Grid
                        sx={{ mb: 4 }}
                        display={"flex"}
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                      >
                        <Typography variant="body2">
                          Have you not received it?
                        </Typography>

                        <CustomLink
                          action={loading == true ? () => {} : sendOtp}
                          size={"small"}
                          type="text"
                          color={"primary"}
                          title={"Resend"}
                          width={"auto"}
                          endIcon={
                            loading == true ? (
                              <ClipLoader size={20} loading={true} />
                            ) : null
                          }
                        />
                      </Grid>
                    </>
                  ) : registerByPhone ? (
                    <PhoneComponent
                      form_data={form_data}
                      handleChange={setFormData}
                    />
                  ) : (
                    <EmailComponent
                      form_data={form_data}
                      handleChange={setFormData}
                    />
                  )}
                </FormControl>
                <Grid mt={1}>
                  <CustomLink
                    action={loading == true ? () => {} : onSubmit}
                    size={"large"}
                    padding={1.5}
                    type="contained"
                    color={"primary"}
                    title={otpSent ? "Verify" : "Sign Up"}
                    endIcon={
                      loading == true ? (
                        <ClipLoader size={20} loading={true} />
                      ) : null
                    }
                  />
                </Grid>

                <Divider orientation="horizontal" flexItem sx={{ mt: 2 }} />
                <Grid
                  mt={2}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <TypographyStyled variant="h6">OR</TypographyStyled>
                  <CustomLink
                    action={() => {
                      setFormData({
                        user_name: "",
                        country_code: null,
                      } as any);
                      setRegisterByPhone(!registerByPhone);
                    }}
                    title={
                      registerByPhone
                        ? "Continue with email address"
                        : "continue with phone number"
                    }
                    size={"small"}
                  />
                </Grid>
              </form>
            </BoxWrapper>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state: any) => ({ user: state.tempUser.info });

export default connect(mapStateToProps)(RegisterPage);
