import { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducer/authReducer";
import axios from "axios";
const AuthContext = createContext();
import { useRouter } from "next/router";

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const initialState = {
    user: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    setUserToStateAfterRefresh();
    const getCsrfToken = async () => {
      const { data } = await axios.get("/api/csrf-token");
      //console.log(data);
      axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
    };

    getCsrfToken();
  }, []);

  const setUserToStateAfterRefresh = () => {
    const myData = JSON.parse(window.localStorage.getItem("user"));
    //console.log(myData);
    if (myData && myData.name) {
      dispatch({
        type: "USER_LOGIN",
        payload: myData,
      });
    }
  };

  axios.interceptors.response.use(
    function (response) {
      return response;
    },

    function (error) {
      if (
        error.response.status === 401 &&
        error.response.config &&
        !error.response.config._isRetryRequest
      ) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then((data) => {
              console.log("Error Here for Token Expired");
              dispatch({
                type: "USER_LOGOUT",
              });
              window.localStorage.removeItem("user");
              router.push("/");
            })

            .catch((err) => {
              console.log(err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
