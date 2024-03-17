import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { habitSlice } from "../habit/habitSlice";

const initialState = {
  isLoading: false,
  error: null,
  tags: null,
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createTagSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    getTagsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.tags = action.payload;
    },

    updateSingleTagSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.tags = action.payload;
    },

    deleteSingleTagSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.tags = state.tags.filter((tags) => tags._id !== action.payload._id);
    },
  },
});

export const createTag =
  ({ title }) =>
  async (dispatch) => {
    dispatch(tagSlice.actions.startLoading());
    try {
      const data = {
        title,
      };

      const response = await apiService.post(`/tags`, data);

      dispatch(tagSlice.actions.createTagSuccess(response.data));
      dispatch(getTags());
      toast.success("Create new tag successfully");
    } catch (error) {
      console.log("Error:", error);
      dispatch(tagSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getTags = () => async (dispatch) => {
  dispatch(tagSlice.actions.startLoading());
  try {
    const response = await apiService.get(`/tags`);

    dispatch(tagSlice.actions.getTagsSuccess(response.data));
  } catch (error) {
    console.log("Error:", error);
    dispatch(tagSlice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateSingleTag =
  ({ tagId, title }) =>
  async (dispatch) => {
    dispatch(tagSlice.actions.startLoading());
    try {
      const data = {
        title,
      };
      const response = await apiService.put(`/tags/${tagId}`, data);

      dispatch(tagSlice.actions.updateSingleTagSuccess(response.data));
      toast.success("Update tag successfully");
    } catch (error) {
      console.log("Error:", error);
      dispatch(tagSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteSingleTag = (tagId) => async (dispatch) => {
  dispatch(tagSlice.actions.startLoading());
  try {
    const response = await apiService.delete(`/tags/${tagId}`);
    dispatch(tagSlice.actions.deleteSingleTagSuccess(response.data));
    dispatch(habitSlice.actions.deleteTagFromSearchTag(response.data));
    toast.success("Delete tag successfully");
  } catch (error) {
    console.log("Error:", error);
    dispatch(tagSlice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

const { actions, reducer } = tagSlice;

export default reducer;
