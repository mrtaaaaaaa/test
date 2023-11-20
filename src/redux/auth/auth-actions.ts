import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
interface PropsTypes {
  phone_number: string | number;
  g_recaptcha_response: any;
  captcha_id: any;
}

export const sendCode = createAsyncThunk(
  "auth/sendCode",
  async ({ phone_number }: PropsTypes, { rejectWithValue }) => {
    const postData = new FormData();
    postData.append("phone_number", phone_number);
    try {
      const { data } = await httpService.post(
        `${AUTH_URL}/Auth/RequestLogin`,
        postData
      );
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  }
);

//if user was logged in
export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await httpService.post(
        `${AUTH_URL}/Auth/Login`,
        loginData,
        config
      );
      // store user's token in local storage

      let savedData = {
        roles: data.roles,
        phone_number: data.phone_number,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        user_name: `${data.user.first_name} ${data.user.last_name}`,
      };

      localStorage.setItem("userInfo", JSON.stringify(savedData));
      localStorage.setItem("userToken", JSON.stringify(data.Authorization));
      localStorage.removeItem("phone_number");

      return data;
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(true);
      } else {
        return rejectWithValue(true);
      }
    }
  }
);

export const loginPass = createAsyncThunk(
  "auth/loginPass",
  async (loginData, { rejectWithValue }) => {
    try {
      const postData = new FormData();
      postData.append("phone_number", loginData.phone_number);
      postData.append("password", loginData.password);
      const { data } = await httpService.post(
        `${AUTH_URL}/Auth/LoginPass`,
        postData
      );

      // store user's token in local storage
      let savedData = {
        roles: data.roles,
        phone_number: data.phone_number,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        user_name: `${data.user.first_name} ${data.user.last_name}`,
      };

      localStorage.setItem("userInfo", JSON.stringify(savedData));
      localStorage.setItem("userToken", JSON.stringify(data.Authorization));
      // localStorage.removeItem("phone_number");

      return data;
    } catch (error: any) {
      // return custom error message from API if any
      return rejectWithValue(error.response);
    }
  }
);

// if user needs register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (registerData: any, { rejectWithValue }: any) => {
    try {
      const postData = new FormData();

      postData.append("phone_number", registerData.phone_number);
      postData.append("first_name", registerData.first_name);
      postData.append("last_name", registerData.last_name);
      postData.append("password", registerData.password);
      postData.append("verify_code", registerData.verify_code);

      const { data } = await httpService.post(
        `${AUTH_URL}/Auth/Register`,
        postData
      );

      // store user's token in local storage
      let savedData = {
        roles: data.roles,
        phone_number: data.phone_number,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        user_name: `${data.user.first_name} ${data.user.last_name}`,
      };

      localStorage.setItem("userInfo", JSON.stringify(savedData));
      localStorage.setItem("userToken", JSON.stringify(data.Authorization));
      // localStorage.removeItem("phone_number");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

// Forgot password
export const forgotPass = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }: any) => {
    let postData = new FormData();
    postData.append("phone_number", data.phone_number);
    postData.append("password", data.password);
    postData.append("verify_code", +data.verify_code);

    try {
      const { data } = await httpService.post(
        `${AUTH_URL}/Auth/Login`,
        postData
      );

      // store user's token in local storage
      let savedData = {
        roles: data.roles,
        phone_number: data.phone_number,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        user_name: `${data.user.first_name} ${data.user.last_name}`,
      };

      localStorage.setItem("userInfo", JSON.stringify(savedData));
      localStorage.setItem("userToken", JSON.stringify(data.Authorization));
      // localStorage.removeItem("phone_number");

      return data;
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(true);
      } else {
        return rejectWithValue(true);
      }
    }
  }
);
