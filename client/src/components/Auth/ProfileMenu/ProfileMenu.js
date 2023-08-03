import { useContext } from "react";

import { AuthContext } from "../../../contexts/Auth";
import { useNav } from "../../../hooks/useNavigation";

import "./ProfileMenu.css";

export const ProfileMenu = () => {
    const { userLogout } = useContext(AuthContext);
    const navTo = useNav();

    const logout = () => {
        userLogout();
        navTo("/");
    };

    return (
        <div className='profile-menu'>
            <ul className='profile-menu-list'>
                <li
                    onClick={() => {
                        navTo("/user/details");
                    }}>
                    Profile
                </li>
                <li
                    onClick={() => {
                        navTo("/user/orders");
                    }}>
                    Orders
                </li>
                <li onClick={logout}>Logout</li>
            </ul>
        </div>
    );
};
