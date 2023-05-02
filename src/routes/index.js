import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import ChatLogin from "../components/ChatComponents/ChatLogin";
import ChatList from "../components/ChatComponents/ChatList";
import ProfileUpdate from "../components/ChatComponents/ChatProfile/profileUpdate";
import { PrivateRoute } from "./privateRoute";

const CustomeRouter = ({ login }) => {
  return (
    <Routes>
      <Route path="/" element={<ChatLogin />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            {" "}
            <ChatLayout />{" "}
          </PrivateRoute>
        }
      >
        <Route path="/chat" element={<ChatList />} />
        <Route path="/profile-update" element={<ProfileUpdate />} />
      </Route>
    </Routes>
  );
};
function ChatLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
export default CustomeRouter;
