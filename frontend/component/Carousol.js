import React from "react";

function Carousol() {
  return (
    <>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item  w-full">
          <img
            src="https://www.freewebheaders.com/wp-content/gallery/transport-size-800x200/blue-bmw-alpina-b6-xdrive-gran-coupe-car-header_size-800x200.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://www.freewebheaders.com/wp-content/gallery/transport-size-800x200/blue-ferrari-car-background-header_size-800x200.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://www.freewebheaders.com/wp-content/gallery/transport-size-800x200/lexus-nx-f-sport-interior-luxurious-car-header_size-800x200.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://www.freewebheaders.com/wp-content/gallery/transport-size-800x200/red-ferrari-grand-sport-car-website-header_size-800x200.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousol;
