import * as React from "react";
import { styled } from "@mui/material";
import themeColor from "@/components/constant/color";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dynamic from "next/dynamic";

const Profile = dynamic(() => import("@/components/widgets/account/profile"));
const Address = dynamic(() => import("@/components/widgets/account/address"));
const MyOrder = dynamic(() => import("@/components/widgets/account/order"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Tab = dynamic(() => import("@mui/material/Tab"));
const Tabs = dynamic(() => import("@mui/material/Tabs"));
const Layout = dynamic(() => import("@/components/design/layout"));

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
    style: {
      color: themeColor.primary.dark,
      fontWeight: "bold",
    },
  };
}

function VerticalTabs(props: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const AntTabs = styled(Tabs)({
    borderBottom: "1px solid #e8e8e8",
    "& .MuiTabs-indicator": {
      backgroundColor: "#1890ff",
    },
  });

  const StyledTab = styled((props: any) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      color: "rgba(255, 255, 255, 0.7)",
      "&.Mui-selected": {
        color: "#fff",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "rgba(100, 95, 228, 0.32)",
      },
    })
  );

  const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;

    return (
      <Grid
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tabpanel-${index}`}
        {...other}
      >
        {value === index && <Grid mt={1}>{children}</Grid>}
      </Grid>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <Layout>
      <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Grid container maxWidth={"lg"} mt={3} width={1} >
          <Grid item xs={12} sx={{ borderBottom: 1, borderColor: "divider" }}>
            <AntTabs
              value={value}
              style={{
                backgroundColor: themeColor.mainBackground,
              }}
              scrollButtons
              allowScrollButtonsMobile
              onChange={handleChange}
              aria-label="Vertical tabs example"
            >
              <StyledTab label="Profile" {...a11yProps(0)} />
              <StyledTab label="Address" {...a11yProps(1)} />
              <StyledTab label="Orders" {...a11yProps(2)} />
            </AntTabs>
            <TabPanel value={value} index={0}>
              <Profile />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Address />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <MyOrder />
            </TabPanel>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({ user: state.user.auth });
VerticalTabs.auth = true;
export default connect(mapStateToProps)(VerticalTabs);
