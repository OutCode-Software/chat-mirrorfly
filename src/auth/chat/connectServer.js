import React, { useEffect, useState } from "react";
import SDK from "../../chatSDK";
import { useQuery } from "react-query";
import { noSpecialCharacters } from "../../helpers/noSpecialCharacter";

export const useConnectServer = () => {
  useEffect(() => {
    const connectServer = async () => {
      const user = JSON.parse(localStorage.getItem("login"));
      console.log("user", user);

      const response = await SDK.connect(
        noSpecialCharacters(user.userName),
        user.password
      );
      localStorage.setItem("loginStatus", response?.message);
      console.log("response", response);
    };
    connectServer();
  });
};
