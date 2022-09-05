import "./MorePhotos.css";

import { useEffect, useState } from "react";

export const MorePhotos = ({ images, slideImg }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const next = () => {
    setImgIndex((i) => (i + 1) % images.length);
    slideImg(imgIndex);
  };

  const prev = () => {
    setImgIndex((i) => (i - 1) % images.length);
  };

  useEffect(() => {
    let slider = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(slider);
  });

  const getImgIndex = (idx) => {
    slideImg(idx);
  };

  return (
    <section className="main-shoe-more--images scn">
      <ul className="main-shoe-images-list">
        {images &&
          images.map((img, i) => (
            <li key={img.id} className="main-shoe-img-item">
              <img
                src={img}
                alt="Air Jordan XXXVI FS"
                onClick={() => getImgIndex(i)}
              />
            </li>
          ))}
      </ul>
    </section>
  );
};
