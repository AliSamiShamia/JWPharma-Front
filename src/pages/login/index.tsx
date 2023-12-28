// ** React Imports
import { useState } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Components
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Box, { BoxProps } from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Typography, { TypographyProps } from "@mui/material/Typography";
import MuiFormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";

// ** Icon Imports
import { FaRegEye } from "@react-icons/all-files/fa/FaRegEye";
import { FaRegEyeSlash } from "@react-icons/all-files/fa/FaRegEyeSlash";
import { Grid } from "@mui/material";
import Layout from "@/components/design/layout";

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

const LoginIllustration = styled("img")(({ theme }) => ({
  maxWidth: "48rem",
  [theme.breakpoints.down("lg")]: {
    maxWidth: "35rem",
  },
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 450,
  },
}));

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

const defaultValues = {
  password: "admin",
  email: "admin@materio.com",
};

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = (data: FormData) => {
    const { email, password } = data;
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
              px: 12,
              py: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            //   backgroundColor: "#F7F7FA",
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
              <form noValidate autoComplete="off" onSubmit={() => onSubmit}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <TextField
                    autoFocus
                    label="Email"
                    value={""}
                    // onBlur={onBlur}
                    // onChange={onChange}
                    // error={Boolean(errors.email)}
                    placeholder="Enter your email"
                  />
                  {/* {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>} */}
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="auth-login-v2-password"
                    // error={Boolean(errors.password)}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    value={""}
                    // onBlur={onBlur}
                    label="Password"
                    // onChange={onChange}
                    id="auth-login-v2-password"
                    // error={Boolean(errors.password)}
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
                  {/* {errors.password && (
                                    <FormHelperText sx={{ color: 'error.main' }} id=''>
                                        {errors.password.message}
                                    </FormHelperText>
                                )} */}
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
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ mb: 7 }}
                >
                  Login
                </Button>
                <Box
                  sx={{
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
