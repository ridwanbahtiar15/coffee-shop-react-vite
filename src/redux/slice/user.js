import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { login } from "../../utils/https/auth";

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
          isPending: false,
          isFulfilled: true,
          token: payload.token,
          userInfo: payload.userInfo,
        };
      });
  },
});

export const userAction = {
  ...userSlice.actions,
  loginThunk,
};

export default userSlice.reducer;
