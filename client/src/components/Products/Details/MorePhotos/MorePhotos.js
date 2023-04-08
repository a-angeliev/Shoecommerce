import "./MorePhotos.css";

export const MorePhotos = (props) => {
    const photos = [...props.product.images];

    const listShoesImages = (image, idx) => {
        return (
            <li key={idx} className='main-shoe-img-item'>
                <img src={image.img_url} alt='shoe picture' />
            </li>
        );
    };

    return (
        <section className='main-shoe-more--images scn'>
            <ul className='main-shoe-images-list'>
                {photos.map((img, idx) => (idx !== 0 ? listShoesImages(img, idx) : null))}
            </ul>
        </section>
    );
};
