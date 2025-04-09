import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import URL_PORT from "../infoComponents/port";

export const getAnimeAsync = createAsyncThunk(
  "anime/getAnimeAsync",
  async () => {
    const response = await axios.get(`${URL_PORT}/anime/anime`);
    return response.data;
  }
);

export const putAnimeAsync = createAsyncThunk(
  "anime/putAnimeAsync",
  async (payload) => {
    const response = await axios.put(`${URL_PORT}/anime/anime`, {
      id: payload.id,
      title: payload.title,
      completed: payload.completed,
    });
    return response.data;
  }
);

export const deleteAnimeAsync = createAsyncThunk(
  "anime/deleteAnimeAsync",
  async (id) => {
    await axios.delete(`${URL_PORT}/anime/anime/${id}`);
    return id;
  }
);

export const addAnimeAsync = createAsyncThunk(
  "anime/addAnimeAsync",
  async (payload) => {
    const response = await axios.post(`${URL_PORT}/anime/anime`, {
      id: 0,
      title: payload.title,
      completed: payload.completed,
    });
    return response.data;
  }
);

const animeSlice = createSlice({
  name: "anime",
  initialState: {
    selectedAnimeId: null,
    data: [],
    loading: false,
    error: null,
    count: 0,
  },
  reducers: {
    setSelectedAnimeId: (state, action) => {
      state.selectedAnimeId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnimeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnimeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAnimeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAnimeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnimeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.count--;
        state.data = state.data.filter((anime) => anime.id !== action.payload);
      })
      .addCase(deleteAnimeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAnimeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAnimeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.count++;
        state.data.push(action.payload);
      })
      .addCase(addAnimeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(putAnimeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putAnimeAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (anime) => anime.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(putAnimeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedAnimeId } = animeSlice.actions;

export default animeSlice.reducer;
