import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../../../shared/store";
import { fetchAllPhotos } from "./retrieve-all-photos.use-case";
import { PhotosApi } from "../application/photos.api";

export type UploadPhotosCommand = (formData: FormData) => Promise<void>;

export const uploadPhotos = createAsyncThunk<
  void,
  FormData,
  { extra: { photosApi: PhotosApi }; dispatch: AppDispatch }
>("photos/upload", async (formData, { extra: { photosApi }, dispatch }) => {
  await photosApi.uploadPhotos(formData);
  dispatch(fetchAllPhotos());
});
