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
            Terms of Service
          </Typography>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Introduction
            </Typography>
            <Typography paragraph>
              These terms and conditions ("Terms") govern your use of the
              JWPharma City Middle East website and services. By accessing or
              using our website, you agree to comply with these Terms.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Definitions
            </Typography>
            <Typography paragraph>
              <strong>"JWPharma City Middle East"</strong> refers to our
              company, JWPharma City Middle East, Inc.
              <br />
              <strong>"Website"</strong> refers to our ecommerce platform
              available at{" "}
              <Link href="https://www.jwpharma.me">www.jwpharma.me</Link>.
              <br />
              <strong>"User"</strong> refers to any individual or entity using
              our website or services.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Registration and Account
            </Typography>
            <Typography paragraph>
              In order to use certain features of our website, you may be
              required to register for an account. You are responsible for
              maintaining the confidentiality of your account information and
              password.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Privacy Policy
            </Typography>
            <Typography paragraph>
              Your use of our website is also governed by our Privacy Policy.
              Please review our Privacy Policy to understand how we collect,
              use, and protect your personal information.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Acceptable Use
            </Typography>
            <Typography paragraph>
              You agree not to use our website for any unlawful or prohibited
              purpose, including but not limited to:
              <ul>
                <li>
                  Posting or transmitting any content that is illegal, harmful,
                  or infringing upon others' rights.
                </li>
                <li>Engaging in fraudulent or deceptive activities.</li>
                <li>
                  Interfering with the operation of our website or services.
                </li>
              </ul>
              <p>You further agree not to:</p>
              <ul>
                <li>
                  Use any automated means, including robots, crawlers, or data
                  mining tools, to access or collect information from our
                  website.
                </li>
                <li>
                  Attempt to gain unauthorized access to our website, accounts,
                  or systems.
                </li>
                <li>
                  Use our website to distribute unsolicited commercial messages
                  or spam.
                </li>
              </ul>
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              User Content
            </Typography>
            <Typography paragraph>
              You may have the opportunity to submit or post content on our
              website, including reviews, comments, and other user-generated
              content. By doing so, you grant JWPharma City Middle East a
              non-exclusive, royalty-free, worldwide, perpetual, and irrevocable
              license to use, reproduce, modify, adapt, publish, translate,
              distribute, and display such content on our website and in our
              marketing materials.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Intellectual Property
            </Typography>
            <Typography paragraph>
              All content on our website, including but not limited to text,
              graphics, logos, images, videos, and software, is the property of
              JWPharma City Middle East or its licensors and is protected by
              intellectual property laws. You may not use, reproduce,
              distribute, or display any of our content without our express
              written permission.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Termination
            </Typography>
            <Typography paragraph>
              JWPharma City Middle East reserves the right to terminate or
              suspend your access to our website and services at our discretion,
              with or without cause, and with or without notice. Upon
              termination, your right to use our website will cease immediately.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Disclaimer of Warranties
            </Typography>
            <Typography paragraph>
              Our website and services are provided "as is" and "as available"
              without any warranties, express or implied. JWPharma City Middle
              East makes no representations or warranties of any kind, including
              but not limited to the accuracy, completeness, reliability, or
              suitability of our website or services for any particular purpose.
              You use our website and services at your own risk.
              <br />
              JWPharma City Middle East disclaims all warranties, including but
              not limited to warranties of merchantability, fitness for a
              particular purpose, and non-infringement.
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Information
            </Typography>
            <Typography paragraph>
              If you have any questions or concerns about these Terms and
              Conditions, please contact us at{" "}
              <Link href="mailto:info@jwpharma.me">info@jwpharma.me</Link>.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default index;
