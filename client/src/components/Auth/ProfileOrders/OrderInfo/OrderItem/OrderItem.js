import "./OrderItem.css";

export const OrderItem = (props) => {
    const item = props.item;

    return (
        <>
            <div className='order-item'>
                <div className='item-image'>
                    <img className='shoe-image' alt='shoe img' src={item.img}></img>
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
