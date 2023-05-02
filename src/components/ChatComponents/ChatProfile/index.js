import React, { useEffect, useState } from "react";
import { useCurretJid, useUserProfile } from "../../../helpers/user";
import { Flex, Image, Text } from "@chakra-ui/react";
import user from "../../../assets/user.jpg";
import { useNavigate } from "react-router-dom";
const ChatProfile = () => {
  const getUserProfile = useUserProfile();
  console.log("getUserProfile",getUserProfile)
  const navigate = useNavigate()
  return (
    <>
     <Flex cursor={"pointer"} alignItems={"center"} padding={"10px"} boxShadow={"0px 1px 0px 0px rgba(179, 179, 179, 0.69)"} onClick={() => navigate('/profile-update')}>
    <Image borderRadius="full" boxSize="150px" height={"50px"} width={"50px"} src={user} alt="Dan Abramov" />
    {getUserProfile &&     
      <Text paddingLeft={"20px"}>
      {getUserProfile?.nickName 
        ? getUserProfile.nickName
        : "Please Update Your Profile"}
    </Text>
  }
  </Flex>
    </>

  );
};

export default ChatProfile;
