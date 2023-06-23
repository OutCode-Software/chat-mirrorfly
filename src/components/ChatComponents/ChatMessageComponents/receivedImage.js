import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import style from "./message.module.scss";
import { FcDocument } from "react-icons/fc";

const ReceivedImage = ({
  receivedImage,
  receivedCaption,
  fileType,
  receivedMedia,
  receivedMessage,
  utcTimestamp,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleImage = (receivedImage) => {
    setIsOpen(true);
  };
  const modalClose = () => {
    setIsOpen(false);
  };
  return (
    <Flex
      className={style.receivedImageContainer}
      flexDirection={"column"}
      background={
        receivedCaption || fileType === "text" || fileType === "file"
          ? "#e8e8e8"
          : ""
      }
      color={
        receivedCaption || fileType === "text" || fileType === "file"
          ? "#545454"
          : "#000"
      }
    >
      {fileType === "image" && (
        <Flex flexDirection={"column"} className={style.receivedImageBody}>
          {receivedCaption && (
            <Text marginBottom={"10px"}>{receivedCaption}</Text>
          )}
          <Image
            objectFit="contain"
            src={`data:image/jpeg;base64,${receivedImage}`}
            alt="send image"
            borderRadius={"7px"}
            width={"100%"}
            onClick={() => handleImage(receivedImage)}
          />{" "}
          {/* {receivedTime && (
            <Text marginTop={"10px"} fontSize={"10px"}>
              {receivedTime}
            </Text>
          )} */}
        </Flex>
      )}
      {fileType === "video" && (
        <Flex flexDirection={"column"} className={style.receivedImageBody}>
          {receivedCaption && (
            <Text marginBottom={"10px"}>{receivedCaption}</Text>
          )}

          <video
            className="VideoInput_video"
            width="100%"
            height={"250px"}
            controls
            src={`data:video/mp4;base64,${receivedImage}`}
          />
          {/* {receivedTime && (
            <Text marginTop={"10px"} fontSize={"10px"}>
              {receivedTime}
            </Text>
          )} */}
        </Flex>
      )}
      {fileType === "file" && (
        <Flex flexDirection={"column"} className={style.receivedImageBody}>
          {receivedCaption && (
            <Text marginBottom={"10px"}>{receivedCaption}</Text>
          )}
          <Flex>
            <Box fontSize={"22px"} marginRight={"10px"}>
              <FcDocument height={"22px"} />
            </Box>
            <Text>{receivedMedia.fileName}</Text>
          </Flex>{" "}
          {/* {receivedTime && (
            <Text marginTop={"10px"} fontSize={"10px"}>
              {receivedTime}
            </Text> */}
          {/* )} */}
        </Flex>
      )}
      {fileType === "text" && (
        <Flex flexDirection={"column"} className={style.receivedImageBody}>
          <Text>{receivedMessage}</Text>
          {/* {receivedTime && <Text fontSize={"10px"}>{receivedTime}</Text>} */}
        </Flex>
      )}
    </Flex>
  );
};

export default ReceivedImage;
