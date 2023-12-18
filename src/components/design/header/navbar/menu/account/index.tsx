import { UserType } from "@/components/types/user.types";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { MdPersonOutline } from "@react-icons/all-files/md/MdPersonOutline";
import React, { useState } from "react";

function UserNavItem() {
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
        <Button
          onClick={() => {}}
          variant="text"
          color="primary"
          sx={{
            "&:hover": { backgroundColor: "transparent" },
            minWidth: 20,
            ml: { sm: 0.3, xs: 0 },
          }}
        >
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
                Account
              </Typography>
            </Box>
            <MdPersonOutline size={22} />
          </Box>
        </Button>
      </Box>
    </>
  );
}

export default UserNavItem;
