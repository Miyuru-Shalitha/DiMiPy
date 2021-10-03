import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Authorize from "./components/Authorize";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import {
    AUTHORIZATION_ROUTE,
    CLASSROOM_ROUTE,
    ROOT_ROUTE,
    SIGN_UP_ROUTE,
    ADMIN_ROUTE,
} from "./constants/routes";
import { auth } from "./firebase";
import ClassroomPage from "./pages/ClassroomPage";
import AdminPage from "./pages/AdminPage";

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
                <Route exact path={ROOT_ROUTE}>
                    <Login />
                </Route>

                <Route path={SIGN_UP_ROUTE}>
                    <SignUp />
                </Route>

                <Route path={AUTHORIZATION_ROUTE}>
                    <Authorize />
                </Route>

                <Route path={CLASSROOM_ROUTE}>
                    <ClassroomPage />
                </Route>

                <Route path={ADMIN_ROUTE}>
                    <AdminPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
