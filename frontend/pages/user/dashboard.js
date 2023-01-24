import React from "react";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import ProductCard from "../../component/ProductCard";

function Dashboard() {
  const {
    state: { user },
    disPatch,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getUser();
    getPosts();
    if (!user && user === null) {
      router.push("/login");
    }
  }, [user]);

  // i want to show the loading spinner till i get full user data.. as i found at first when we try to destructure the state it gives null data then
  // after 1-2 second it gives the real data--> thats why i did  user && user.name .. till i get this true i will keep loading..

  const getUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/current-user");
      setCurrentUser(data);
      //console.log(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Error in getting user data");
    }
  };

  const getPosts = async () => {
    try {
      const { data } = await axios.get("/api/current-user-posts");
      setUserPosts(data);
    } catch (err) {
      console.log(err);
      toast.error("Error in getting user data");
    }
  };
  return loading ? (
    <>
      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div className="border-t-transparent border-solid animate-spin  rounded-full border-secondary border-8 h-40 w-40"></div>
      </div>
    </>
  ) : (
    <>
      <div className="h-60 bg-gradient-to-r from-violet-500 to-fuchsia-500 grid place-items-center">
        <p className="font-mono text-4xl text-white font-bold text-center">
          Welcome to your Dashboard :{user && user.name.toUpperCase()}
          <br />
          You have total {currentUser && currentUser.advertisePosts.length}{" "}
          Posts
        </p>
      </div>

      <br />

      <div className="constiner content-between">
        <div className="flex flex-wrap justify-center">
          {currentUser &&
            currentUser.advertisePosts.length > 0 &&
            userPosts.map((post) => <ProductCard post={post} key={post._id} />)}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
