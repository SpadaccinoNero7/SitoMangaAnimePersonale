import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAnimeAsync = createAsyncThunk(
  "anime/getAnimeAsync",
  async () => {
    const response = await axios.get("http://localhost:8080/anime/anime");
    return response.data;
  }
);

export const deleteAnimeAsync = createAsyncThunk(
  "anime/deleteAnimeAsync",
  async (id) => {
    await axios.delete(`http://localhost:8080/anime/anime/${id}`);
    return id;
  }
);

export const addAnimeAsync = createAsyncThunk(
  "anime/addAnimeAsync",
  async (payload) => {
    const response = await axios.post("http://localhost:8080/anime/anime", {
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
    data: [],
    loading: false,
    error: null,
    count: 0,
  },
  reducers: {},
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
        console.log("cancellazione in corso");
      })
      .addCase(deleteAnimeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.count--;
        state.data = state.data.filter((anime) => anime.id !== action.payload);
        console.log("cancellazione effettuata correttamente");
      })
      .addCase(deleteAnimeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAnimeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("aggiunta in corso");
      })
      .addCase(addAnimeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.count++;
        state.data.push(action.payload);
        console.log("aggiunta effettuata correttamente");
      })
      .addCase(addAnimeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default animeSlice.reducer;
