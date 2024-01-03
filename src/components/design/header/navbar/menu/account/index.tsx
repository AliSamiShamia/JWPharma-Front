import { UserType } from "@/components/types/user.types";
import CustomLink from "@/components/widgets/link";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { MdPersonOutline } from "@react-icons/all-files/md/MdPersonOutline";
import { MdPerson } from "@react-icons/all-files/md/MdPerson";
import React, { useState } from "react";
import { connect } from "react-redux";

function UserNavItem(props: any) {
  const { auth } = props;
  //Cart & Wishlist redux state
  const userState = useAppSelector((state) => state.user.info);

  //Cart & Wishlist items
  const [user, setUser] = useState<UserType>();

  React.useEffect(() => {
    setUser(userState);
  }, [userState]);

  return (
    <>
      <Box>
        <CustomLink url={auth.id ? "/account/profile" : "/login"} link>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
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
          </Box>
        </CustomLink>
      </Box>
    </>
  );
}

const mapStateToProps = (state: any) => ({ auth: state.tempUser.info });

export default connect(mapStateToProps)(UserNavItem);
