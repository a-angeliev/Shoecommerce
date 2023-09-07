import { useContext } from "react";
import { ActiveIconContext } from "../contexts/activeIconContext";
import { useNavigate } from "react-router-dom";
import { ScrollContext } from "../contexts/scrollContext";

export const useNav = () => {
    const { setActiveIcon } = useContext(ActiveIconContext);
    const { addScrollPosition } = useContext(ScrollContext);
    const navigate = useNavigate();

    const nav = (url, removeActiveIcon = true) => {
        addScrollPosition();
        if (removeActiveIcon) {
            setActiveIcon("");
            navigate(url);
        } else {
            navigate(url);
        }
    };
    return nav;
};

export const useNavigationWithHistory = () => {
    const { addScrollPosition } = useContext(ScrollContext);

    const navigate = useNavigate();
    const nav = (url) => {
        addScrollPosition();
        navigate(url);
    };
    return nav;
};
