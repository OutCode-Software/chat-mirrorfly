import { Flex, Text } from "@chakra-ui/react";
import style from "./message.module.scss";
const SendMessage = ({ sendMessage, fromUserId, utcTimestamp, nickName }) => {
  // const sendTime = useDateUtc(utcTimestamp);
  return (
    <Flex
      color={"#fff"}
      className={style.sendMessageContainer}
      flexDirection={"column"}
    >
      <Text>{sendMessage}</Text>
      {/* {sendTime && <Text fontSize={'10px'}>{sendTime}</Text>} */}
    </Flex>
  );
};

export default SendMessage;
