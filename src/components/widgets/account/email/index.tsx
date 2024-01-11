import { Grid, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type EmailPropType = {
  form_data: any;
  handleChange: (value: any) => void;
};

function EmailComponent({ form_data, handleChange }: EmailPropType) {
  const handleEmailChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const email = event.currentTarget.value;
    let data = {
      ...form_data,
      user_name: email,
    };
    handleChange(data);
  };

  return (
    <Grid display={"flex"} width={1}>
      <TextField
        autoFocus
        // size="small"
        autoComplete="ssss"
        fullWidth
        label="Email Address"
        value={form_data.user_name}
        onChange={handleEmailChange}
        placeholder="Enter your email"
      />
    </Grid>
  );
}

export default EmailComponent;
