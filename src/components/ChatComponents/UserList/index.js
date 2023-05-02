import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import style from "./userlist.module.scss";
const UserList = ({ active, onClick, children, unreadCount }) => {
  return (
    <Flex
      borderBottom="1px solid rgb(236, 236, 236)"
      padding="8px 10px"
      background={active}
      className={style.chatList}
      justifyContent={"space-between"}
      // onClick={()=> {setUserId(users.userId);setUserJID(`${users.userJid + "@xmpp-preprod-sandbox.mirrorfly.com"}`)}}
      onClick={onClick}
    >
      {children}
      {unreadCount !== 0 && unreadCount && (
        <Box className={style.chatCount}>{unreadCount}</Box>
      )}
    </Flex>
  );
};

export default UserList;
