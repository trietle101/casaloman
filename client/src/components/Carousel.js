import React from "react";
import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "../assets/css/Carousel.scss";

const imgHeight = "488px";

const images = [
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/1-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/3-1-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/3-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/4-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/5-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/6-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/12/10-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/12/Facetune_10-12-2022-20-45-42-1-1663x2048.jpg",
    originalHeight: imgHeight
  }
];
const images2 = [
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/7-1-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/7-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/011A-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/13-2-600x739.jpg",
    originalHeight: imgHeight
  },
  {
    original: "https://casaloman.com/wp-content/uploads/2022/11/15-600x739.jpg",
    originalHeight: imgHeight
  },
  {
    original: "https://casaloman.com/wp-content/uploads/2022/11/16-600x739.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/17-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/20-1-1663x2048.jpg",
    originalHeight: imgHeight
  }
];
const images3 = [
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/21-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/22-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/A763988A-1BDC-49C3-9637-A1382064AAEF-1-1662x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/Facetune_17-11-2022-22-47-50-1-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/Facetune_18-11-2022-21-44-02-3-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/IMG_1176-1663x2048.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/Image-2022-09-10-at-9.04-AM-600x739.jpg",
    originalHeight: imgHeight
  },
  {
    original:
      "https://casaloman.com/wp-content/uploads/2022/11/Image-2022-09-15-at-2.55-AM-600x739.jpg",
    originalHeight: imgHeight
  }
];

const Carousel = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div className="carousel" data-aos="fade-up">
      <div className="carousel-container">
        <ImageGallery
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          showNav={isHovering}
          items={images}
          autoPlay={true}
          showFullscreenButton={false}
          showPlayButton={false}
          slideInterval={2500}
        />
        <ImageGallery
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          showNav={isHovering}
          items={images2}
          autoPlay={true}
          showFullscreenButton={false}
          showPlayButton={false}
          slideInterval={2500}
        />
        <ImageGallery
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          showNav={isHovering}
          items={images3}
          autoPlay={true}
          showFullscreenButton={false}
          showPlayButton={false}
          slideInterval={2500}
        />
      </div>
    </div>
  );
};

export default Carousel;
