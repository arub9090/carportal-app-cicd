import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ModalEditProduct({ pid, singlePost }) {
  const router = useRouter();

  const [title, setTitle] = useState(singlePost && singlePost.title);
  const [make, setMake] = useState(singlePost && singlePost.make);
  const [model, setModel] = useState(singlePost && singlePost.model);
  const [year, setYear] = useState(singlePost && singlePost.year);
  const [trim, setTrim] = useState(singlePost && singlePost.trim);
  const [bodytype, setBodytype] = useState(singlePost && singlePost.bodytype);
  const [color, setColor] = useState(singlePost && singlePost.color);
  const [mileage, setMileage] = useState(singlePost && singlePost.mileage);
  const [vin, setVin] = useState(singlePost && singlePost.vin);
  const [condition, setCondition] = useState(
    singlePost && singlePost.condition
  );
  const [fueleconomy, setFueleconomy] = useState(
    singlePost && singlePost.fueleconomy
  );
  const [safetyfeature, setSafetyfeature] = useState(
    singlePost && singlePost.safetyfeature
  );
  const [price, setPrice] = useState(singlePost && singlePost.price);
  const [video, setVideo] = useState(singlePost && singlePost.video);
  const [postimage, setPostimage] = useState(
    singlePost && singlePost.postimage
  );
  const [country, setCountry] = useState(singlePost && singlePost.country);
  const [city, setCity] = useState(singlePost && singlePost.city);
  const [description, setDescription] = useState(
    singlePost && singlePost.description
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/update-single-product", {
        pid,
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
      });

      if (data.ok) {
        toast.success("Product Updated Successfully");
        router.push("/user/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="float-right">
        <label htmlFor="my-modal-5" className="btn btn-sm btn-primary">
          Edit Post
        </label>
      </div>

      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box rounded w-11/12 max-w-6xl">
          <form onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 mt-3 mb-6 text-sm font-bold uppercase">
              Product Information
            </h6>
            <div className="">
              <div className="flex flex-wrap">
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      {" "}
                      Title{" "}
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      {" "}
                      Make{" "}
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      {" "}
                      Model{" "}
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      {" "}
                      Year{" "}
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      {" "}
                      Trim{" "}
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      value={trim}
                      onChange={(e) => setTrim(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      {" "}
                      Body Type{" "}
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      value={bodytype}
                      onChange={(e) => setBodytype(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      {" "}
                      Color{" "}
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      {" "}
                      Milage{" "}
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      {" "}
                      VIN{" "}
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      value={vin}
                      onChange={(e) => setVin(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      {" "}
                      Condition{" "}
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      {" "}
                      Fuel Economy{" "}
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      value={fueleconomy}
                      onChange={(e) => setFueleconomy(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      {" "}
                      Safety Features{" "}
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      value={safetyfeature}
                      onChange={(e) => setSafetyfeature(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                    {" "}
                    price{" "}
                  </label>
                  <input
                    type="text"
                    className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <hr className="border-b-1 border-blueGray-300 mt-6" />

            <h6 className="text-blueGray-400 mt-3 mb-6 text-sm font-bold uppercase">
              Product Location
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                    {" "}
                    City{" "}
                  </label>
                  <input
                    type="text"
                    className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                    {" "}
                    Country{" "}
                  </label>
                  <input
                    type="text"
                    className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <hr className="border-b-1 border-blueGray-300 mt-6" />

            <h6 className="text-blueGray-400 mt-3 mb-6 text-sm font-bold uppercase">
              Details
            </h6>
            <div className="flex flex-wrap">
              <div className="lg:w-12/12 w-full px-4">
                <div className="relative mb-3 w-full">
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                    {" "}
                    Description{" "}
                  </label>
                  <textarea
                    type="text"
                    className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mb-0 rounded-t bg-white px-6 py-6">
              <div className="flex justify-center text-center">
                <button
                  className="mr-1 rounded bg-pink-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-pink-600"
                  type="submit"
                >
                  Publish
                </button>
              </div>
            </div>
          </form>
          <div className="modal-action">
            <label htmlFor="my-modal-5" className="btn">
              Close !
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalEditProduct;
