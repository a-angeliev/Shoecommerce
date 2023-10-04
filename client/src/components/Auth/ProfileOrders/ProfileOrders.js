import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../contexts/Auth";
import { AlertContext } from "../../../contexts/alertContext";
import { OrderInfo } from "./OrderInfo/OrderInfo";
import * as userRequest from "../../../services/user";

import "./ProfileOrders.css";

export const ProfileOrders = () => {
    const { user } = useContext(AuthContext);
    const { setAlert } = useContext(AlertContext);

    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        userRequest
            .getOrders(user["user_id"])
            .then((user) => setUserOrders(JSON.parse(user)))
            .catch((err) => {
                console.log(err);
                setAlert({ color: "red", text: "Somethings gone wrong. Try to reload the page!" });
            });
    }, []);

    return (
        <>
            <div className='orders'>
                {userOrders.length !== 0 ? (
                    userOrders.map((order) => <OrderInfo key={order.id} order={order}></OrderInfo>)
                ) : (
                    <div className='order-message'>
                        <p>You don't have any orders yet</p>
                    </div>
                )}
            </div>
        </>
    );
};
