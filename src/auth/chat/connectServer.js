import React, { useEffect, useState } from "react";
import SDK from "../../chatSDK";
import { useQuery } from "react-query";

export const useConnectServer = () => {
    // const connectServer = async () => {
    //   const user = JSON.parse(localStorage.getItem("login"));
    //   return await SDK.connect(user.userName, user.password);
    // //   console.log("connect", connect);
    // };
    // const [loginStatus,setLoginStatus] = useState()
    useEffect(()=>{
      const connectServer = async () => {
        const user = JSON.parse(localStorage.getItem("login"));
        const response =await SDK.connect(user.userName, user.password);
        // setLoginStatus(response?.message)
        localStorage.setItem("loginStatus",response?.message);
          console.log("response", response);
      };
      connectServer()
    })
  // const {data} = useQuery("connect",connectServer)
  // if(data?.message){
  //   localStorage.setItem("loginStatus",data?.message);
  // }

};
