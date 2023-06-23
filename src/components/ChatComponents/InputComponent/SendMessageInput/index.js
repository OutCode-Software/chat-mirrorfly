import React from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";

const SendMessageInput = ({
  placeholder,
  name,
  value,
  onChange,
  sx,
  onClick,
  children,
}) => {
  return (
    <FormControl
      sx={sx}
      display={"flex"}
      alignItems={"center"}
      background={"#fff"}
      position={"relative"}
    >
      {children}

      <Textarea
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        rows="1"
        marginRight={"15px"}
        paddingLeft={"25px"}
      />
      <Button type="submit">
        <AiOutlineSend fontSize={"28px"} cursor={"pointer"} />
      </Button>
    </FormControl>
  );
};

export default SendMessageInput;
