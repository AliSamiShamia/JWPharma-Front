import { UserType } from "@/components/types/user.types";
import { useAppSelector } from "@/store/hooks";
import { Box, IconButton, MenuItem } from "@mui/material";
import { MdPersonOutline } from "@react-icons/all-files/md/MdPersonOutline";
import { MdPerson } from "@react-icons/all-files/md/MdPerson";
import React, { useState } from "react";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
const Typography = dynamic(() => import("@mui/material/Typography"));
const Menu = dynamic(() => import("@mui/material/Menu"));
const CustomLink = dynamic(() => import("@/components/widgets/link"));

function UserNavItem(props: any) {
  const { auth } = props;
  //Cart & Wishlist redux state
  const userState = useAppSelector((state) => state.user.info);

  //Cart & Wishlist items
  const [user, setUser] = useState<UserType>();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setUser(userState);
  }, [userState]);

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
          <IconButton
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            <Box sx={{ display: { sm: "flex", xs: "none" } }}>
              <Typography
                ml={0.4}
                mr={0.5}
                variant="body2"
                textTransform={"capitalize"}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                {auth.id ? `Hi ${auth.first_name}` : "Account"}
              </Typography>
            </Box>
            {auth.id ? <MdPerson size={22} /> : <MdPersonOutline size={22} />}
          </IconButton>
          <Menu
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
          </Menu>
        </Box>
      </Box>
    </>
  );
}

const mapStateToProps = (state: any) => ({ auth: state.tempUser.info });

export default connect(mapStateToProps)(UserNavItem);
