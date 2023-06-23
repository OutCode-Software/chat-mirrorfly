import {
  Box,
  Button,
  Flex,
  List,
  ListIcon,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SDK from "../../../chatSDK";
import { useQuery } from "react-query";
import style from "./chatlist.module.scss";
import ChatProfile from "../ChatProfile";
import GroupChat from "../GroupChat";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { BsPeopleFill } from "react-icons/bs";

import AddGroup from "../GroupChat/addGroup";
import UserList from "../UserList";

export const LeftSideBar = ({
  setGroupName,
  setUserId,
  userId,
  setUserJID,
  setGroupJid,
}) => {
  const [singleChatActive, setSingleChatActive] = useState(true);
  const [groupChatActive, setGroupChatActive] = useState(true);

  const registerUser = async () => {
    //    const response= await SDK.getRegisteredUsers();
    return await SDK.getUsersList();
  };
  const { data } = useQuery("repoData", registerUser);
  const userList = data?.users;
  // const userList = useRegisteredUser();
  const optionsValue =
    userList &&
    userList.map((list) => {
      return {
        // value: `${list.userJid + "@xmpp-preprod-sandbox.mirrorfly.com"}`,
        value: `${list.userJid}`,
        label: list.userId,
      };
    });

  const recentChat = async () => {
    const response = await SDK.getRecentChats();
    return response.data;
  };

  const { data: recentUser } = useQuery("recentChat", recentChat);

  return (
    <Box className={style.leftSideBar}>
      <ChatProfile />
      <Tabs>
        <TabList>
          <Tab fontSize={"22px"} _selected={{ color: "white", bg: "#00B6B4" }}>
            <RxCounterClockwiseClock />
          </Tab>
          <Tab fontSize={"22px"} _selected={{ color: "white", bg: "#00B6B4" }}>
            <BsPeopleFill />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding={"0px"}>
            <Flex className={style.chatListWrapper}>
              Groups
              <AddGroup optionsValue={optionsValue} />
            </Flex>
            <GroupChat
              groupChatActive={groupChatActive}
              setGroupChatActive={setGroupChatActive}
              setSingleChatActive={setSingleChatActive}
              setUserJID={setUserJID}
              setGroupJid={setGroupJid}
              optionsValue={optionsValue}
              setUserId={setUserId}
              setGroupName={setGroupName}
            />
            <Box
              borderBottom="1px solid rgb(236, 236, 236)"
              padding="8px 10px"
              background={"rgb(171 171 171)"}
              color={"#fff"}
              textAlign={"start"}
            >
              Chats
            </Box>
            <Flex flexDirection={"column-reverse"}>
              {recentUser &&
                recentUser.reverse().map((users, index) => {
                  return (
                    <div>
                      {users.chatType === "chat" && (
                        <UserList
                          key={index}
                          active={
                            users.fromUserId === userId && singleChatActive
                              ? "rgb(236, 236, 236)"
                              : ""
                          }
                          unreadCount={users.unreadCount}
                          onClick={() => {
                            setUserId(users.fromUserId);
                            setGroupChatActive(false);
                            setSingleChatActive(true);
                            setGroupJid("");
                            setUserJID(
                              `${
                                users.fromUserId +
                                "@xmpp-preprod-sandbox.mirrorfly.com"
                              }`
                            );
                            // setUserJID(
                            //   users.userJid.includes(
                            //     "@xmpp-preprod-sandbox.mirrorfly.com"
                            //   )
                            //     ? users.userJid
                            //     : `${
                            //         users.userJid +
                            //         "@xmpp-preprod-sandbox.mirrorfly.com"
                            //       }`
                            // );
                          }}
                        >
                          {users.fromUserId}
                        </UserList>
                      )}
                    </div>
                  );
                })}
            </Flex>
          </TabPanel>
          <TabPanel padding={"0px"}>
            <Flex flexDirection={"column-reverse"}>
              {userList &&
                userList?.reverse()?.map((users, index) => {
                  return (
                    <div>
                      <UserList
                        key={index}
                        active={
                          users.userId === userId && singleChatActive
                            ? "rgb(236, 236, 236)"
                            : ""
                        }
                        unreadCount={users.unreadCount}
                        onClick={() => {
                          setUserId(users.userId);
                          setGroupChatActive(false);
                          setSingleChatActive(true);
                          setGroupJid("");
                          setUserJID(
                            `${
                              users.userId +
                              "@xmpp-preprod-sandbox.mirrorfly.com"
                            }`
                          );
                        }}
                      >
                        {users.userId}
                      </UserList>
                    </div>
                  );
                })}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
