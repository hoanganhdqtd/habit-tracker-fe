import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: {},
  selectedUser: {},
  currentUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.currentUser = action.payload;
    },

    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      // when the profile is updated,
      // dispatch UPDATE_PROFILE action in the AuthContext
      // console("action.payload:", action.payload);
      state.updatedProfile = action.payload;
    },

    getUserByIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedUser = action.payload;
    },

    getCurrentUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.currentUser = action.payload;
    },

    updateCurrentUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      // when the profile is updated,
      // dispatch UPDATE_PROFILE action in the AuthContext
      // console.log("action.payload:", action.payload);
      state.updatedProfile = action.payload;
      state.currentUser = action.payload;
    },
  },
});

export const createUser =
  ({ name, email, password }) =>
  async (dispatch) => {
    dispatch(userSlice.actions.startLoading());
    try {
      const data = {
        name,
        email,
        password,
      };

      const response = await apiService.post(`/users`, data);

      dispatch(userSlice.actions.createUserSuccess(response.data));
      toast.success("Create user successfully");
    } catch (error) {
      dispatch(userSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateCurrentUserProfile =
  ({ name, password, avatarUrl }) =>
  async (dispatch) => {
    dispatch(userSlice.actions.startLoading());
    try {
      // const data = {
      //   name,
      //   password,
      //   avatarUrl,
      // };
      const data = {};
      if (name) {
        data.name = name;
      }
      if (password) {
        data.password = password;
      }
      if (avatarUrl) {
        data.avatarUrl = avatarUrl;
      }

      // if upload a file, not a link
      // => upload to Cloudinary to get the link
      if (avatarUrl instanceof File) {
        const imageUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = imageUrl;
      }

      // put data to update
      const response = await apiService.put(`/users/me`, data);

      // response.data: user's data after updated
      dispatch(
        userSlice.actions.updateCurrentUserProfileSuccess(response.data)
      );
      toast.success("Update Profile successfully");
    } catch (error) {
      dispatch(userSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getCurrentUserProfile = () => async (dispatch) => {
  dispatch(userSlice.actions.startLoading());
  try {
    const response = await apiService.get("/users/me");
    dispatch(userSlice.actions.getCurrentUserProfileSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(userSlice.actions.hasError(error));
  }
};

export const getUserById = (id) => async (dispatch) => {
  dispatch(userSlice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/${id}`);
    dispatch(userSlice.actions.getUserByIdSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.hasError(error));
    toast.error(error.message);
  }
};

const { actions, reducer } = userSlice;

export default reducer;
