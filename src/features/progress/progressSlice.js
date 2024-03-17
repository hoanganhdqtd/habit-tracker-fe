import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import dayjs from "dayjs";

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

    addHabitProgressSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.progressList.push(action.payload.progress);
      state.progress = action.payload.progress;
    },

    updateSingleProgressSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.progress = action.payload;
    },
  },
});

export const addHabitProgress = (habitId) => async (dispatch) => {
  dispatch(progressSlice.actions.startLoading());
  try {
    const response = await apiService.post(`/progress/habit/${habitId}`, {
      status: "incomplete",
      date: dayjs(new Date()).set("hour", 0).set("minute", 0).set("second", 0),
      habit: habitId,
    });
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
      dispatch(
        progressSlice.actions.updateSingleProgressSuccess(response.data)
      );
      const habitName = response.data.name;
      toast.success(`Update ${habitName} progress successfully`);
    } catch (error) {
      console.log("Error:", error);
      dispatch(progressSlice.actions.hasError(error));
      toast.error(error.message);
    }
  };

const { actions, reducer } = progressSlice;

export default reducer;
