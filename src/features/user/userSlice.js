import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
  currentUser: null,
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
      state.updatedProfile = action.payload;
    },

    getUserByIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedUser = action.payload;
    },

    getCurrentUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.currentUser = action.payload;
    },

    updateCurrentUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      // when the profile is updated,
      // dispatch UPDATE_PROFILE action in the AuthContext
      state.updatedProfile = action.payload;
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
  ({ userId, name, password, avatarUrl }) =>
  async (dispatch) => {
    dispatch(userSlice.actions.startLoading());
    try {
      const data = {
        name,
        password,
        avatarUrl,
      };

      // if upload a file, not a link
      // => upload to Cloudinary to get the link
      if (avatarUrl instanceof File) {
        const imageUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = imageUrl;
      }

      // put data to update
      const response = await apiService.put(`/users/me`, data);

      // response.data: user's data after updated
      dispatch(userSlice.actions.updateUserProfileSuccess(response.data));
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
    dispatch(userSlice.actions.getCurrentUserSuccess(response.data));
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
