import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ROOT_ROUTE } from "../constants/routes";
import { auth } from "../firebase";

function LogoutButton() {
  const history = useHistory("");

  const [user, setUser] = useState(null);

  // If user logged in setUser and user does not logged in redirect to login page.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        history.push(ROOT_ROUTE);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <button
      onClick={() => {
        auth.signOut();
      }}
    >
      Log Out
    </button>
  );
}

export default LogoutButton;
