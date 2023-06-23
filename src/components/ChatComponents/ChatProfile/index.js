import React, { useEffect, useState } from "react";
import { useCurretJid, useUserProfile } from "../../../helpers/user";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import user from "../../../assets/user.jpg";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import SDK from "../../../chatSDK";
const ChatProfile = () => {
  const getUserProfile = useUserProfile();

  const navigate = useNavigate();
  const handleLogout = async () => {
    await SDK.logout();
    localStorage.clear();

    navigate("/");
  };
  return (
    <>
      <Flex
        alignItems={"center"}
        padding={"10px"}
        boxShadow={"0px 1px 0px 0px rgba(179, 179, 179, 0.69)"}
        justifyContent={"space-between"}
      >
        <Flex alignItems={"center"}>
          <Image
            cursor={"pointer"}
            onClick={() => navigate("/profile-update")}
            borderRadius="full"
            boxSize="150px"
            height={"50px"}
            width={"50px"}
            src={user}
            alt="Dan Abramov"
          />
          {getUserProfile && (
            <Text paddingLeft={"20px"}>
              {getUserProfile?.nickName
                ? getUserProfile.nickName
                : "Please Update Your Profile"}
            </Text>
          )}
        </Flex>
        <Box cursor={"pointer"} zIndex={99} onClick={handleLogout}>
          <MdOutlineLogout />
        </Box>
      </Flex>
    </>
  );
};

export default ChatProfile;
