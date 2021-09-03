import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { auth } from "./firebase";
import ClassroomPage from "./pages/ClassroomPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route path="/sign-up">
          <SignUp />
        </Route>

        <Route path="/classroom">
          <ClassroomPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
