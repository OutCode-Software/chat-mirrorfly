import { useQuery } from "react-query";
import SDK from "../chatSDK";

export const useGroupChatList = ()=>{
    const getGroupsList = async() =>{
   return await SDK.getGroupsList();
        
    }
    const {data} =useQuery("getGroupChat", getGroupsList)
    return data?.data;

}