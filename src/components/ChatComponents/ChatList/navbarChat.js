import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
// import { HiOutlineEllipsisVertical } from 'react-icons/hi';
import { FaEllipsisV } from "react-icons/fa";

import style from "./chatlist.module.scss";
const NavbarChat = ({ userName, onClick, profileMenu }) => {
  return (
    <Flex
      className={style.navbarChat}
      height={"70px"}
      alignItems={"center"}
      width={"100%"}
      background={"rgb(236, 236, 236)"}
      justifyContent={"space-between"}
      paddingRight={"10px"}
    >
      <Text padding={"0px 25px"} fontSize={"18px"}>
        {userName}
      </Text>
      {profileMenu && (
        <Menu>
          <MenuButton
            _focusVisible={{ outline: "none" }}
            _hover={{ borderColor: "transparent" }}
          >
            <FaEllipsisV cursor={"pointer"} fontSize={"18px"} />
          </MenuButton>
          <MenuList padding={"0px"}>
            <MenuGroup>
              {profileMenu?.map((list, index) => {
                return (
                  <MenuItem
                    fontSize={"16px"}
                    textTransform={"capitalize"}
                    key={index}
                    onClick={list?.onClick}
                  >
                    {list.name}
                  </MenuItem>
                );
              })}
            </MenuGroup>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
};

export default NavbarChat;
