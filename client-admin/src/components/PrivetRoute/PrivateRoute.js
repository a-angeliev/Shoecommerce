import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export const PrivateRoute = (props) => {
    const { isAuthenticated } = useContext(AuthContext);

    const { children } = props;

    return isAuthenticated ? <>{children}</> : <Navigate to='/login' replace={true} />;
};
