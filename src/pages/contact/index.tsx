import themeColor from "@/components/constant/color";
import dynamic from "next/dynamic";
import React from "react";
const Layout = dynamic(() => import("@/components/design/layout"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Link = dynamic(() => import("@mui/material/Link"));
const TextField = dynamic(() => import("@mui/material/TextField"));

function index() {
  return (
    <Layout>
      <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Grid container maxWidth={"xl"} mt={5} spacing={3}>
          <Grid item md={6} xs={12} px={4}>
            <Grid px={3}>
              <Typography
                variant="h4"
                color={themeColor.secondary.main}
                fontWeight="bold"
                gutterBottom
                textTransform={"capitalize"}
              >
                Get In Touch
              </Typography>
              <Typography paragraph>
                We'd love to hear from you! Whether you have a question about
                our services, want to collaborate, or simply want to say hello,
                feel free to reach out to us. Your feedback matters, and we're
                here to assist you in any way we can.
              </Typography>
            </Grid>
            <Grid px={3}>
              <Typography variant="h6" fontWeight="bold">
                Contact Information:
              </Typography>
              <ul>
                <li>
                  <strong>Email:</strong>{" "}
                  <Link
                    href="mailto:jwpharmacity.ae@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    jwpharmacity.ae@gmail.com
                  </Link>
                </li>
                <li>
                  <strong>Phone:</strong> +971 55 384 9226
                </li>
                <li>
                  <strong>Address:</strong> Office 601, Nouf Tower, Deira
                  Clocktower, Dubai, UAE
                </li>
              </ul>
              <Typography paragraph>
                You can also fill out the form, and we'll get back to you as
                soon as possible. Your inquiries are important to us, and we
                strive to provide timely responses to all messages.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{ backgroundColor: themeColor.textOrangeLight }}
          >
            <Grid p={4} display={"flex"} flexDirection={"column"} gap={2}>
              <Grid display={"flex"} flexDirection={"column"} gap={0.3}>
                <Typography>
                  Name <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField size="small" fullWidth variant="outlined" />
              </Grid>
              <Grid display={"flex"} flexDirection={"column"} gap={0.3}>
                <Typography>
                  E-mail <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField size="small" fullWidth variant="outlined" />
              </Grid>
              <Grid display={"flex"} flexDirection={"column"} gap={0.3}>
                <Typography>
                  Phone Number <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField size="small" fullWidth variant="outlined" />
              </Grid>
              <Grid display={"flex"} flexDirection={"column"} gap={0.3}>
                <Typography>
                  Your Request <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField fullWidth rows={4} multiline variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default index;
