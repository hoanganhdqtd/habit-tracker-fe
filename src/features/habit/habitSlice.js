import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import apiService from "../../app/apiService";
import { HABITS_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  habitsById: {},
  habitDetail: {
    onWeekdays: [],
    reminders: [],
    progress: [],
  },
  currentPageHabits: [],
  totalHabits: 0,
  search: "",
  page: 1,
  totalPages: 0,
  // remindersByHabitId: [],
  // reminderById: {},
};

export const getHabits = createAsyncThunk(
  "habits/getHabits",
  async ({ page, search, date }, { rejectWithValue, getState }) => {
    try {
      let url = `/habits?page=${page}&limit=${HABITS_PER_PAGE}`;
      if (search) url += `&search=${search}`;
      if (date) {
        url += `&date=${date}`;
      }
      console.log("search:", search);
      console.log("date:", date);
      const response = await apiService.get(url);
      console.log("response:", response);
      // console.log("getState:", getState());

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getHabitsByUserId = createAsyncThunk(
  "habits/getHabitsByUserId",
  async ({ page, search, userId }, { rejectWithValue }) => {
    try {
      let url = `/habits/user/${userId}?page=${page}&limit=${HABITS_PER_PAGE}`;
      if (search) url += `&search=${search}`;
      const response = await apiService.get(url);

      // console.log("response:", response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getHabitById = createAsyncThunk(
  "habits/getHabitById",
  async (id, { rejectWithValue }) => {
    try {
      let url = `/habits/${id}`;
      const response = await apiService.get(url);

      console.log("getHabitById response:", response);

      if (!response.data) return rejectWithValue({ message: "No data" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addHabit = createAsyncThunk(
  "habits/addHabit",
  async (
    {
      name,
      description,
      goal,
      startDate,
      progress,
      duration,
      onWeekdays,
      reminders,
    },
    { rejectWithValue }
  ) => {
    try {
      let url = "/habits";
      const response = await apiService.post(url, {
        name,
        description,
        goal,
        startDate,
        progress,
        duration,
        onWeekdays,
        reminders,
      });
      // console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editHabit = createAsyncThunk(
  "habits/editHabit",
  async (
    {
      name,
      description,
      goal,
      startDate,
      progress,
      duration,
      onWeekdays,
      reminders,
      habitId,
    },
    { rejectWithValue }
  ) => {
    try {
      console.log("name:", name);
      let url = `/habits/${habitId}`;
      const response = await apiService.put(url, {
        name,
        description,
        goal,
        startDate,
        progress,
        duration,
        onWeekdays,
        reminders,
      });
      // return;
      console.log("response.data:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteHabit = createAsyncThunk(
  "habits/deleteHabit",
  async ({ habitId }, { rejectWithValue, dispatch }) => {
    try {
      let url = `/habits/${habitId}`;
      await apiService.delete(url);
      dispatch(getHabitById(habitId));
      return habitId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getHabitReminders = createAsyncThunk(
  "habits/getHabitReminders",
  async ({ habitId }, { rejectWithValue }) => {
    try {
      let url = `/reminders/habit/${habitId}`;
      const response = await apiService.get(url);
      console.log("response.data:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addHabitReminder = createAsyncThunk(
  "habits/addHabitReminder",
  async (
    { habitId, reminderFrequency, onWeekdays, time, status, startDate },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await apiService.post(`/reminders/habit/${habitId}`, {
        reminderFrequency,
        onWeekdays,
        startDate,
        time,
        status,
      });
      console.log("response.data:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    changePage: (state, action) => {
      if (action.payload) {
        console.log("changePage", action.payload);
        state.page = action.payload;
      } else {
        state.page++;
      }
    },

    searchQuery: (state, action) => {
      state.search = action.payload;
    },
  },

  extraReducers: {
    [getHabits.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },

    [getHabitById.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    [addHabit.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteHabit.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [editHabit.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [addHabitReminder.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getHabitReminders.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    [getHabits.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.totalHabits = action.payload.count;
      state.totalPages = action.payload.totalPages;
      const { search } = state;
      console.log("action.payload:", action.payload);
      // if (search && state.page === 1) {
      //   state.currentPageHabits = action.payload.habits;
      // } else {
      //   state.currentPageHabits = [
      //     ...state.currentPageHabits,
      //     ...action.payload.habits,
      //   ];
      // }
      state.currentPageHabits = [];
      action.payload.habits.forEach((habit) => {
        state.habitsById[habit._id] = habit;
        if (!state.currentPageHabits.includes(habit._id))
          state.currentPageHabits.push(habit._id);
      });
    },
    [getHabitsByUserId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.totalHabits = action.payload.count;
      // state.totalPages = Math.ceil(state.totalHabits / HABITS_PER_PAGE);
      state.totalPages = action.payload.totalPages;
      const { search } = state;
      // if (search && state.page === 1) {
      //   state.currentPageHabits = action.payload.habits;
      // } else {
      //   state.currentPageHabits = [
      //     ...state.currentPageHabits,
      //     ...action.payload.habits,
      //   ];
      // }

      state.currentPageHabits = [];
      action.payload.habits.forEach((habit) => {
        state.habitsById[habit._id] = habit;
        if (!state.currentPageHabits.includes(habit._id))
          state.currentPageHabits.push(habit._id);
      });
    },
    [getHabitById.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.habit = action.payload;
      console.log("getHabitById action.payload:", action.payload);
      state.habitDetail = action.payload;
    },
    [addHabit.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("action.payload:", action.payload);
      const newHabit = action.payload;
      if (
        state.currentPageHabits.length > 0 &&
        state.currentPageHabits.length % HABITS_PER_PAGE === 0
      ) {
        state.currentPageHabits.pop();
      }
      // console.log("newHabit._id:", newHabit._id);
      state.habitsById[newHabit._id] = newHabit;
      state.currentPageHabits.unshift(newHabit._id);
      state.totalHabits += 1;
    },
    [deleteHabit.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("action.payload:", action.payload);
      state.currentPageHabits = state.currentPageHabits.filter(
        (habitId) => habitId !== action.payload
      );
      // delete state.habitsById[action.payload];
      state.totalHabits -= 1;
      state.totalPages = Math.ceil(state.totalHabits / HABITS_PER_PAGE);
    },
    [editHabit.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("action.payload:", action.payload);

      const {
        name,
        description,
        goal,
        startDate,
        progress,
        duration,
        onWeekdays,
        reminders,
        _id: habitId,
      } = action.payload;

      if (name) {
        state.habitsById[habitId].name = name;
      }
      if (description) {
        state.habitsById[habitId].description = description;
      }
      if (goal) {
        state.habitsById[habitId].goal = goal;
      }
      if (startDate) {
        state.habitsById[habitId].startDate = startDate;
      }
      if (duration) {
        state.habitsById[habitId].duration = duration;
      }
      if (onWeekdays) {
        state.habitsById[habitId].onWeekdays = onWeekdays;
      }
    },
    [addHabitReminder.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("addHabitReminder action.payload:", action.payload);

      // state.remindersByHabitId[]

      // state.remindersByHabitId = action.payload.reminders;
      state.habitDetail.reminders = action.payload.reminders;
    },
    [getHabitReminders.fulfilled]: (state, action) => {
      // remindersByHabitId[]
    },

    [getHabits.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        // state.errorMessage = action.payload.message;
        state.error = action.payload;
      } else {
        // state.errorMessage = action.error.message;
        state.error = action.error;
      }
    },
    [getHabitsByUserId.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [getHabitById.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },

    [addHabit.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [deleteHabit.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [editHabit.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [getHabitReminders.rejected]: (state, action) => {},
  },
});

const { actions, reducer } = habitSlice;
export const { changePage, searchQuery } = actions;
export default reducer;
