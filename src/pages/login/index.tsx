// ** React Imports
import { useState } from "react";

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
import { useDispatch } from "react-redux";
import { storeUser } from "@/store/apps/user";

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

const LoginPage = (props: any) => {
  const returnUrl = useSearchParams().get("returnUrl");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>();
  const [generalError, setGeneralError] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useDispatch();

  const validataForm = () => {
    setEmailError("");
    setPasswordError("");

    if (email === "") {
      setEmailError("Email is required.");
    } else {
      const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (!pattern.test(email)) {
        setEmailError("Please enter a valid email address");
      }
    }
    if (password === "") {
      setPasswordError("Password is required.");
    } else if (password.length < 8) {
      setPasswordError("Password is too short.");
    }
    if (emailError !== "" || passwordError !== "") {
      return false;
    }
    return true;
  };
  const onSubmit = async () => {
    setGeneralError("");
    if (validataForm()) {
      setLoading(true);
      const formData = {
        email: email,
        password: password,
      };
      const res = await post(routeConfig.account.login, formData);
      if (res && res.status_code == 200) {
        dispatch(storeUser(res.data));
        window.localStorage.setItem(
          routeConfig.storageTokenKeyName,
          `${res.data.token}`
        );
        if (returnUrl && returnUrl !== "") {
          router.replace(`/${returnUrl}`);
        } else {
          router.replace("/profile");
        }
      } else {
        setGeneralError("Wrong Email/Password");
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
        <Grid item lg={6} md={6} sm={10} xs={12}>
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
              <Box sx={{ mb: 6 }}>
                <TypographyStyled variant="h5">
                  Welcome to JWPharma City Middle East! 👋🏻
                </TypographyStyled>
                <Typography variant="body2">
                  Please sign-in to your account
                </Typography>
              </Box>
              <form noValidate autoComplete="off">
                <FormControl fullWidth sx={{ mb: 4 }}>
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
                  <TextField
                    autoFocus
                    label="Email"
                    value={email}
                    error={Boolean(emailError)}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  {emailError && (
                    <FormHelperText sx={{ color: "error.main" }}>
                      {emailError}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="auth-login-v2-password"
                    error={Boolean(passwordError)}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    value={password}
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    id="auth-login-v2-password"
                    error={Boolean(passwordError)}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {passwordError && (
                    <FormHelperText sx={{ color: "error.main" }} id="">
                      {passwordError}
                    </FormHelperText>
                  )}
                </FormControl>
                <Box
                  sx={{
                    mb: 4,
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <FormControlLabel
                    label="Remember Me"
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                    }
                  />
                  <LinkStyled href="/forgot-password">
                    Forgot Password?
                  </LinkStyled>
                </Box>
                <CustomLink
                  action={loading == true ? () => {} : onSubmit}
                  size={"large"}
                  padding={1.5}
                  type="contained"
                  color={"primary"}
                  title="Sign In"
                  endIcon={
                    loading == true ? (
                      <ClipLoader size={20} loading={true} />
                    ) : (
                      <FaSignInAlt />
                    )
                  }
                />
                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    Don't have an account?
                  </Typography>
                  <Typography variant="body2">
                    <LinkStyled href="/register">Register Now</LinkStyled>
                  </Typography>
                </Box>
              </form>
            </BoxWrapper>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default LoginPage;
