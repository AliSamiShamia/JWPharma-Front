import dynamic from "next/dynamic";
import React from "react";
import { connect } from "react-redux";
const Layout = dynamic(() => import("@/components/design/layout"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const CardHeader = dynamic(() => import("@mui/material/CardHeader"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const CustomLink = dynamic(() => import("@/components/widgets/link"));
function Profile(props: any) {
  const { user } = props;

  return (
    <Layout>
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={6}
      >
        <Grid
          container
          maxWidth={"lg"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {user.email}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({ user: state.user.info });
Profile.auth = true;
export default connect(mapStateToProps)(Profile);
