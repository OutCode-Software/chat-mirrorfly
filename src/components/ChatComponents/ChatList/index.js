import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { LeftSideBar } from "./leftSideBar";
import RightSideBar from "./rightSideBar";

const ChatList = () => {
  const [userId, setUserId] = useState();
  const [userJID, setUserJID] = useState();
  const [groupJid, setGroupJid] = useState();
  const [groupName, setGroupName] = useState();

  return (
    <Flex>
      <LeftSideBar
        setUserId={setUserId}
        userId={userId}
        setUserJID={setUserJID}
        setGroupJid={setGroupJid}
        setGroupName={setGroupName}
      />
      <RightSideBar groupName={groupName}  userName={userId} userJid={userJID} groupJid={groupJid} />
    </Flex>
  );
};

export default ChatList;
