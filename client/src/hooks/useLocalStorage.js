import { useContext, useState } from "react";
import { ActiveIconContext } from "../contexts/activeIconContext";
// /**
//  *
//  * @param { string } key
//  * @param { {} || null } intitialValue
//  * @returns
//  */
// const useLocalStorage = (key, intitialValue) => {
//     const [state, setState] = useState(() => {
//         try {
//             const user = localStorage.getItem(key);

//             return user ? JSON.parse(user) : intitialValue;
//         } catch (error) {
//             return intitialValue;
//         }
//     });

//     const setUser = (value) => {
//         try {
//             localStorage.setItem(key, value);
//             setState(JSON.parse(value));
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const removeUser = () => {
//         localStorage.removeItem(key);
//         setState(intitialValue);
//     };

//     return [state, setUser, removeUser];
// };

// export default useLocalStorage;

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : defaultValue;
    });

    const setLocalStorageValue = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
    };

    return [value, setLocalStorageValue];
};
