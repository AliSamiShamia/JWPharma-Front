// ** React Imports
import { ChangeEvent, FormEvent, useState } from "react";

// ** Next Imports
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import {
  FormControlLabelProps,
  TextField,
  TypographyProps,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { post } from "@/handler/api.handler";
import routeConfig from "@/components/constant/route";
import { storeTempUser } from "@/store/apps/temp-user";

const Layout = dynamic(() => import("@/components/design/layout"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const CountryCode = dynamic(() => import("@/components/widgets/country/code"));
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
  const returnUrl = useSearchParams().get("returnUrl");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+971");
  const dispatch = useDispatch();
  const [phoneError, setPhoneError] = useState("");
  const [countryCodeError, setCountryCodeError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [valid, setValid] = useState(true);

  const validataForm = () => {
    setPhoneError("");
    if (phone === "") {
      setPhoneError("Phone Number is required.");
    } else {
      const phoneRegex = /^[0-9]+$/;
      if (!phoneRegex.test(phone)) {
        setPhoneError("Please enter a valid phone number");
      }
    }
    if (countryCode === "") {
      setCountryCodeError("Country code is required.");
    } else {
      const phoneRegex = /^[0-9]+$/;
      if (!phoneRegex.test(phone)) {
        setPhoneError("Please select a valid country code");
      }
    }
    if (phoneError !== "") {
      return false;
    }
    if (countryCodeError !== "") {
      return false;
    }
    return true;
  };
  const onSubmit = async () => {
    setGeneralError("");
    if (validataForm()) {
      setLoading(true);
      const formData = {
        phone_number: phone,
        country_code: countryCode,
      };
      const res = await post(routeConfig.account.register, formData);
      if (res && res.status_code == 200) {
        dispatch(storeTempUser(res.data));
        router.replace("/verify-account");
      } else {
        setGeneralError("Wrong Phone Number / Country Code");
      }
      setLoading(false);
    }
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = event.currentTarget.value;
    // Regular expression to validate phone number (10 digits)
    const phoneRegex = /^[0-9]+$/;

    // Check if the entered number matches the required format
    if (phoneRegex.test(phoneNumber)) {
      setValid(true);
    } else {
      setValid(false);
    }
    setPhone(phoneNumber);
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
                  </Box>
                  <Grid>
                    <Grid>
                      <Typography variant="h6">
                        Enter Your Phone Number
                      </Typography>

                      <Grid display={"flex"} width={1} mt={2}>
                        <CountryCode
                          code={countryCode}
                          handleChange={(
                            option: ChangeEvent<HTMLInputElement>
                          ) => {
                            setCountryCode(option.target.value);
                          }}
                        />
                        <TextField
                          type="tel"
                          fullWidth
                          value={phone}
                          error={!valid}
                          onChange={handlePhoneChange}
                        />
                      </Grid>
                      <Typography variant="caption">
                        We will send you the 4 digit verification code
                      </Typography>
                      <Grid
                        mt={4}
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
                          title="Sign up"
                          width={300}
                          endIcon={
                            loading == true ? (
                              <ClipLoader size={20} loading={true} />
                            ) : null
                          }
                        />
                      </Grid>

                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="body2" sx={{ mr: 2 }}>
                          Do have an account?
                        </Typography>
                        <Typography variant="body2">
                          <LinkStyled href="/login">Sign In</LinkStyled>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </BoxWrapper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default RegisterPage;
