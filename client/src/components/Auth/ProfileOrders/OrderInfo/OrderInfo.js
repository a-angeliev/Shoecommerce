import "./OrderInfo.css";
import { useState } from "react";

export const OrderInfo = ({ children, order }) => {
    const [expanded, setExpanded] = useState(false);
    const [signChange, setSignChange] = useState(false);

    const expandOrder = () => {
        setExpanded((prev) => !prev);
        setSignChange((prev) => !prev);
    };

    const statusClasses = {
        pending: "pending",
        rejected: "rejected",
        shipped: "shipped",
    };

    const listEachItem = (item) => {
        return (
            <>
                <div className='order-item'>
                    <div className='item-image'>
                        <img
                            className='shoe-image'
                            alt='someimg'
                            src={
                                // "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b0afba18-946f-4509-b75c-87b9c8a6f656/force-1-lv8-younger-shoes-sqhH8p.png"
                                item.img
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
            <div className={`order high-resolution-order ${expanded ? "expandedCard" : ""}`} onClick={expandOrder}>
                <div className='order-info'>
                    <div className='order-id'>Order ID: {children.id}</div>
                    <div className='order-price'>Price: {children.total_price}$</div>
                    <div className='order-status'>
                        <div className={statusClasses[children.is_shipped]}></div>
                        <div>{children.is_shipped}</div>
                    </div>
                    <div className={`sign ${signChange ? "signChange" : ""}`}></div>
                </div>

                {children.order_items.map((item) => listEachItem(item))}
                <div className='total-price-order'>Total price: {children.total_price}$</div>
                {/* <div className='delivery'></div> */}
            </div>
            <div className='divider-big high-resolution-order'></div>

            <div className={`order low-resolution-order ${expanded ? "expandedCard" : ""}`} onClick={expandOrder}>
                <div className='order-info'>
                    <div className='order-id'>ID: {children.id}</div>
                    <div className='order-price'>{children.total_price}$</div>
                    <div className='order-status'>
                        <div className={statusClasses[children.is_shipped]}></div>
                        <div>{children.is_shipped}</div>
                    </div>
                    <div className={`sign ${signChange ? "signChange" : ""}`}></div>
                </div>

                {children.order_items.map((item) => listEachItem(item))}
                <div className='total-price-order'>Total price: {children.total_price}$</div>
                {/* <div className='delivery'></div> */}
            </div>
            <div className='divider-big low-resolution-order'></div>
        </>
    );
};
