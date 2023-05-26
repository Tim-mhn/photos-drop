import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Photo, Photos } from "./entities";
import { fetchAllPhotos } from "./use-cases/retrieve-all-photos.use-case";

const initialState: Photos = [];
export const photosAdapter = createEntityAdapter<Photo>();

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    addPhoto: (state, action: PayloadAction<Photo>) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPhotos.fulfilled, (_state, action) => {
      return action.payload.photos;
    });
  },
});

export const { addPhoto } = photosSlice.actions;

export const photosReducer = photosSlice.reducer;
