import { useQueryClient } from "react-query";
import SDK from "../../chatSDK";

function connectionListener(response) {
    if (response.status === "CONNECTED") {
      console.log("Connection Established");
    } else if (response.status === "DISCONNECTED") {
      console.log("Disconnected");
    }
  }
  function friendsListListener(response) {
    console.log("Friends List", response);
  }
  function userProfileListener(response) {
    // console.log("User Profile Details Listener", response);
  }
  function groupMsgInfoListener (response) {
    console.log("group message", response);
  }

  const useInitialize =  async() =>{
    const queryClient = useQueryClient()
    function messageListener(response) {

      queryClient.invalidateQueries('messageList')
      queryClient.invalidateQueries('recentChat')

    }
    const initializeObj = {
        apiBaseUrl: "https://api-preprod-sandbox.mirrorfly.com/api/v1",
        licenseKey: "K28Kye5eVkZR8Uyp1uXNl5bg2q310B",
        isTrialLicenseKey: true,
        callbackListeners: {
          connectionListener,
          friendsListListener,
          userProfileListener,
          messageListener,
          groupMsgInfoListener,
        },
      };
       await SDK.initializeSDK(initializeObj);
  }
  export default useInitialize
