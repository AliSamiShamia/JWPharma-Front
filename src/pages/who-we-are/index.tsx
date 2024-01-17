import themeColor from "@/components/constant/color";
import dynamic from "next/dynamic";
import React from "react";
const Layout = dynamic(() => import("@/components/design/layout"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));

function index() {
  return (
    <Layout>
      <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Grid container maxWidth={"md"} mt={5} spacing={2}>
          <Typography
            variant="h4"
            color={themeColor.secondary.main}
            fontWeight="bold"
            gutterBottom
            textTransform={"capitalize"}
          >
            About us
          </Typography>
          <Grid item md={12}>
            <Typography variant="h6" paragraph>
              With offices in Baghdad, Erbil and Basra, JW pharma works with
              many of the world's leading companies through various agreements,
              partnerships, and joint ventures. The group is a leading
              healthcare, medical equipment, and consumer care company in Iraq,
              committed to meeting the growing needs of healthcare and
              pharmaceutical distribution in the country.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" paragraph>
              JW pharma has a unique distribution and marketing network of more
              than 50 sales and medical representatives (mostly comprising
              medical doctors). Additionally, it operates a wholesale
              organization and a chain of local pharmacies. The company is
              managed by a highly experienced team consisting of Iraqis and
              expatriates with diverse backgrounds and skill sets.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default index;
