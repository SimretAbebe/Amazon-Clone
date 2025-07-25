import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {img} from "./images/img/data.js";
import './Carousel.css' ;

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
      >
        {img.map((imageItemLink, index) => (
          <img
            // key={imageItemLink}
            src={imageItemLink}
            alt={`slide-${index}`}
            key={index}
          />
        ))}
      </Carousel>
      <div className="hero_img"></div>
    </div>
  );
}

export default CarouselEffect;
