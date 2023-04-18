import { useContext } from "react";
import "./ProfileMenu.css";
import { AuthContext } from "../../../contexts/Auth";

export const ProfileMenu = () => {
    const { userLogout } = useContext(AuthContext);
    const logout = () => {
        userLogout();
    };
    return (
        <div className='profile-menu'>
            <ul className='profile-menu-list'>
                <li>Profile</li>
                <li>Orders</li>
                <li onClick={logout}>Logout</li>
            </ul>
        </div>
    );
};
