import React from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "../component/Loading";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);
  const router = useRouter();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/send-email`, {
        email,
      });
      if (data && data.ok) {
        toast.success("Email has been sent to your email address");
        setEmailSuccess(true);
      } else {
        toast.error("Email not found or something went wrong");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const passwordResetHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/reset-password`, {
        email,
        secretCode,
        newPassword,
      });

      if (data && data.ok) {
        toast.success("Please login with New Password");
        setLoading(false);
        setEmail("");
        setSecretCode("");
        setNewPassword("");
        router.push("/login");
      }
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
        <div className="grid place-items-center">
          <section className="">
            <div className="container py-12 px-6 h-full">
              <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                <div className="xl:w-10/12">
                  <div className="block bg-white shadow-lg rounded-lg">
                    <div className="lg:flex lg:flex-wrap g-0">
                      <div className="lg:w-6/12 px-4 md:px-0">
                        <div className="md:p-12 md:mx-6">
                          <div className="text-center">
                            <img
                              className="mx-auto w-48"
                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                              alt="logo"
                            />
                            <h4 className="text-xl font-bold mt-1 mb-12 pb-1">
                              Thanks For Using CarPortal
                            </h4>
                          </div>
                          {/* form Starts */}
                          <form
                            onSubmit={
                              emailSuccess
                                ? passwordResetHandler
                                : onSubmitHandler
                            }
                          >
                            <p className="mb-4 font-semibold">
                              Reset Your Password !
                            </p>
                            <div className="mb-4 form-group">
                              <input
                                type="text"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Associated with Carportal"
                                required
                              />
                            </div>
                            {emailSuccess && (
                              <>
                                <div className="mb-4 form-group">
                                  <input
                                    type="text"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    value={secretCode}
                                    onChange={(e) =>
                                      setSecretCode(e.target.value)
                                    }
                                    placeholder="Secret Code Case sensitive"
                                    required
                                  />
                                </div>

                                <div className="mb-4 form-group">
                                  <input
                                    type="password"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    value={newPassword}
                                    onChange={(e) =>
                                      setNewPassword(e.target.value)
                                    }
                                    placeholder="New Password- Minimum 6 Characters"
                                    required
                                  />
                                </div>
                              </>
                            )}
                            <div className="text-center pt-1 mb-12 pb-1">
                              <button
                                className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                type="submit"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                style={{
                                  background:
                                    "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                }}
                              >
                                Submit Request
                              </button>
                            </div>
                          </form>
                          {/*   //form Ends */}
                        </div>
                      </div>
                      <div
                        className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                        style={{
                          background:
                            "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                        }}
                      >
                        <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                          <h4 className="text-xl font-semibold mb-6">
                            Forgot Password ? We got you covered!
                          </h4>
                          <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
