import { Box, Drawer } from "@mui/material";
import React, { ReactNode } from "react";

type PropType = {
  children: ReactNode;
  open: boolean;
  toggleDrawer: (status: boolean) => any;
};
const drawerWidth = 240;

function CustomDrawer({ open, toggleDrawer, children }: PropType) {
  return (
    <React.Fragment>
      <Drawer
        anchor={"right"}
        variant="temporary"
        open={open}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        onClose={toggleDrawer(false)}
        sx={{
          // display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { xs: drawerWidth, sm: "60%" },
            maxWidth: { xs: "90%", sm: "70%", md: 500 },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default CustomDrawer;
