import { UserType } from "@/components/types/user.types";
import { useAppSelector } from "@/store/hooks";
import { Box, IconButton, MenuItem } from "@mui/material";
import { MdPersonOutline } from "@react-icons/all-files/md/MdPersonOutline";
import { MdPerson } from "@react-icons/all-files/md/MdPerson";
import React, { useState } from "react";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/useAuth";
const Typography = dynamic(() => import("@mui/material/Typography"));
const CustomLink = dynamic(() => import("@/components/widgets/link"));

function UserNavItem(props: any) {
  const auth = useAuth();

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <IconButton
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          > */}
          <CustomLink link url={auth.user ? "/account" : "/login"}>
            <Box sx={{ display: { sm: "flex", xs: "none" } }}>
              <Typography
                ml={0.4}
                mr={0.5}
                variant="body2"
                textTransform={"capitalize"}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                {auth.user ? `Hi ${auth.user?.first_name}` : "Account"}
              </Typography>
            </Box>
            {auth.user ? <MdPerson size={22} /> : <MdPersonOutline size={22} />}
          </CustomLink>
          {/* </IconButton> */}
          {/* <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <CustomLink url={auth.id ? "/account/profile" : "/login"} link>
                Profile
              </CustomLink>
            </MenuItem>
            <MenuItem>
              <CustomLink url={auth.id ? "/account/addresses" : "/login"} link>
                Addresses
              </CustomLink>
            </MenuItem>
            <MenuItem>
              <CustomLink url={auth.id ? "/account/orders" : "/login"} link>
                Orders
              </CustomLink>
            </MenuItem>
          </Menu> */}
        </Box>
      </Box>
    </>
  );
}

const mapStateToProps = (state: any) => ({ auth: state.user.auth });

export default connect(mapStateToProps)(UserNavItem);
