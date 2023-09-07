import { createContext, useEffect, useRef } from "react";

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
    const scrollYRef = useRef(0);

    const handleScroll = () => {
        scrollYRef.current = window.scrollY;
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const addScrollPosition = () => {
        let allScrollPositions = [];
        if (sessionStorage.getItem("scrollPosition")) {
            const sessionScrollPositionState = sessionStorage.getItem("scrollPosition");
            allScrollPositions = [sessionScrollPositionState];
        }
        const currentScrollPosition = Number(scrollYRef.current);
        console.log(currentScrollPosition);
        allScrollPositions.push(currentScrollPosition);
        sessionStorage.setItem("scrollPosition", allScrollPositions);
    };

    useEffect(() => {
        const handleHistoryChange = () => {
            const scrollPositionStack = sessionStorage.getItem("scrollPosition");
            const normalizedScrollPositionStack = scrollPositionStack ? scrollPositionStack.split(",") : [];
            const lastScrollPosition = Number(normalizedScrollPositionStack.pop());
            sessionStorage.setItem("scrollPosition", normalizedScrollPositionStack);
            setTimeout(() => {
                window.scrollTo(0, lastScrollPosition);
            }, 100);
        };
        // Add the event listener to the window's history object
        window.addEventListener("popstate", handleHistoryChange);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("popstate", handleHistoryChange);
        };
    }, []);
    return <ScrollContext.Provider value={{ addScrollPosition }}>{children}</ScrollContext.Provider>;
};
