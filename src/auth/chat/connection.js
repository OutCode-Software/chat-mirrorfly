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
  console.log("User Profile Details Listener", response);
}
function groupMsgInfoListener(response) {
  console.log("group message", response);
}

const useInitialize = async () => {
  const baseUrl = process.env.REACT_APP_BASE_URL_MIRRORFLY;
  const licenseKey = process.env.REACT_APP_LICENSE_KEY;

  console.log("baseUrl", baseUrl);
  const queryClient = useQueryClient();
  function messageListener(response) {
    queryClient.invalidateQueries("messageList");
    queryClient.invalidateQueries("recentChat");
  }
  const initializeObj = {
    apiBaseUrl: baseUrl,
    licenseKey: licenseKey,
    // isTrialLicenseKey: true,
    callbackListeners: {
      connectionListener,
      friendsListListener,
      userProfileListener,
      messageListener,
      groupMsgInfoListener,
    },
  };
  await SDK.initializeSDK(initializeObj);
};
export default useInitialize;
