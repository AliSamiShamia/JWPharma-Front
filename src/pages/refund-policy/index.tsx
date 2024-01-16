import themeColor from "@/components/constant/color";
import dynamic from "next/dynamic";
import React from "react";
const Layout = dynamic(() => import("@/components/design/layout"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Link = dynamic(() => import("@mui/material/Link"));

function index() {
  return (
    <Layout>
      <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Grid container maxWidth={"md"} mt={5} spacing={2}>
          <Typography
            variant="h4"
            color={themeColor.secondary.dark}
            fontWeight="bold"
            gutterBottom
          >
            Refund Policy
          </Typography>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold">
              Returns
            </Typography>
            <Typography paragraph>
              We accept returns of products purchased from our website within 30
              days of the purchase date.
            </Typography>
            <Typography paragraph>
              To be eligible for a return, the product must be in its original
              condition, unopened, and in its original packaging.
            </Typography>
            <Typography paragraph>
              To initiate a return, please contact our customer support team at{" "}
              <Link href="mailto:info@jwpharma.me">info@jwpharma.me</Link> with
              your order details.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold">
              Refunds
            </Typography>
            <Typography paragraph>
              Once we receive your returned item and inspect it, we will notify
              you of the approval or rejection of your refund.
            </Typography>
            <Typography paragraph>
              If your return is approved, we will process your refund to the
              original method of payment within 7 business days.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold">
              Exchanges
            </Typography>
            <Typography paragraph>
              We do not offer exchanges for products purchased from our website.
              If you wish to exchange a product, you may return it for a refund
              and place a new order.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold">
              Contact Us
            </Typography>
            <Typography paragraph>
              If you have any questions about our Refund Policy, please contact
              us at <Link href="mailto:info@jwpharma.me">info@jwpharma.me</Link>
              .
            </Typography>
            <Typography paragraph>
              Please note that this Refund Policy is subject to change, and it
              is your responsibility to review it periodically for updates.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default index;
