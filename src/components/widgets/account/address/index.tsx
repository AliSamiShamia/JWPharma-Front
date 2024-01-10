import dynamic from "next/dynamic";
import React from "react";
import { connect } from "react-redux";
const Grid = dynamic(() => import("@mui/material/Grid"));
const AddressList = dynamic(() => import("@/components/widgets/address/list"));

function Addresses(props: any) {
  return (
    <Grid container display={"flex"} alignItems={"center"} gap={2} py={2}>
      <AddressList />
    </Grid>
  );
}

const mapStateToProps = (state: any) => ({ user: state.tempUser.info });
export default connect(mapStateToProps)(Addresses);
