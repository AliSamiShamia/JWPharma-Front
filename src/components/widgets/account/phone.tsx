import { Grid, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import CountryCode from "../country/code";

type PhonePropType = {
  form_data: any;
  handleChange: (value: any) => void;
};

function PhoneComponent({ form_data, handleChange }: PhonePropType) {
  const [countryCode, setCountryCode] = useState<string>("");
  const [valid, setValid] = useState(true);

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
    let data = {
      ...form_data,
      user_name: phoneNumber,
      country_code: countryCode,
    };
    handleChange(data);
  };
  const handleCountryCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const countryCode = event.target.value;
    setCountryCode(countryCode);
    let data = {
      ...form_data,
      country_code: countryCode,
    };
    handleChange(data);
  };

  return (
    <Grid display={"flex"} width={1}>
      <CountryCode code={countryCode} handleChange={handleCountryCodeChange} />
      <TextField
        type="tel"
        fullWidth
        value={form_data.user_name}
        error={!valid}
        onChange={handlePhoneChange}
        placeholder="Enter your phone number"
      />
    </Grid>
  );
}

export default PhoneComponent;
