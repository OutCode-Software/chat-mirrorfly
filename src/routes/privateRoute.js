import { Navigate } from "react-router-dom";
import { useConnectServer } from "../auth/chat/connectServer";
import { useEffect, useState } from "react";

export { PrivateRoute };
function PrivateRoute({children}) {

    useEffect(() => {
      const items = localStorage.getItem('loginStatus');
      if (items === undefined) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/" />
    }
    }, []);

    return children

}
