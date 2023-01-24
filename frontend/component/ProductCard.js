import Link from "next/link";
import React from "react";

const ProductCard = ({ post }) => {
  const {
    _id,
    title,
    make,
    model,
    year,
    trim,
    bodytype,
    color,
    mileage,
    vin,
    condition,
    fueleconomy,
    safetyfeature,
    price,
    video,
    postimage,
    country,
    city,
    description,
  } = post;

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl m-3">
        <figure>
          <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge badge-secondary">{condition}</div>
          </h2>
          <p>{description}</p>
          <div className="card-actions justify-start">
            <div className="badge badge-outline">{city}</div>
            <div className="badge badge-outline">{country}</div>
          </div>

          <div className="card-actions justify-end">
            <Link
              className="btn btn-sm btn-primary"
              href={`/single-post/${_id}`}
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
