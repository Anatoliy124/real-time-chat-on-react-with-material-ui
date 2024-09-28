import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { privateRotes, publicRoutes } from "../router";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/constants";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";

const AppRouter = () => {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);

    return user ? (
        <Routes>
            {privateRotes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact={true} />
            ))}
            <Route path="*" element={<Navigate to={CHAT_ROUTE} />} />
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact={true} />
            ))}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;
