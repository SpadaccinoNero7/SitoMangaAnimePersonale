import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import URL_PORT from "../infoComponents/port";

export const addMangaDettaglioAsync = createAsyncThunk(
  "manga/addMangaDettaglioAsync",
  async (payload) => {
    const response = await axios.post(
      `${URL_PORT}/detailsManga/detailsManga/${payload.id}/details`,
      {
        id: 0,
        volumes: payload.volumes,
        date: payload.date,
        price: payload.price,
      }
    );
    return response.data;
  }
);

export const putMangaDettaglioAsync = createAsyncThunk(
  "manga/putMangaDettaglioAsync",
  async (payload) => {
    try {
      const response = await axios.put(
        `${URL_PORT}/detailsManga/detailsManga/${payload.id}/details`,
        {
          id: payload.id,
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

export const deleteMangaDettaglioAsync = createAsyncThunk(
  "manga/deleteMangaDettaglioAsync",
  async (id) => {
    await axios.delete(`${URL_PORT}/detailsManga/detailsManga/${id}`);
    return id;
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
      })
      .addCase(putMangaDettaglioAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putMangaDettaglioAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (manga) => manga.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(putMangaDettaglioAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMangaDettaglioAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMangaDettaglioAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMangaDettaglioAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = state.data.filter((manga) => manga.id !== action.payload);
      });
  },
});

export default mangaDettaglioSlice.reducer;
