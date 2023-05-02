import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import style from "./message.module.scss";
import { useDataUtc } from "../../../helpers/data";
const SendMessage = ({ sendMessage,fromUserId,utcTimestamp,nickName }) => {

  const sendTime = useDataUtc(utcTimestamp)
  return (
    <Flex color={"#fff"} className={style.sendMessageContainer} flexDirection={"column"}>
      <Text >{sendMessage}</Text>
      <Text fontSize={"10px"} >{sendTime}</Text>
    </Flex>
  );
};

export default SendMessage;
