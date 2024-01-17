import themeColor from "@/components/constant/color";
import { Table, TableBody, TableRow } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const Layout = dynamic(() => import("@/components/design/layout"));
const Grid = dynamic(() => import("@mui/material/Grid"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Link = dynamic(() => import("@mui/material/Link"));
const TextField = dynamic(() => import("@mui/material/TextField"));
const TableCell = dynamic(() => import("@mui/material/TableCell"));
import { TableCellBaseProps } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import CustomLink from "@/components/widgets/link";
import Swal from "sweetalert2";
import { post } from "@/handler/api.handler";
import routeConfig from "@/components/constant/route";

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: "0 !important",
  paddingRight: "0 !important",
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(1)} !important`,
}));

function index() {
  const [form_data, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });

  const handleChange = (key: any, value: any) => {
    setFormData({
      ...form_data,
      [key]: value,
    });
  };
  const submit = async () => {
    try {
      const { name, email, phone, msg } = form_data;
      if (
        name.trim() == "" ||
        email.trim() == "" ||
        phone.trim() == "" ||
        msg.trim() == ""
      ) {
        Swal.fire({
          text: "Kindly ensure that all fields are filled out, as they are required for submission. Thank you.",
          icon: "warning",
        });

        return false;
      }
      const pattern = /^[0-9]+$/;
      if (!pattern.test(email)) {
        Swal.fire({
          text: "Kindly provide a valid email address.",
          icon: "warning",
        });

        return false;
      }
      const res = await post(routeConfig.contact, form_data, null);
      if (res && res.status_code == 200) {
        Swal.fire({
          text: "Your inquiry has been successfully submitted.",
          icon: "success",
        });
      } else {
        Swal.fire({
          text: "There was an issue while attempting to send your inquiry. Please try again.",
          icon: "error",
        });

        return false;
      }
    } catch (e) {
      Swal.fire({
        text: "There was an issue while attempting to send your inquiry. Please try again.",
        icon: "error",
      });

      return false;
    }
  };

  return (
    <Layout>
      <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Grid container maxWidth={"xl"} mt={5} spacing={3}>
          <Grid item md={6} xs={12} px={4}>
            <Grid>
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
            <Grid>
              <Table sx={{ maxWidth: 600 }}>
                <TableBody>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant="h6" fontWeight={"bold"}>
                        Email:
                      </Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant="body1">
                        <Link
                          href="mailto:jwpharmacity.ae@gmail.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          jwpharmacity.ae@gmail.com
                        </Link>
                      </Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant="h6" fontWeight={"bold"}>
                        Phone:
                      </Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant="body1">
                        <Link
                          href="tel:+971553849226"
                          rel="noopener noreferrer"
                        >
                          +971 55 384 9226
                        </Link>
                      </Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant="h6" fontWeight={"bold"}>
                        Address:
                      </Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant="body1">
                        <Link
                          href="https://maps.app.goo.gl/yffYuU59eparbHmz8"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Office 601, Nouf Tower, Deira Clocktower, Dubai, UAE
                        </Link>
                      </Typography>
                    </MUITableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Typography mt={3} paragraph>
                You can also fill out the form, and we'll get back to you as
                soon as possible.
              </Typography>
              <Typography paragraph>
                Your inquiries are important to us, and we strive to provide
                timely responses to all messages.
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
                <TextField
                  value={form_data.name}
                  onChange={(e) => {
                    handleChange("name", e.target.value);
                  }}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid display={"flex"} flexDirection={"column"} gap={0.3}>
                <Typography>
                  E-mail <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  value={form_data.email}
                  onChange={(e) => {
                    handleChange("email", e.target.value);
                  }}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid display={"flex"} flexDirection={"column"} gap={0.3}>
                <Typography>
                  Phone Number <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  value={form_data.phone}
                  onChange={(e) => {
                    handleChange("phone_number", e.target.value);
                  }}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid display={"flex"} flexDirection={"column"} gap={0.3}>
                <Typography>
                  Your Request <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  value={form_data.msg}
                  onChange={(e) => {
                    handleChange("msg", e.target.value);
                  }}
                  fullWidth
                  rows={4}
                  multiline
                  variant="outlined"
                />
              </Grid>
              <Grid display={"flex"} justifyContent={"flex-end"}>
                <CustomLink
                  title="Submit"
                  width={200}
                  action={submit}
                  type="contained"
                  padding={"auto"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default index;
