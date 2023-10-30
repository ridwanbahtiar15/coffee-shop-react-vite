import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { login, Logout } from "../../utils/https/auth";

const initialState = {
  isUserAvailable: false,
  token: null,
  userInfo: null,
  err: {
    login: null,
    register: null,
    logout: null,
  },
  isPending: false, // bisa kita gunakan untuk membuat animasi loading
  isRejected: false, // bisa kita gunakan untuk memunculkan modal/pesan error
  isFulfilled: false, // bisa kita gunakan untuk melakukan aksi keberhasilan
};

const loginThunk = createAsyncThunk(
  "user/login",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await login(body);
      return { token: data.data.token, userInfo: data.data.userInfo };
    } catch (err) {
      const errObj = {
        status: err.response.status,
        message: err.response.data.msg,
      };
      return rejectWithValue(errObj);
      // return err;
    }
  }
);

const logoutThunk = createAsyncThunk(
  "user/logout",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Logout(body);
      return { message: data };
      // return { token: data.data.token, userInfo: data.data.userInfo };
    } catch (err) {
      console.log(err);
      const errObj = {
        status: err.response.status,
        message: err.response.data.msg,
      };
      return rejectWithValue(errObj);
      // return err;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}, // tidak boleh mengandung async
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (prevState) => {
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false,
          err: {
            ...prevState.err,
            login: null,
          },
        };
      })
      .addCase(loginThunk.rejected, (prevState, { payload }) => {
        return {
          ...prevState,
          isPending: false,
          isRejected: true,
          err: {
            ...prevState.err,
            login: payload,
          },
        };
      })
      .addCase(loginThunk.fulfilled, (prevState, { payload }) => {
        return {
          ...prevState,
          isUserAvailable: true,
          isPending: false,
          isFulfilled: true,
          token: payload.token,
          userInfo: payload.userInfo,
        };
      })
      .addCase(logoutThunk.rejected, (prevState, { payload }) => {
        return {
          ...prevState,
          isUserAvailable: true,
          isPending: false,
          isRejected: true,
          isFulfilled: false,
          err: {
            ...prevState.err,
            logout: payload,
          },
        };
      })
      .addCase(logoutThunk.fulfilled, (prevState) => {
        return {
          ...prevState,
          isUserAvailable: false,
          isPending: false,
          isRejected: false,
          isFulfilled: true,
          token: null,
          userInfo: null,
        };
      });
  },
});

export const userAction = {
  ...userSlice.actions,
  loginThunk,
  logoutThunk,
};

export default userSlice.reducer;
