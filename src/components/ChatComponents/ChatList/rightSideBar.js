import React, { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import style from "./chatlist.module.scss"
import SingleChat from "../ChatMessageView/singleChat";
import GroupChat from "../ChatMessageView/groupChat";
const RightSideBar = ({groupName, userName, userJid,groupJid }) => {
  return (
    <React.Fragment>
      <SingleChat userName={userName} userJid={userJid} />
      <GroupChat groupName={groupName} groupJid={groupJid} />
    </React.Fragment>
  );
};

export default RightSideBar;
