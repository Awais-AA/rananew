import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import auth from '../../services/authService'
import axios, { axiosPrivate } from "../../../axios/axios";

const state = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const registerUser = createAsyncThunk(
  "/register-user",
  async (userData, thunkAPI) => {
    try {
      
      const response = await axios.post("/api/register/", userData);
      
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/login-user",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login/", userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const currentUser = createAsyncThunk(
  "/current-user",
  async (_, thunkAPI) => {
    try {
      
      const response = await axiosPrivate.get("/api/current-user");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "/refresh-token",
  async (_, thunkAPI) => {
    
    try {
      const response = await axios.get("/api/auth/refresh_token/");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editProfileUser = createAsyncThunk(
  "/editProfile-user",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/api/userEditProfile/", userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);

export const editProfileCSP = createAsyncThunk(
  "/editProfile-csp",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/api/cspEditProfile/", userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    reset: (state, action) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        if (state?.user) {
          let { tokens, getUserType, ...others } = state.user;
          tokens = action.payload.accessToken;
          getUserType = action.payload.getUserType;
          state.user = { tokens, getUserType, ...others };

        } else {
           let tokens = action.payload.accessToken;
          let getUserType = action.payload.getUserType;
          state.user = {tokens,getUserType}
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(currentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        if (state.user) {
          let { userEmail, userName, getUserType, ...others } = state?.user;
          userEmail = action.payload.userEmail;
          userName = action.payload.userName;
          getUserType = action.payload.getUserType;
          state.user = { userEmail, userName, getUserType, ...others };
        } else {
          state.user = action.payload;
        }
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        if(state?.user?.tokens){
        let { tokens, ...elements } = state.user;
        tokens = action.payload.accessToken;
        state.user = { tokens, ...elements };}
        else{
            let tokens=action.payload.accessToken
            state.user={tokens:tokens}
        }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(editProfileUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProfileUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(editProfileUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(editProfileCSP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProfileCSP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(editProfileCSP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
