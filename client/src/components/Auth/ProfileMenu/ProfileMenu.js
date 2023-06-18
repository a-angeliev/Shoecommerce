import { useContext } from "react";
import "./ProfileMenu.css";
import { AuthContext } from "../../../contexts/Auth";
import { useNavigate } from "react-router-dom";

export const ProfileMenu = () => {
    const { userLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = () => {
        userLogout();
    };
    return (
        <div className='profile-menu'>
            <ul className='profile-menu-list'>
                <li>Profile</li>
                <li
                    onClick={() => {
                        navigate("/user/orders");
                    }}>
                    Orders
                </li>
                <li onClick={logout}>Logout</li>
            </ul>
        </div>
    );
};
