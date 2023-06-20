import { useContext } from "react";
import { ActiveIconContext } from "../contexts/activeIconContext";
import { useNavigate } from "react-router-dom";

export const useNav = () => {
    const { setActiveIcon } = useContext(ActiveIconContext);
    const navigate = useNavigate();

    const nav = (url, removeActiveIcon = true) => {
        if (removeActiveIcon) {
            setActiveIcon("");
            navigate(url);
        } else {
            navigate(url);
        }
    };
    return nav;
};
