import "./ProfileOrders.css";
import { OrderInfo } from "./OrderInfo/OrderInfo";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/Auth";

import * as userRequest from "../../../services/user";

export const ProfileOrders = () => {
    const { user } = useContext(AuthContext);
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        takeUserOrders();
    }, []);

    const takeUserOrders = () => {
        userRequest
            .getOrders(user["user_id"])
            .then((res) => setUserOrders(JSON.parse(res)))
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className='orders'>
                {userOrders.map((order) => (
                    <OrderInfo order={order}></OrderInfo>
                ))}
            </div>
        </>
    );
};
