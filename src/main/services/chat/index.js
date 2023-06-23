import SDK from "../../../chatSDK";

export const getNewUserRegister = async (userRegisterId) => {
  const response = await SDK.register(userRegisterId);
  const connectUser = {
    userName: response?.data?.username,
    password: response?.data?.password,
  };

  localStorage.setItem("loginDetails", JSON.stringify(connectUser));
  await SDK.connect(response?.data?.username, response?.data?.password);
  return response?.data;
};

export const getGroupDetails = async (groupJid) => {
  const response = await SDK.getGroupProfile(groupJid);
  return response?.data;
};
export const getGroupParticipants = async (groupJid) => {
  const response = await SDK.getGroupParticipants(groupJid);
  return response?.data;
};
export const deleteGroupChat = async (groupJid) => {
  const response = await SDK.userDeleteGroup(groupJid);
  return response;
};
