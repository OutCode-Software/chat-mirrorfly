import React, { useEffect, useRef, useState } from "react";
import NavbarChat from "../ChatList/navbarChat";
import { Box } from "@chakra-ui/react";
import style from "./chatMessage.module.scss";
import SDK from "../../../chatSDK";
import { useQuery, useQueryClient } from "react-query";
import SendMessage from "../ChatMessageComponents/sendMessage";
import ReceivedMessage from "../ChatMessageComponents/receivedMessage";
import SendMessageInput from "../InputComponent/SendMessageInput/index";
import { useUserProfile } from "../../../helpers/user";
import { useDataUtc } from "../../../helpers/data";
const GroupChat = ({ groupJid, groupName }) => {
  const queryClient = useQueryClient();
  console.log("groupJid",groupJid)

  const formRef = React.useRef();
  const currentUser = useUserProfile();
  const handleMessage = async (event) => {
    event.preventDefault();
    const sendMessage = event.target.sendMessage.value;
    const response = await SDK.sendTextMessage(groupJid, sendMessage);
    console.log("send msh", response);

    if (response.message === "Success") {
      queryClient.invalidateQueries("messageList");

      event.target.reset();
    }
  };

  const messageList = async () => {
    return await SDK.getChatMessages(groupJid);
  };
  const { data } = useQuery(["messageList",groupJid], messageList);
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
  scrollToBottom();
  if (!groupJid) {
    return <div></div>;
  }
  return (
    <Box className={style.singleMessageContainer}>
      <NavbarChat userName={groupName} />
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
