import { useState } from 'react';

const useLocalStorage = (key, intitialValue) => {
    const [state, setState] = useState(() => {
        try {
            const user = localStorage.getItem(key);

            return user ? JSON.parse(user) : intitialValue;
        } catch (error) {
            return intitialValue;
        }
    });

    const setUser = (value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            setState(value);
        } catch (error) {
            console.log(error);
        }
    };

    return [state, setUser];
};

export default useLocalStorage;
