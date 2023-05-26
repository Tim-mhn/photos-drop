import { createAsyncThunk } from "@reduxjs/toolkit";
import { Photos } from "../entities";
import { AllPhotosQuery } from "../queries/fetch-all-photos.query";

export const fetchAllPhotos = createAsyncThunk<
  { photos: Photos },
  void,
  { extra: { allPhotosQuery: AllPhotosQuery } }
>("photos/fetchAllPhotos", async (_, { extra: { allPhotosQuery } }) => {
  const photos = await allPhotosQuery();
  return {
    photos,
  };
});
