import {
  Box,
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
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import SDK from "../../../chatSDK";
import { useQuery, useQueryClient } from "react-query";
import MultiSelect from "../InputComponent/MultiSelect";
import { useRegisteredUser } from "../../../helpers/user";
import { getGroupParticipants } from "../../../main/services/chat";

const AddParticipantGroup = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const toast = useToast();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userFormData = event.target.userList;
    const results = [];
    const singleParticipantvalue = [userFormData?.value];
    if (singleParticipantvalue[0] === "") {
      userFormData?.forEach((el) => {
        results.push(el.value);
        // results?.push(
        //   el.value.includes("@aegixglobal-xmpp.mirrorfly.com")
        //     ? el.value
        //     : el.value + "@aegixglobal-xmpp.mirrorfly.com"
        // );
      });
    } else {
      results?.push(
        //   userFormData?.value?.includes("@aegixglobal-xmpp.mirrorfly.com")
        //     ? userFormData?.value
        //     : userFormData?.value + "@aegixglobal-xmpp.mirrorfly.com"
        userFormData?.value
      );
    }
    const response = await SDK.addParticipants(
      props.groupJid,
      props.groupName,
      results
    );
    console.log(response);
    if (response.message === "Success") {
      queryClient.invalidateQueries("getGroupChat");
      toast({
        title: "New memeber added",
        position: "top-right",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      return onClose();
    }
  };
  const { data } = useQuery(
    ["getGroupParticipants", props.groupJid],
    () => getGroupParticipants(props.groupJid),
    {
      refetchOnMount: false,
    }
  );

  const groupParticipants = data?.participants;
  const userlist = useRegisteredUser();
  const addToGroup = userlist?.filter((userListAll) => {
    return !groupParticipants?.some((userInGroup) => {
      return userListAll.userId === userInGroup.userId;
    });
  });
  const optionsValue =
    addToGroup &&
    addToGroup.map((list) => {
      return {
        value: `${list.userJid}`,
        label: list.userId,
      };
    });
  return (
    <Box width={"100%"}>
      <Text onClick={onOpen}>Add Participant</Text>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.groupName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <Grid gap={"20px"}>
                <MultiSelect
                  label={"User List"}
                  name={"userList"}
                  option={optionsValue}
                />
                <Button type="submit">Add Participants</Button>
              </Grid>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddParticipantGroup;
