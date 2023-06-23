import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import style from "./message.module.scss";
import { useState } from "react";
import { FcDocument } from "react-icons/fc";
const SendImage = ({
  sendImage,
  sendCaption,
  fromUserId,
  utcTimestamp,
  nickName,
  onClick,
  fileType,
  sendMessage,
  sendMedia,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleImage = (sendImage) => {
    setIsOpen(true);
  };
  const modalClose = () => {
    setIsOpen(false);
  };
  return (
    <Flex
      // color={'#fff'}
      className={style.sendImageContainer}
      background={
        sendCaption || fileType === "text" || fileType === "file"
          ? "#545454"
          : ""
      }
      color={
        sendCaption || fileType === "text" || fileType === "file"
          ? "#fff"
          : "#000"
      }
      flexDirection={"column"}
    >
      {fileType === "image" && (
        <Flex flexDirection={"column"} className={style.sendImageBody}>
          {sendCaption && <Text marginBottom={"10px"}>{sendCaption}</Text>}
          <Image
            objectFit="contain"
            src={`data:image/jpeg;base64,${sendImage}`}
            alt="send image"
            borderRadius={"7px"}
            width={"100%"}
            onClick={() => handleImage(sendImage)}
          />
          {/* {sendTime && (
            <Text marginTop={"10px"} fontSize={"10px"}>
              {sendTime}
            </Text>
          )} */}
        </Flex>
      )}

      {fileType === "video" && (
        <Flex flexDirection={"column"} className={style.sendImageBody}>
          {sendCaption && <Text marginBottom={"10px"}>{sendCaption}</Text>}

          <video
            className="VideoInput_video"
            width="100%"
            height={"250px"}
            controls
            src={`data:video/mp4;base64,${sendImage}`}
          />
          {/* {sendTime && (
            <Text marginTop={"10px"} fontSize={"10px"}>
              {sendTime}
            </Text>
          )} */}
        </Flex>
      )}
      {fileType === "file" && (
        <Flex flexDirection={"column"} className={style.sendImageBody}>
          {sendCaption && <Text marginBottom={"10px"}>{sendCaption}</Text>}
          <Flex>
            <Box fontSize={"22px"} marginRight={"10px"}>
              <FcDocument height={"22px"} />
            </Box>
            <Text>{sendMedia.fileName}</Text>
          </Flex>{" "}
          {/* {sendTime && (
            <Text marginTop={"10px"} fontSize={"10px"}>
              {sendTime}
            </Text>
          )} */}
        </Flex>
      )}
      {fileType === "text" && (
        <Flex flexDirection={"column"} className={style.sendImageBody}>
          <Text>{sendMessage}</Text>
          {/* {sendTime && <Text fontSize={"10px"}>{sendTime}</Text>} */}
        </Flex>
      )}
    </Flex>
  );
};

export default SendImage;
