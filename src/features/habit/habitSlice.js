import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import apiService from "../../app/apiService";
import { HABITS_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  habitsById: {},
  habitDetail: {
    onWeekdays: [],
    reminders: [],
    progressList: [],
    tags: [],
  },
  currentPageHabits: [],
  totalHabits: 0,
  search: "",
  page: 1,
  totalPages: 0,
  currentReminder: {},
  currentProgress: {},
  date: "",
  searchTag: "",
};

export const getHabits = createAsyncThunk(
  "habits/getHabits",
  async ({ page, search, date, tag, sort }, { rejectWithValue, getState }) => {
    try {
      let url = `/habits?page=${page}&limit=${HABITS_PER_PAGE}`;
      if (search) url += `&search=${search}`;
      if (date) {
        url += `&date=${date}`;
      }
      if (tag) {
        url += `&tag=${tag}`;
      }

      if (sort) {
        url += `&sort=${sort}`;
      }

      const response = await apiService.get(url);
      return response.data;
    } catch (error) {
      toast.error(error.message);
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

      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const getHabitById = createAsyncThunk(
  "habits/getHabitById",
  async (id, { rejectWithValue, getState }) => {
    try {
      let url = `/habits/${id}`;
      const response = await apiService.get(url);
      if (!response.data) return rejectWithValue({ message: "No data" });
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const addHabit = createAsyncThunk(
  "habits/addHabit",
  async (
    { name, description, goal, startDate, duration, onWeekdays },
    { rejectWithValue }
  ) => {
    try {
      let url = "/habits";
      const response = await apiService.post(url, {
        name,
        description,
        goal,
        startDate,
        duration,
        onWeekdays,
      });

      toast.success("Habit added successfully");
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const editHabit = createAsyncThunk(
  "habits/editHabit",
  async (
    { name, description, goal, startDate, duration, onWeekdays, habitId },
    { rejectWithValue }
  ) => {
    try {
      let url = `/habits/${habitId}`;
      const response = await apiService.put(url, {
        name,
        description,
        goal,
        startDate,
        duration,
        onWeekdays,
      });

      toast.success("Edit habit successfully");
      return response.data;
    } catch (error) {
      toast.error(error.message);
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
      toast.success("Delete habit successfully");
      return habitId;
    } catch (error) {
      toast.error(error.message);
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
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const addHabitReminder = createAsyncThunk(
  "habits/addHabitReminder",
  async (
    { habitId, onWeekdays, time, status, startDate },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await apiService.post(`/reminders/habit/${habitId}`, {
        onWeekdays,
        startDate,
        time,
        status,
      });
      toast.success("Add reminder successfully");
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const getHabitSingleReminder = createAsyncThunk(
  "habits/getHabitSingleReminder",
  async (reminderId, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiService.get(`/reminders/${reminderId}`);
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const editHabitSingleReminder = createAsyncThunk(
  "habits/editHabitSingleReminder",
  async (
    { reminderId, reminderFrequency, onWeekdays, time, status, startDate },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await apiService.put(`/reminders/${reminderId}`, {
        reminderFrequency,
        onWeekdays,
        time,
        status,
        startDate,
      });
      toast.success("Edit reminder successfully");
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const deleteHabitSingleReminder = createAsyncThunk(
  "habits/deleteHabitSingleReminder",
  async ({ habitId, reminderId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiService.delete(
        `/reminders/${reminderId}/habit/${habitId}`
      );
      toast.success("Delete reminder successfully");
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const addHabitProgress = createAsyncThunk(
  "habits/addHabitProgress",
  async (habitId, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiService.post(`/progress/habit/${habitId}`, {
        status: "incomplete",
        date: dayjs(new Date())
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0),
        habit: habitId,
      });
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

// GET progress/habit/:habitId?date=${date}
export const getHabitSingleProgress = createAsyncThunk(
  "habits/getHabitSingleProgress",
  async ({ habitId, date }, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiService.get(
        `progress/habit/${habitId}?date=${date}`
      );
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const getSingleHabitProgressList = createAsyncThunk(
  "habits/getSingleHabitProgressList",
  async (habitId, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiService.get(`/habits/${habitId}`);
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const addHabitTag = createAsyncThunk(
  "habits/addHabitTag",
  async ({ habitId, title }, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiService.post(`tags/habit/${habitId}`, {
        title,
      });
      toast.success("Add tag successfully");
      return response.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const getTagsByHabitId = createAsyncThunk(
  "habits/getTagsByHabitId",
  async (habitId, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiService.get(`tags/habit/${habitId}`);
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
        state.page = action.payload;
      } else {
        state.page++;
      }
    },

    searchQuery: (state, action) => {
      state.search = action.payload;
    },

    deleteTagFromSearchTag: (state, action) => {
      state.searchTag = state.searchTag
        .replace(action.payload.title, "")
        .trim();
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
    [editHabitSingleReminder.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteHabitSingleReminder.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [addHabitProgress.pending]: (state) => {
      state.error = null;
    },
    [getHabitSingleProgress.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getSingleHabitProgressList.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [addHabitTag.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getTagsByHabitId.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    [getHabits.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.totalHabits = action.payload.count;
      state.totalPages = action.payload.totalPages;
      state.date = action.payload.date;
      state.searchTag = action.payload.searchTag;
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
      state.totalPages = action.payload.totalPages;
      const { search } = state;
      state.currentPageHabits = [];
      action.payload.habits.forEach((habit) => {
        state.habitsById[habit._id] = habit;
        if (!state.currentPageHabits.includes(habit._id))
          state.currentPageHabits.push(habit._id);
      });
    },
    [getHabitById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.habitDetail = action.payload;
    },
    [addHabit.fulfilled]: (state, action) => {
      state.isLoading = false;
      const newHabit = action.payload;
      if (
        state.currentPageHabits.length > 0 &&
        state.currentPageHabits.length % HABITS_PER_PAGE === 0
      ) {
        state.currentPageHabits.pop();
      }
      state.habitsById[newHabit._id] = newHabit;
      state.currentPageHabits.unshift(newHabit._id);
      state.totalHabits += 1;
    },
    [deleteHabit.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.currentPageHabits = state.currentPageHabits.filter(
        (habitId) => habitId !== action.payload
      );
      state.totalHabits -= 1;
      state.totalPages = Math.ceil(state.totalHabits / HABITS_PER_PAGE);
    },
    [editHabit.fulfilled]: (state, action) => {
      state.isLoading = false;
      const {
        name,
        description,
        goal,
        startDate,
        duration,
        onWeekdays,
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
      state.habitDetail.reminders = action.payload.reminders;
    },
    [getHabitReminders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.habitDetail.reminders = action.payload.reminders;
    },
    [editHabitSingleReminder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentReminder = action.payload;
    },
    [getHabitSingleReminder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentReminder = action.payload;
    },
    [deleteHabitSingleReminder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.habitDetail.reminders = state.habitDetail.reminders.filter(
        (reminder) => reminder._id !== action.payload._id
      );
    },
    [addHabitProgress.fulfilled]: (state, action) => {
      state.habitDetail.progressList.push(action.payload.progress);
      state.currentProgress = action.payload.progress;
    },
    [getHabitSingleProgress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentProgress = action.payload;
    },
    [getSingleHabitProgressList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.habitDetail.progressList = action.payload.progressList;
      state.habitDetail = action.payload;
    },
    [addHabitTag.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.habitDetail.tags.push(action.payload);
    },
    [getTagsByHabitId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.habitDetail.tags = action.payload;
    },

    [getHabits.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
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
    [addHabitReminder.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [getHabitReminders.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [editHabitSingleReminder.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [deleteHabitSingleReminder.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [addHabitProgress.rejected]: (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [getHabitSingleProgress.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [getSingleHabitProgressList.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [addHabitTag.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [getTagsByHabitId.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

const { actions, reducer } = habitSlice;
export const { changePage, searchQuery } = actions;
export default reducer;
