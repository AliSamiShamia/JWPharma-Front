import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { RiMenu2Line } from "@react-icons/all-files/ri/RiMenu2Line";

import Logo from "@/components/widgets/logo";
import themeColor from "@/components/constant/color";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import CustomMenu from "./menu";
import CustomBottomNavigation from "./menu/bottom-navigation";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

const menuNavItems = [
  {
    title: "Home",
    icon: null,
    mobile: true,
    badge: true,
  },
  {
    title: "Product",
    icon: null,
    mobile: false,
    badge: false,
  },
  {
    title: "Collection",
    icon: null,
    mobile: true,
    badge: false,
  },
  {
    title: "About Us",
    icon: null,
    mobile: true,
    badge: true,
  },
  {
    title: "Contact Us",
    icon: null,
    mobile: true,
    badge: true,
  },
];
export default function DrawerAppBar(props: Props) {
  const { window } = props;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ flexGrow: 1, display: { sm: "block" } }}>
        <Logo color="white" />
      </Box>
      <Divider />
      <List>
        {menuNavItems.map((item, key) => (
          <ListItem key={key} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box component={"header"} sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="sticky"
        color="transparent"
        elevation={0}
      >
        <Box
          sx={{
            p: 1,
            borderBottom: 1,
            borderColor: themeColor.borderColor,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <RiMenu2Line />
            </IconButton>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: { xs: "flex-start", sm: "center" },
                alignItems: { xs: "flex-start", sm: "center" },
              }}
            >
              <Logo color="white" />
            </Box>
            <CustomMenu />
          </Toolbar>
          <Toolbar
            sx={{
              display: { sm: "flex", xs: "none" },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {menuNavItems.map((item, key) => (
                <Button
                  variant="text"
                  key={key}
                  color="secondary"
                  sx={{
                    "&:hover": { backgroundColor: "transparent" },
                    minWidth: 20,
                    ml: { sm: 0.3, xs: 1 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      ml={0.4}
                      mr={0.5}
                      variant="body2"
                      textTransform={"capitalize"}
                      sx={{ display: { xs: "none", md: "flex" } }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <CustomBottomNavigation />
      </Box>
    </Box>
  );
}
