import { useAuth } from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import React from "react";
import { connect } from "react-redux";
const Grid = dynamic(() => import("@mui/material/Grid"));
const Alert = dynamic(() => import("@mui/material/Alert"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const AddressList = dynamic(() => import("@/components/widgets/address/list"));

function Addresses(props: any) {
  const auth = useAuth();
  return (
    <Grid container display={"flex"} alignItems={"center"} gap={2} py={2}>
      {auth.user && !auth.user.complete_info ? (
        <Grid
          mb={2}
          width={1}
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
        >
          <Alert color="warning" icon={false}>
            <Typography color={"error"} variant="body1">
              Your checkout requires complete information ( Address ) that is
              currently missing.
            </Typography>
          </Alert>
        </Grid>
      ) : null}
      <AddressList />
    </Grid>
  );
}

const mapStateToProps = (state: any) => ({ user: state.tempUser.info });
export default connect(mapStateToProps)(Addresses);
