import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Logout = () => {
    const { userLogout } = useContext(AuthContext);

    userLogout();
};
