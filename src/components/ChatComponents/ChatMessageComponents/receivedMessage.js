import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import style from './message.module.scss';

const ReceivedMessage = ({ receivedMessage }) => {
  return (
    <Flex className={style.receivedMessageContainer}>
      <Text>{receivedMessage}</Text>
    </Flex>
  );
};

export default ReceivedMessage;
