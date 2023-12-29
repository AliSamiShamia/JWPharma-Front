import * as React from "react";
import Box from "@mui/material/Box";
import { RiMenu2Line } from "@react-icons/all-files/ri/RiMenu2Line";

import themeColor from "@/components/constant/color";
import { useState } from "react";
import dynamic from "next/dynamic";
import { AppBar } from "@mui/material";

const Logo = dynamic(() => import("@/components/widgets/logo"));
const CustomMenu = dynamic(
  () => import("@/components/design/header/navbar/menu")
);
const CustomBottomNavigation = dynamic(
  () => import("@/components/design/header/navbar/menu/bottom-navigation")
);
const Link = dynamic(() => import("@mui/material/Link"));
const Toolbar = dynamic(() => import("@mui/material/Toolbar"));
const ListItemText = dynamic(() => import("@mui/material/ListItemText"));
const ListItemButton = dynamic(() => import("@mui/material/ListItemButton"));
const ListItem = dynamic(() => import("@mui/material/ListItem"));
const List = dynamic(() => import("@mui/material/List"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Drawer = dynamic(() => import("@mui/material/Drawer"));
const Divider = dynamic(() => import("@mui/material/Divider"));
const CssBaseline = dynamic(() => import("@mui/material/CssBaseline"));
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

const menuNavItems = [
  {
    title: "Home",
    action: "/",
  },
  {
    title: "Products",
    action: "/products",
  },
  {
    title: "Collection",
    action: "/collection",
  },
  {
    title: "About Us",
    action: "/who-we-are",
  },
  {
    title: "Contact Us",
    action: "/contact",
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
        component={"nav"}
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
                justifyContent: {
                  xs: "flex-end",
                  sm: "flex-start",
                  md: "center",
                },
                alignItems: { xs: "center", sm: "flex-start", md: "center" },
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
                <Link
                  key={key}
                  href={item.action}
                  underline="none"
                  variant="body1"
                  color={"primary"}
                  textTransform={"capitalize"}
                  ml={1}
                  mr={1}
                >
                  {item.title}
                </Link>
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
      <Box sx={{ display: { xs: "block", sm: "none", } }}>
        <CustomBottomNavigation />
      </Box>
    </Box>
  );
}
