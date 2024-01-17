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
            Privacy Policy
          </Typography>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Your privacy is important to us.
            </Typography>
            <Typography paragraph>
              This Privacy Policy explains how JWPharma City Middle East, Inc.
              ("JWPharma City Middle East", "we," "us," or "our") collects,
              uses, and safeguards your personal information when you visit our
              website (
              <Link href="https://www.jwpharma.me">www.jwpharma.me</Link>) and
              use our services.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Information We Collect
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Personal Information:</strong> This may include your name,
              email address, phone number, and other identifiable information
              you provide when creating an account or making a purchase.
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Usage Information:</strong> We may collect information
              about your interactions with our website, such as your IP address,
              browser type, pages viewed, and the date and time of your visit.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              How We Use Your Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              We may use your information for various purposes, including:
            </Typography>
            <ul>
              <li>Providing and improving our services.</li>
              <li>Communicating with you about your account and orders.</li>
              <li>Analyzing website usage to enhance user experience.</li>
            </ul>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Information Sharing
            </Typography>
            <Typography variant="body1" gutterBottom>
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information with trusted service
              providers who assist us in operating our website and services.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Security
            </Typography>
            <Typography variant="body1" gutterBottom>
              We take reasonable measures to protect your personal information,
              but no method of transmission over the internet is entirely
              secure. We cannot guarantee the security of your data.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Your Choices
            </Typography>
            <Typography variant="body1" gutterBottom>
              You have the right to access, correct, or delete your personal
              information. You can also unsubscribe from marketing
              communications by following the instructions provided in our
              emails.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Changes to this Privacy Policy
            </Typography>
            <Typography variant="body1" gutterBottom>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated date.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" gutterBottom>
              If you have questions about our Privacy Policy or how we handle
              your data, please contact us at{" "}
              <Link href="mailto:info@jwpharma.me">info@jwpharma.me</Link>.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default index;
