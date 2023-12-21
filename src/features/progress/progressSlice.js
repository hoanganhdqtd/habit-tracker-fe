import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  progressList: [],
  progress: {},
};

export const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getHabitProgressListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.progressList = action.payload;
    },

    addHabitProgressSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.progress = action.payload;
    },

    updateSingleProgressSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      console.log("updateSingleProgress action.payload:", action.payload);

      state.progress = action.payload;
    },

    getSingleProgressSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      console.log("getSingleProgressSuccess action.payload:", action.payload);

      state.progress = action.payload;
    },
  },
});

export const getHabitProgressList = (habitId) => async (dispatch) => {
  dispatch(progressSlice.actions.startLoading());

  try {
    const response = await apiService.get(`/habit/${habitId}`);
    dispatch(progressSlice.actions.getHabitProgressListSuccess(response.data));
  } catch (error) {
    console.log("Error:", error);
    dispatch(progressSlice.actions.hasError(error));
  }
};

export const addHabitProgress = (habitId) => async (dispatch) => {
  dispatch(progressSlice.actions.startLoading());
  try {
    const response = await apiService.post(`/progress/habit/${habitId}`, {});
    console.log("addHabitProgress response:", response);
    dispatch(progressSlice.actions.addHabitProgressSuccess(response.data));
  } catch (error) {
    console.log("Error:", error);
    dispatch(progressSlice.actions.hasError(error));
  }
};

export const updateSingleProgress =
  ({ habitId, date, status }) =>
  async (dispatch) => {
    dispatch(progressSlice.actions.startLoading());
    try {
      const response = await apiService.put(`/progress/habit/${habitId}`, {
        status,
        date,
      });
      console.log("updateSingleProgress response:", response);
      dispatch(
        progressSlice.actions.updateSingleProgressSuccess(response.data)
      );
    } catch (error) {
      console.log("Error:", error);
      dispatch(progressSlice.actions.hasError(error));
    }
  };

export const getSingleProgress = (progressId) => async (dispatch) => {
  dispatch(progressSlice.actions.startLoading());
  try {
    const response = await apiService.get(`/progress/${progressId}`);
    console.log("getSingleProgress response:", response);
    dispatch(progressSlice.actions.getSingleProgressSuccess(response.data));
  } catch (error) {
    console.log("Error:", error);
    dispatch(progressSlice.actions.hasError(error));
  }
};

const { actions, reducer } = progressSlice;

export default reducer;
