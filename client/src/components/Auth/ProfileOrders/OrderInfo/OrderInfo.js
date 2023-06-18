import "./OrderInfo.css";
import { useState } from "react";

export const OrderInfo = ({ children, order }) => {
    const [expanded, setExpanded] = useState(false);
    const [signChange, setSignChange] = useState(false);

    const expandOrder = () => {
        setExpanded((prev) => !prev);
        setSignChange((prev) => !prev);
    };

    const listEachItem = (item) => {
        return (
            <>
                <div className='order-item'>
                    <div className='item-image'>
                        <img
                            className='shoe-image'
                            src={
                                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b0afba18-946f-4509-b75c-87b9c8a6f656/force-1-lv8-younger-shoes-sqhH8p.png"
                            }></img>
                    </div>
                    <div className='item-name'>{item.title}</div>
                    <div className='item-color'>Color: {item.pair_color.replace("PairColor.", "")}</div>
                    <div className='item-size'>Size: {item.pair_size}</div>
                    <div className='item-price'>Price: {item.price}$</div>
                </div>
                <div className='small-divider'></div>
            </>
        );
    };

    return (
        <>
            <div className={`order ${expanded ? "expandedCard" : ""}`} onClick={expandOrder}>
                <div className='order-info'>
                    <div className='order-id'>Order ID: {children.id}</div>
                    <div className='order-price'>Price: {children.total_price}$</div>
                    <div className='order-status'>{children.is_shipped}</div>
                    <div className={`sign ${signChange ? "signChange" : ""}`}></div>
                </div>

                {children.order_items.map((item) => listEachItem(item))}
                <div className='total-price'>Total price: {children.total_price}$</div>
                {/* <div className='delivery'></div> */}
            </div>
            <div className='divider'></div>
        </>
    );
};
