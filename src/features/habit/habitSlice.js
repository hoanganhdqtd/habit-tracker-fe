import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import apiService from "../../app/apiService";
import { HABITS_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  habitById: {},
  habitDetail: {},
  currentPageHabits: [],
  totalHabits: 0,
  search: "",
  page: 1,
  totalPages: 0,
};

export const getHabits = createAsyncThunk(
  "habits/getHabits",
  async ({ page, search, date }, { rejectWithValue }) => {
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

      // console.log("response:", response);

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
      await apiService.post(url, {
        name,
        description,
        goal,
        startDate,
        progress,
        duration,
        onWeekdays,
        reminders,
      });
      return;
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
      let url = `/habits/${habitId}`;
      await apiService.put(url, {
        name,
        description,
        goal,
        startDate,
        progress,
        duration,
        onWeekdays,
        reminders,
      });
      return;
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
      return;
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
      state.errorMessage = "";
    },

    [getHabitById.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
    },

    [addHabit.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [deleteHabit.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [editHabit.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
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
        state.habitById[habit._id] = habit;
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
        state.habitById[habit._id] = habit;
        if (!state.currentPageHabits.includes(habit._id))
          state.currentPageHabits.push(habit._id);
      });
    },
    [getHabitById.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.habit = action.payload;
      state.habitDetail = action.payload;
    },
    [addHabit.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteHabit.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteHabit.fulfilled]: (state) => {
      state.isLoading = true;
    },
    [getHabits.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [getHabitsByUserId.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [getHabitById.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },

    [addHabit.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [deleteHabit.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [editHabit.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
  },
});

const { actions, reducer } = habitSlice;
export const { changePage, searchQuery } = actions;
export default reducer;
