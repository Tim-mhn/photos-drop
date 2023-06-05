import { createAsyncThunk } from "@reduxjs/toolkit";
import { Images } from "@shared";
import { PhotosApi } from "../application/photos.api";

export const fetchAllPhotos = createAsyncThunk<
  { photos: Images },
  void,
  { extra: { photosApi: PhotosApi } }
>("photos/fetchAllPhotos", async (_, { extra: { photosApi } }) => {
  const photos = await photosApi.getAllPhotos();
  return {
    photos,
  };
});
