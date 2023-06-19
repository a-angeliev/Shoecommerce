import { useContext } from "react";
import "./ProfileMenu.css";
import { AuthContext } from "../../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { ActiveIconContext } from "../../../contexts/activeIconContext";

export const ProfileMenu = () => {
    const { userLogout } = useContext(AuthContext);
    const { setActiveIcon } = useContext(ActiveIconContext);
    const navigate = useNavigate();
    const logout = () => {
        userLogout();
    };
    return (
        <div className='profile-menu'>
            <ul className='profile-menu-list'>
                <li
                    onClick={() => {
                        setActiveIcon("");
                        navigate("/user/details");
                    }}>
                    Profile
                </li>
                <li
                    onClick={() => {
                        setActiveIcon("");
                        navigate("/user/orders");
                    }}>
                    Orders
                </li>
                <li onClick={logout}>Logout</li>
            </ul>
        </div>
    );
};
