import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../component/Loading";
import Singlepostdetails from "../../component/Singlepostdetails";
import ModalEditProduct from "../../component/ModalEditProduct";
import AuthContext from "../../context/AuthContext";

const SinglePost = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [loggedinUserData, setLoggedinUserData] = useState("");

  useEffect(() => {
    if (user && user.name) {
      setLoggedInUser(true);
      setLoggedinUserData(user);
    }
  }, [user]);

  const router = useRouter();
  const { pid } = router.query;
  const [loading, setLoading] = useState(false);
  const [singlePost, setSinglePost] = useState("");

  useEffect(() => {
    getSingePost();
    //console.log("pid", pid);
  }, [pid]);

  const getSingePost = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/single-post", { pid });
      setSinglePost(data);
      //console.log("single Post from Bakcend", data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="h-60 bg-gradient-to-r from-violet-500 to-fuchsia-500 grid place-items-center">
            <p className="font-mono text-4xl text-white font-bold text-center">
              Product Details
            </p>
          </div>
          {loggedInUser &&
            singlePost &&
            loggedinUserData._id === singlePost.creator._id && (
              <ModalEditProduct pid={pid} singlePost={singlePost} />
            )}
          <Singlepostdetails singlePost={singlePost} />
        </>
      )}
    </>
  );
};

export default SinglePost;
