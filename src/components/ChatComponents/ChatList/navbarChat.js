import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import style from "./chatlist.module.scss"
const NavbarChat = ({userName}) => {
  return (
    <Flex className={style.navbarChat} height={"70px"} alignItems={"center"} width={"100%"} background={"rgb(236, 236, 236)"}>
      <Text padding={"0px 25px"} fontSize={"18px"}>{userName}</Text>
    </Flex>
  );
};

export default NavbarChat;
