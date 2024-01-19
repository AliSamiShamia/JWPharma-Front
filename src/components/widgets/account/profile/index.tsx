import dynamic from "next/dynamic";
import React from "react";
import { connect } from "react-redux";
import { UserType } from "@/components/types/user.types";
import { useAuth } from "@/hooks/useAuth";
const Alert = dynamic(() => import("@mui/material/Alert"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const GeneralInfo = dynamic(
  () => import("@/components/widgets/account/profile/info.profile")
);
const Security = dynamic(
  () => import("@/components/widgets/account/profile/security.profile")
);

function Profile(props: any) {
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
              Your checkout requires complete information that is currently
              missing.
            </Typography>
          </Alert>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <GeneralInfo />
      </Grid>
      <Grid item xs={12}>
        <Security />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: any) => ({ user: state.user.auth });
Profile.auth = true;
export default connect(mapStateToProps)(Profile);
