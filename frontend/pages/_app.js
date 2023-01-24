import React from "react";
import NavBar from "../component/NavBar";
import "../styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/AuthContext";
import Footer from "../component/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <ToastContainer position="top-center" />
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default MyApp;
