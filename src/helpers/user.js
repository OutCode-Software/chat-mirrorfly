import { useQuery } from "react-query";
import SDK from "../chatSDK";

export const useCurretJid = () => {
  const currentUserJid = async () => {
    return await SDK.getCurrentUserJid();
  };
  const { data } = useQuery("currentJid", currentUserJid);
  return data?.userJid;
};

export const useUserProfile = () => {
  const curretJid = useCurretJid();
  const getUserProfile = async () => {
    return await SDK.getUserProfile(curretJid);
  };
  const { data } = useQuery(["getUserProfile",curretJid], getUserProfile);
  return data?.data;
};

export const useRegisteredUser = () => {
  const registerUser = async () => {
    return await SDK.getUsersList();
  };
  const { data } = useQuery("registerUser", registerUser);
  return data?.users;
};
