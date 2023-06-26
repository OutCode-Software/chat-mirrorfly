### `npm start`
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

### `.env`
1. REACT_APP_BASE_URL_MIRRORFLY for the url of mirrorfly
2. REACT_APP_LICENSE_KEY = license key of mirrorfly


### `How It Works`
1. Chat SDK declaration (file:chatsdk.js)
   * The const SDK line declares a constant variable named SDK.
   * window.SDK is used to access a property called SDK on the window
   * The value of window.SDK is assigned to the SDK variable, effectively creating a new variable that references the same value.
   * Finally, export default SDK; exports the SDK variable as the default export of the module.
2. Initialize Chat SDK (file: connection.js)
   * Several callback listener functions are defined: connectionListener, friendsListListener, userProfileListener, and groupMsgInfoListener. These functions are responsible for handling different types of events or responses received from the chat SDK.
   * The useInitialize function is declared as an async function. It will be used as a custom hook in a React component to initialize the chat SDK.
   * Inside the useInitialize function, the baseUrl and licenseKey are retrieved from environment variables using process.env. These variables are expected to contain the base URL of the chat service (REACT_APP_BASE_URL_MIRRORFLY) and the license key (REACT_APP_LICENSE_KEY).

3. Connection to the chat SDK (file:connectServer.js)
   * The localStorage object is used to retrieve the "login" item, which is expected to contain the user's login information stored as a JSON string.
   * The SDK.connect method is called with two arguments: the username and password obtained from the user object.
   * The response received from the SDK.connect method is stored in the response variable.
   * The localStorage.setItem method is used to store the response.message (which may contain a login status message) in the "loginStatus" item in the browser's local storage.
   * The useConnectServer hook does not return anything, as it is primarily focused on performing the connection to the chat server and handling the login process.


### `Acknowledgments`

   Mirrofly Documentation React Js for chat :- https://www.mirrorfly.com/docs/chat/react/v2/quick-start/
