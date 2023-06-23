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
import SendImage from "../ChatMessageComponents/sendImage";
import ReceivedImage from "../ChatMessageComponents/receivedImage";
const SingleChat = ({ userName, userJid, isChatTpye }) => {
  const queryClient = useQueryClient();
  const getUserJid = SDK.getJid(userJid);
  // const getGroupId = SDK.getGroupJid(userJid);
  const formRef = React.useRef();
  const currentUser = useUserProfile();
  const [isFileUpload, setIsFileInput] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const [fileInput, setFileInput] = useState({
    src: "",
    type: "",
    name: "",
  });
  // const userJid =
  //   isChatTpye === "groupchat" ? getGroupId?.groupJid : getUserJid?.userJid;
  const handleMessage = async (event) => {
    event.preventDefault();
    const sendMessage = event.target.sendMessage.value;

    try {
      if (fileInput.src) {
        const payload = {
          caption: event.target.sendMessage.value,
        };
        if (fileInput.type === "image") {
          const response = await SDK.sendImageMessage(
            userJid,
            fileInput.src,
            payload
          );
          if (response.message === "Success") {
            queryClient.invalidateQueries("messageList");
            event.target.reset();
            setIsFileInput((state) => !state);
            setIsDisable((state) => !state);
          }
        }
        if (fileInput.type === "video") {
          const response = await SDK.sendVideoMessage(
            userJid,
            fileInput.src,
            payload
          );
          if (response.message === "Success") {
            queryClient.invalidateQueries("messageList");
            event.target.reset();
            setIsFileInput((state) => !state);
            setIsDisable((state) => !state);
          }
        }
        if (fileInput.type === "application" || fileInput.type === "text") {
          const response = await SDK.sendDocumentMessage(
            userJid,
            fileInput.src,
            payload
          );
          if (response.message === "Success") {
            queryClient.invalidateQueries("messageList");
            event.target.reset();
            setIsFileInput((state) => !state);
            setIsDisable((state) => !state);
          }
        }
      } else {
        const response = await SDK.sendTextMessage(userJid, sendMessage, ``);
        console.log("-=-=sd-=sd-", response);
        if (response.message === "Success") {
          queryClient.invalidateQueries("messageList");
          event.target.reset();
          setIsDisable((state) => !state);
        }
      }
    } catch (error) {
      console.log("error ===", error);
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
          userMessgae.reverse().map((chats, index) => {
            return currentUser?.userId === chats.fromUserId ? (
              <SendImage
                key={`${index}SendMessage`}
                sendImage={chats?.media?.thumb_image}
                nickName={chats.nickName}
                utcTimestamp={chats.utcTimestamp}
                sendCaption={chats?.media?.caption}
                fileType={chats.messageType}
                sendMessage={chats.message}
                sendMedia={chats?.media}
                // onClick={() => handleModal(chats.media.thumb_image)}
              />
            ) : (
              <ReceivedImage
                key={`${index}ReceivedMessage`}
                receivedCaption={chats?.media?.caption}
                receivedImage={chats?.media?.thumb_image}
                nickName={chats.nickName}
                utcTimestamp={chats.utcTimestamp}
                fileType={chats.messageType}
                receivedMessage={chats.message}
                receivedMedia={chats?.media}
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
          isDisable={isDisable}
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
