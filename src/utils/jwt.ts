import { checkExistWindow } from "./check-exist-window";

export const parseJwt = (token: string | null) => {
  const base64Url = typeof token == "string" ? token?.split(".")[1] : "";

  const base64 = base64Url?.replace(/-/g, "+")?.replace(/_/g, "/");

  const jsonPayload = checkExistWindow()
    ? decodeURIComponent(
        window
          ?.atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      )
    : "";

  return JSON.parse(jsonPayload || "{}");
};

export function isTokenExpired(token: string) {
  if (!token) return true;
  const decodedToken = JSON.parse(atob(token?.split(".")[1]));
  const expirationTime = decodedToken.exp * 1000;
  const currentTime = Date.now();
  return expirationTime < currentTime;
}
