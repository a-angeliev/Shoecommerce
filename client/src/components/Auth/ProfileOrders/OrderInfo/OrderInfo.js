import { useState } from "react";

import { OrderItem } from "./OrderItem/OrderItem";

import "./OrderInfo.css";

export const OrderInfo = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [signChange, setSignChange] = useState(false);

    const order = props.order;

    const expandOrder = () => {
        setExpanded((prev) => !prev);
        setSignChange((prev) => !prev);
    };

    return (
        <>
            <div className={`order high-resolution-order ${expanded ? "expandedCard" : ""}`} onClick={expandOrder}>
                <div className='order-info'>
                    <div className='order-id'>Order ID: {order.id}</div>
                    <div className='order-price'>Price: {order.total_price}$</div>
                    <div className='order-status'>
                        <div className={order.is_shipped}></div>
                        <div>{order.is_shipped}</div>
                    </div>
                    <div className={`sign ${signChange ? "signChange" : ""}`}></div>
                </div>

                {order.order_items.map((item) => (
                    <OrderItem key={item.id} item={item}></OrderItem>
                ))}

                <div className='total-price-order'>Total price: {order.total_price}$</div>
            </div>
            <div className='divider-big high-resolution-order'></div>

            <div className={`order low-resolution-order ${expanded ? "expandedCard" : ""}`} onClick={expandOrder}>
                <div className='order-info'>
                    <div className='order-id'>ID: {order.id}</div>
                    <div className='order-price'>{order.total_price}$</div>
                    <div className='order-status'>
                        <div className={order.is_shipped}></div>
                        <div>{order.is_shipped}</div>
                    </div>
                    <div className={`sign ${signChange ? "signChange" : ""}`}></div>
                </div>

                {order.order_items.map((item) => (
                    <OrderItem key={item.id} item={item}></OrderItem>
                ))}
                <div className='total-price-order'>Total price: {order.total_price}$</div>
            </div>
            <div className='divider-big low-resolution-order'></div>
        </>
    );
};
