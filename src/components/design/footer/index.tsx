import React from "react";
import themeColor from "@/components/constant/color";
import dynamic from "next/dynamic";
import CustomLink from "@/components/widgets/link";
import { Box } from "@mui/system";
import { Link } from "@mui/material";
const Logo = dynamic(() => import("@/components/widgets/logo"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Grid = dynamic(() => import("@mui/material/Grid"));

const links = [
  {
    title: "Collections",
    url: "/collection",
  },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: "About Us",
    url: "/who-we-are",
  },
  {
    title: "Contact Us",
    url: "/contact",
  },
];

const Footer = () => {
  return (
    <footer>
      <Grid
        mt={2}
        position={"relative"}
        sx={{ backgroundColor: themeColor.lightGreyColor }}
        borderColor={themeColor.borderColor}
        display={"flex"}
        p={5}
        alignItems={"center"}
        justifyContent="center"
      >
        <Grid container maxWidth={"xl"} spacing={4}>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            display={"flex"}
            justifyContent={"center"}
          >
            <Logo size={{ md: 120, xs: 100 }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              color={themeColor.primary.dark}
              fontWeight={"bold"}
              sx={{ mb: 2 }}
            >
              Quick Links
            </Typography>
            <Grid
              display={"flex"}
              gap={1}
              alignItems={"flex-start"}
              flexDirection={"column"}
            >
              {links.map((item, key) => {
                return (
                  <Grid key={key}>
                    <CustomLink url={item.url} width={"auto"} link padding={0}>
                      <Typography
                        color={themeColor.primary.dark}
                        textTransform={"capitalize"}
                        textAlign={"left"}
                        variant="body1"
                      >
                        {item.title}
                      </Typography>
                    </CustomLink>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              color={themeColor.primary.dark}
              fontWeight={"bold"}
              sx={{ mb: 2 }}
            >
              Address
            </Typography>

            <Grid
              display={"flex"}
              color={themeColor.primary}
              flexDirection={"column"}
              gap={1}
            >
              <Typography variant="body1" color={themeColor.primary.dark}>
                601 Nouf Tower
              </Typography>
              <Typography variant="body1" color={themeColor.primary.dark}>
                Port Saeed, Deira,
              </Typography>
              <Typography variant="body1" color={themeColor.primary}>
                Dubai, United Arab Emirates
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={"bold"} sx={{ mb: 2 }}>
              Get in touch
            </Typography>

            <Typography variant="body1" color={themeColor.primary.dark}>
              You're welcome to connect with us by dropping an email at
              <Link
                ml={0.7}
                type="text"
                title="info@jwpharma.me"
                href="mailto:info@jwpharma.me"
                color={themeColor.secondary.dark}
              >
                info@jwpharma.me
              </Link>
              . We look forward to hearing from you!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        pt={2}
        sx={{
          mb: { md: 2, xs: 10 },
          flexDirection: { md: "row", xs: "column" },
        }}
        width={1}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
      >
        <Typography
          variant="caption"
          textTransform={"capitalize"}
          color={themeColor.textGreyColor}
        >
          © {new Date().getFullYear()}, all rights reserved
        </Typography>
        <CustomLink link url="/" padding={0} width={"auto"}>
          <Typography
            variant="caption"
            color={themeColor.textGreyColor}
            textTransform={"capitalize"}
          >
            Refund policy
          </Typography>
        </CustomLink>
        <CustomLink link url="/" padding={0} width={"auto"}>
          <Typography
            variant="caption"
            color={themeColor.textGreyColor}
            textTransform={"capitalize"}
          >
            Privacy policy
          </Typography>
        </CustomLink>
        <CustomLink link url="/" padding={0} width={"auto"}>
          <Typography
            variant="caption"
            color={themeColor.textGreyColor}
            textTransform={"capitalize"}
          >
            Terms of service
          </Typography>
        </CustomLink>
      </Grid>
    </footer>
  );
};

export default Footer;
