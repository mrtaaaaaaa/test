// import { useEffect } from "react";
import { parseJwt } from ".";
// import { getRefreshToken } from "apis/auth";

export const checkToken = () => {
  let userToken;

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     userToken = JSON.parse(window.localStorage.getItem("userToken"));
  //   }
  // }, []);

  let flag = true;
  if (userToken) {
    const { exp } = parseJwt(userToken);
    const tokenTimestamp = new Date(exp * 1000); // convert to milliseconds
    const currentTimestamp = new Date(); // current timestamp
    const diffMs = tokenTimestamp.getTime() - currentTimestamp.getTime(); // difference in milliseconds
    const diffMin = Math.round(diffMs / (1000 * 60)); // difference in minutes

    // if (diffMin <= 10 && diffMin > 0 && flag) {
    //   flag = false;
    //   getRefreshToken()
    //     .then((response) => {
    //       if (typeof window !== "undefined") {
    //         window.localStorage.setItem("userToken", JSON.stringify(response));
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // } else if (diffMin < 1) {
    //   if (inPrivateRoute && typeof window !== "undefined") {
    //     window.localStorage.removeItem("userToken");
    //     window.localStorage.removeItem("userInfo");

    //     window.location.href =
    //       "/auth/check?prevPath=" +
    //       encodeURIComponent(window.location.pathname);
    //   }
    // }
  }
};
