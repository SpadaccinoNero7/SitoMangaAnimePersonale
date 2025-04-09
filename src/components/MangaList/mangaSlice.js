import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import URL_PORT from "../infoComponents/port";

export const getMangaAsync = createAsyncThunk(
  "manga/getMangaAsync",
  async () => {
    const response = await axios.get(`${URL_PORT}/manga/manga`);
    return response.data;
  }
);

export const putMangaAsync = createAsyncThunk(
  "manga/putMangaAsync",
  async (payload) => {
    const response = await axios.put(`${URL_PORT}/manga/manga`, {
      id: payload.id,
      title: payload.title,
      author: payload.author,
      completed: payload.completed,
    });
    return response.data;
  }
);

export const deleteMangaAsync = createAsyncThunk(
  "manga/deleteMangaAsync",
  async (id) => {
    await axios.delete(`${URL_PORT}/manga/manga/${id}`);
    return id;
  }
);

export const addMangaAsync = createAsyncThunk(
  "manga/addMangaAsync",
  async (payload) => {
    const response = await axios.post(`${URL_PORT}/manga/manga`, {
      id: 0,
      title: payload.title,
      author: payload.author,
      completed: payload.completed,
    });
    return response.data;
  }
);

const mangaSlice = createSlice({
  name: "manga",
  initialState: {
    data: [],
    loading: false,
    error: null,
    count: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMangaAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMangaAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getMangaAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMangaAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMangaAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.count--;
        state.data = state.data.filter((manga) => manga.id !== action.payload);
      })
      .addCase(deleteMangaAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMangaAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMangaAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.count++;
        state.data.push(action.payload);
      })
      .addCase(addMangaAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(putMangaAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putMangaAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (manga) => manga.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(putMangaAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mangaSlice.reducer;
