import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addMangaDettaglioAsync = createAsyncThunk(
  "manga/addMangaDettaglioAsync",
  async (payload) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/detailsManga/manga/${payload.id}/details`,
        {
          id: 0,
          volumes: payload.volumes,
          date: payload.date,
          price: payload.price,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Errore nella chiamata POST:", error);
      throw error;
    }
  }
);

const mangaDettaglioSlice = createSlice({
  name: "mangaDettaglio",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMangaDettaglioAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMangaDettaglioAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addMangaDettaglioAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mangaDettaglioSlice.reducer;
