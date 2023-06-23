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
import SendImage from "../ChatMessageComponents/sendImage";
import ReceivedImage from "../ChatMessageComponents/receivedImage";
import AttachmentInput from "../../form/attachmentInput";
// import { RemoveParticipant } from "../removeParticipant";
const GroupChat = ({ groupJid, groupName }) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const formRef = React.useRef();
  const currentUser = useUserProfile();
  const [isDisable, setIsDisable] = useState(true);
  const [fileInput, setFileInput] = useState({
    src: "",
    type: "",
    name: "",
  });
  const [isFileUpload, setIsFileInput] = useState(false);

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
          userMessgae.reverse().map((chats, index) => {
            return currentUser?.nickName === chats.user ? (
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
            jid={groupJid}
            setFileInput={setFileInput}
            isFileUpload={isFileUpload}
          />{" "}
        </SendMessageInput>
      </form>
    </Box>
  );
};

export default GroupChat;
