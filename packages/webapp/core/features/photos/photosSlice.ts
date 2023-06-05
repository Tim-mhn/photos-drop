import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Image, Images } from "@shared";
import { fetchAllPhotos } from "./use-cases/retrieve-all-photos.use-case";
import { uploadPhotos } from "./use-cases/upload-photos.use-case";

const initialState: { photos: Images; uploading: boolean } = {
  photos: [],
  uploading: false,
};
export const photosAdapter = createEntityAdapter<Image>();

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    addPhoto: (state, action: PayloadAction<Image>) => {
      state.photos.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPhotos.fulfilled, (state, action) => {
        state.photos = action.payload.photos;
      })
      .addCase(uploadPhotos.pending, (state) => {
        state.uploading = true;
      })
      .addCase(uploadPhotos.fulfilled, (state) => {
        state.uploading = false;
      });
  },
});

export const { addPhoto } = photosSlice.actions;

export const photosReducer = photosSlice.reducer;
