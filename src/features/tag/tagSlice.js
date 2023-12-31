import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  tags: [],
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
    } catch (error) {
      console.log("Error:", error);
      dispatch(tagSlice.actions.hasError(error.message));
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
    } catch (error) {
      console.log("Error:", error);
      dispatch(tagSlice.actions.hasError(error.message));
    }
  };

export const deleteSingleTag = (tagId) => async (dispatch) => {
  dispatch(tagSlice.actions.startLoading());
  try {
    const response = await apiService.delete(`/tags/${tagId}`);

    dispatch(tagSlice.actions.deleteSingleTagSuccess(response.data));
  } catch (error) {
    console.log("Error:", error);
    dispatch(tagSlice.actions.hasError(error.message));
  }
};

const { actions, reducer } = tagSlice;

export default reducer;
