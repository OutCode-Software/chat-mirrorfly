import {
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InputField from "../InputComponent/InputField";
import MultiSelect from "../InputComponent/MultiSelect/index";
import SDK from "../../../chatSDK";
import { HiUserGroup } from "react-icons/hi";
import { useQueryClient } from "react-query";
const AddGroup = ({ optionsValue,setGroupJid }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userFormData = event.target.userList;
    const groupName = event.target.groupName.value;
    const results = [];
    // if(userFormData !== Array)
    // {
    //   return;
    // }

    userFormData.forEach((el) => {
      results.push(
        el.value.includes("@xmpp-preprod-sandbox.mirrorfly.com")
          ? el.value
          : el.value + "@xmpp-preprod-sandbox.mirrorfly.com"
      );
    });

    const response = await SDK.createGroup(groupName, results);
    if(response.message === "Success")
    {
      queryClient.invalidateQueries('getGroupChat')
            return onClose()
    }
    

    // return onClose()
    // const response =await SDK.createGroup(`${"groupName"}`, [`9860613518@xmpp-preprod-sandbox.mirrorfly.com', 'Anisha@xmpp-preprod-sandbox.mirrorfly.com', 'NIKEN@xmpp-preprod-sandbox.mirrorfly.com'`]);
  };

  return (
    <div>
      <Tooltip
        placement="bottom-end"
        hasArrow
        label="Create Group"
        bg="gray.600"
      >
        <Text onClick={onOpen} cursor={"pointer"} width={"30x"}>
          {" "}
          <HiUserGroup fontSize={"22px"} />
        </Text>
      </Tooltip>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Grid gap={"20px"}>
                <InputField
                  label={"Group Name"}
                  placeholder={"Group Name"}
                  type={"text"}
                  name={"groupName"}
                />
                <MultiSelect
                  label={"User List"}
                  name={"userList"}
                  option={optionsValue}
                />
                <Button type="submit">Create Group</Button>
              </Grid>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddGroup;
