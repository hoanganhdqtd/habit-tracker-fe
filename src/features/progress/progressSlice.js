import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  progress: [],
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

      state.progress = action.payload;
    },

    updateHabitProgressListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

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

export const updateHabitProgressList = (habitId) => async (dispatch) => {
  dispatch(progressSlice.actions.startLoading());
};

const { actions, reducer } = progressSlice;

export default reducer;
