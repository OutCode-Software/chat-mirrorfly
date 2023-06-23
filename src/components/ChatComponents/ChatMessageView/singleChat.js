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
import AttachmentInput from "../../form/attachmentInput";
const SingleChat = ({ userName, userJid, isChatTpye }) => {
  const queryClient = useQueryClient();
  const getUserJid = SDK.getJid(userJid);
  // const getGroupId = SDK.getGroupJid(userJid);
  const formRef = React.useRef();
  const currentUser = useUserProfile();
  const [isFileUpload, setIsFileInput] = useState(false);

  const [fileInput, setFileInput] = useState({
    src: "",
    type: "",
    name: "",
  });
  // const allUserJid =
  //   isChatTpye === "groupchat" ? getGroupId?.groupJid : getUserJid?.userJid;
  const handleMessage = async (event) => {
    event.preventDefault();
    const sendMessage = event.target.sendMessage.value;
    const response = await SDK.sendTextMessage(userJid, sendMessage, ``);
    // console.log("send msh", response);

    if (response.message === "Success") {
      queryClient.invalidateQueries("messageList");

      event.target.reset();
    }
  };

  const messageList = async () => {
    return await SDK.getChatMessages(userJid);
  };
  const { data } = useQuery(["messageList", userJid], messageList);
  //  const reverseData = data?.data.reverse()
  const userMessgae =
    data?.data &&
    data.data.map((chat) => {
      return {
        message: chat.msgBody?.message,
        fromUserId: chat.fromUserId,
        utcTimestamp: chat.msgBody.utcTimestamp,
        nickName: chat.msgBody.nickName,
      };
    });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  scrollToBottom();
  if (!userName) {
    return <div></div>;
  }
  return (
    <Box className={style.singleMessageContainer}>
      <NavbarChat userName={userName} />
      {userJid}
      <Box className={style.rightSideChatContainer}>
        {userMessgae &&
          userMessgae.reverse().map((chats) => {
            return currentUser?.userId === chats.fromUserId ? (
              <SendMessage
                key={chats.nickName}
                sendMessage={chats.message}
                nickName={chats.nickName}
                utcTimestamp={chats.utcTimestamp}
              />
            ) : (
              <ReceivedMessage
                key={chats.nickName}
                receivedMessage={chats.message}
              />
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
        >
          <AttachmentInput
            jid={getUserJid}
            setFileInput={setFileInput}
            isFileUpload={isFileUpload}
          />{" "}
        </SendMessageInput>
      </form>
    </Box>
  );
};

export default SingleChat;
