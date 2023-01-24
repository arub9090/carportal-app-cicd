import react from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "../component/Loading";
import { toast } from "react-toastify";

function UserRoute({ children }) {
  const [ok, setOk] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      if (data && data.name) {
        setOk(true);
      }
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
      toast.error("Error fetching user Redirecting to Login Page");
    }
  };

  return (
    <>
      {!ok ? (
        <>
          {" "}
          <Loading />
        </>
      ) : (
        <> {children} </>
      )}
    </>
  );
}

export default UserRoute;
