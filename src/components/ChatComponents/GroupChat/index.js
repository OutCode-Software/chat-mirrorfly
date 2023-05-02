import React, { useState } from "react";
import AddGroup from "./addGroup";
import { Box, Flex } from "@chakra-ui/react";
import { useGroupChatList } from "../../../helpers/group";
import UserList from "../UserList";
const GroupChat = ({
  optionsValue,
  setUserJID,
  setGroupJid,
  groupChatActive,
  setSingleChatActive,
  setGroupChatActive,
  setUserId,
  setGroupName,
}) => {
  const grouplist = useGroupChatList();
  console.log("grouplist",grouplist)
  const [groupChatId, setGroupChatId] = useState("");

  return (
    <Flex flexDirection={"column-reverse"}>
    {grouplist &&
        grouplist.reverse().map((group) => {
          return (
            <UserList
            key={group.groupChatId}
              active={
                group.groupId === groupChatId && groupChatActive
                  ? "rgb(236, 236, 236)"
                  : ""
              }
              onClick={() => {
                setGroupJid(
                  `${group.groupId}@mix.xmpp-preprod-sandbox.mirrorfly.com`
                );
                setGroupChatId(group.groupId);
                setSingleChatActive(false);
                setGroupChatActive(true);
                setGroupName(group.groupName);
                setUserJID(null);
                setUserId(null);
              }}
            >
              {group.groupName}
            </UserList>
          );
        })}
    </Flex>
  );
};

export default GroupChat;
