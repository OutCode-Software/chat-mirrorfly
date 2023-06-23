import {
  Box,
  Button,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import SDK from "../../../chatSDK";
import { useQuery, useQueryClient } from "react-query";
import {
  deleteGroupChat,
  getGroupParticipants,
} from "../../../main/services/chat";
import { AiFillCloseCircle } from "react-icons/ai";

const RemoveParticipant = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { groupJid, groupName } = props;
  const [isRemove, setIsRemove] = useState(false);
  // const groupParticipants = getGroupParticipants(groupJid);
  const { data, isLoading } = useQuery(
    ["getGroupParticipants", isRemove, groupJid],
    () => getGroupParticipants(groupJid),
    {
      refetchOnMount: false,
    }
  );
  const groupParticipants = data?.participants;

  const removeParticipant = async (userJid) => {
    if (groupParticipants?.length === 1) {
      onClose();
      const response = deleteGroupChat(groupJid);
      response.then((data) => {
        if (data?.message === "Success")
          queryClient.invalidateQueries("getGroupChat");
        toast({
          title: "Group has beed deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
    }
    const response = await SDK.removeParticipant(groupJid, userJid, true);
    setIsRemove((state) => !state);
  };
  return (
    <Box width={"100%"}>
      <Text onClick={onOpen}>Remove Participant</Text>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.groupName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isLoading ? (
              <Spinner />
            ) : (
              groupParticipants?.map((groupMember, index) => {
                return (
                  <Flex
                    key={index}
                    onClick={() => removeParticipant(groupMember.userJid)}
                    cursor={"pointer"}
                    padding={"5px"}
                    borderRadius={"5px"}
                    border={"1px solid #cccccc"}
                    marginBottom={"5px"}
                    _hover={{ background: "rgb(236, 236, 236)" }}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    {groupMember?.userId}
                    <AiFillCloseCircle color="red" />
                  </Flex>
                );
              })
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RemoveParticipant;
