import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalEditProduct from "../component/ModalEditProduct";
import ProductCard from "../component/ProductCard";
import Loading from "../component/Loading";

export default function index() {
  const [allPost, setAllPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllPostHere();
  }, []);

  const getAllPostHere = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/all-posts");
      setAllPost(data);
      setLoading(false);
      //console.log("all post from backend", data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="h-60 bg-gradient-to-r from-violet-500 to-fuchsia-500 grid place-items-center">
            <p className="font-mono text-4xl text-white font-bold text-center">
              Welcome to CarPortal
            </p>
          </div>
          {allPost && allPost.length > 0 ? (
            <>
              <div className="constiner content-between">
                <div className="flex flex-wrap justify-center">
                  {allPost.map((post) => (
                    <ProductCard post={post} key={post._id} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>No Post</>
          )}
        </>
      )}
    </>
  );
}
