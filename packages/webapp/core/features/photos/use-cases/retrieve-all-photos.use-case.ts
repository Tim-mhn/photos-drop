import { createAsyncThunk } from "@reduxjs/toolkit";
import { Photos } from "../entities";
import { PhotosApi } from "../application/photos.api";

export const fetchAllPhotos = createAsyncThunk<
  { photos: Photos },
  void,
  { extra: { photosApi: PhotosApi } }
>("photos/fetchAllPhotos", async (_, { extra: { photosApi } }) => {
  const photos = await photosApi.getAllPhotos();
  return {
    photos,
  };
});
