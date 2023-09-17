import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  reminders: [],
};

export const reminderSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createHabitReminderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    getHabitRemindersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.reminders = action.payload;
    },
  },
});

export const getHabitReminders = (habitId) => async (dispatch) => {
  dispatch(reminderSlice.actions.startLoading());
  try {
    const response = await apiService.get(`/reminders/habit/${habitId}`);

    dispatch(reminderSlice.actions.getHabitRemindersSuccess(response.data));
  } catch (error) {
    console.log("Error:", error);
    dispatch(reminderSlice.actions.hasError(error.message));
  }
};

export const createHabitReminder =
  ({ habitId, reminderFrequency, onWeekdays, time, status }) =>
  async (dispatch) => {
    dispatch(reminderSlice.actions.startLoading());
    try {
      const data = {
        reminderFrequency,
        onWeekdays,
        time,
        status,
      };

      const response = await apiService.post(
        `/reminders/habit/${habitId}`,
        data
      );

      dispatch(reminderSlice.actions.createHabitReminderSuccess(response.data));
    } catch (error) {
      console.log("Error:", error);
      dispatch(reminderSlice.actions.hasError(error.message));
    }
  };

const { actions, reducer } = reminderSlice;

export default reducer;
