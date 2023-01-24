import React from "react";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";

const NavBar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { user } = state;
  const router = useRouter();
  const logOutHandler = async () => {
    // clear fron Front end

    dispatch({
      type: "USER_LOGOUT",
    });

    window.localStorage.removeItem("user");

    // now clear the cookie from Backend
    try {
      setLoading(true);
      const { data } = await axios.get("/api/logout");
      if (data.ok) {
        toast.success("Logout was Successfull");
        router.push("/");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Logout Failed");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="navbar bg-neutral-focus text-white">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            CarPortal
          </Link>
        </div>
        <div className="flex-none float-left">
          <ul className="menu menu-horizontal">
            {user == null && (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            )}

            {user && user.name && (
              <>
                {" "}
                <li tabIndex={0}>
                  <a>
                    User
                    <svg
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                  </a>
                  <ul className="p-1 bg-primary m-2">
                    <li>
                      <Link href="/user/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link href="/product/create-product">Create Post</Link>
                    </li>
                    <li>
                      <div className="btn btn-ghost" onClick={logOutHandler}>
                        Logout
                      </div>
                    </li>
                  </ul>
                </li>{" "}
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
