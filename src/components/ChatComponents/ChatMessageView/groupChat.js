import React, { useEffect, useRef, useState } from "react";
import NavbarChat from "../ChatList/navbarChat";
import { Box, useToast } from "@chakra-ui/react";
import style from "./chatMessage.module.scss";
import SDK from "../../../chatSDK";
import { useQuery, useQueryClient } from "react-query";
import SendMessage from "../ChatMessageComponents/sendMessage";
import ReceivedMessage from "../ChatMessageComponents/receivedMessage";
import SendMessageInput from "../InputComponent/SendMessageInput/index";
import { useUserProfile } from "../../../helpers/user";
import AddParticipantGroup from "../AddParticipants";
import RemoveParticipant from "../removeParticipant";
// import { RemoveParticipant } from "../removeParticipant";
const GroupChat = ({ groupJid, groupName }) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const formRef = React.useRef();
  const currentUser = useUserProfile();
  const handleMessage = async (event) => {
    event.preventDefault();
    const sendMessage = event.target.sendMessage.value;
    const response = await SDK.sendTextMessage(groupJid, sendMessage);

    if (response.message === "Success") {
      queryClient.invalidateQueries("messageList");

      event.target.reset();
    }
  };

  const messageList = async () => {
    return await SDK.getChatMessages(groupJid);
  };
  const { data } = useQuery(["messageList", groupJid], messageList);
  //  const reverseData = data?.data.reverse()
  const userMessgae =
    data?.data &&
    data.data.map((chat) => {
      return {
        message: chat.msgBody?.message,
        user: chat.msgBody?.nickName,
      };
    });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const deleteGroup = async () => {
    await SDK.userDeleteGroup(groupJid);
    queryClient.invalidateQueries("getGroupChat");
    toast({
      title: "Group has been deleted",
      position: "top-right",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const profileMenu = [
    {
      name: <AddParticipantGroup groupJid={groupJid} groupName={groupName} />,
    },
    {
      name: <RemoveParticipant groupName={groupName} groupJid={groupJid} />,
    },
    {
      name: "Delete Group",
      onClick: deleteGroup,
    },
  ];
  scrollToBottom();
  if (!groupJid) {
    return <div></div>;
  }
  return (
    <Box className={style.singleMessageContainer}>
      <NavbarChat userName={groupName} profileMenu={profileMenu} />
      {groupJid}
      <Box className={style.rightSideChatContainer}>
        {userMessgae &&
          userMessgae.reverse().map((chats) => {
            return currentUser?.nickName === chats.user ? (
              <SendMessage sendMessage={chats.message} />
            ) : (
              <ReceivedMessage receivedMessage={chats.message} />
            );
          })}
        <div ref={messagesEndRef} />
      </Box>
      <form onSubmit={handleMessage} id="sendMessage" ref={formRef}>
        <SendMessageInput
          onChange={(e) => e.target.value}
          name={"sendMessage"}
          sx={{ position: "absolute", bottom: "0px", padding: "10px" }}
          onClick={handleMessage}
        />
      </form>
    </Box>
  );
};

export default GroupChat;
