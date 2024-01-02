import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import dayjs from "dayjs";
import { getHabits } from "../habit/habitSlice";

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

    getSingleHabitProgressListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.progressList = action.payload.progress;
    },

    addHabitProgressSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.progressList.push(action.payload.progress);
      state.progress = action.payload.progress;
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

export const getSingleHabitProgressList =
  ({ habitId, date }) =>
  async (dispatch) => {
    dispatch(progressSlice.actions.startLoading());
    let url = `progress/habit/${habitId}`;
    if (date) {
      url += `?date=${date}`;
    }

    try {
      // const response = await apiService.get(`progress/habit/${habitId}`);
      const response = await apiService.get(url);
      console.log("getSingleHabitProgressList response:", response);
      dispatch(
        progressSlice.actions.getSingleHabitProgressListSuccess(response.data)
      );
    } catch (error) {
      console.log("Error:", error);
      dispatch(progressSlice.actions.hasError(error));
    }
  };

export const addHabitProgress = (habitId) => async (dispatch) => {
  dispatch(progressSlice.actions.startLoading());
  try {
    const response = await apiService.post(`/progress/habit/${habitId}`, {
      status: "incomplete",
      date: dayjs(new Date()).set("hour", 0).set("minute", 0).set("second", 0),
      habit: habitId,
    });
    // console.log("addHabitProgress response:", response);
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
      let response = await apiService.put(`/progress/habit/${habitId}`, {
        status,
        date,
      });
      // console.log("updateSingleProgress response:", response);
      dispatch(
        progressSlice.actions.updateSingleProgressSuccess(response.data)
      );
      dispatch(getHabits({ date }));
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
