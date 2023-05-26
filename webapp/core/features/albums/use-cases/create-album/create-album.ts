import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllAlbums } from "../fetch-all-albums/fetch-all-albums";
import { AppDispatch } from "../../../../store";
import { AlbumsAPI } from "../../application/albums.api";

export const createAlbum = createAsyncThunk<
  void,
  string,
  { extra: { albumsAPI: AlbumsAPI }; dispatch: AppDispatch }
>(
  "albums/createAlbum",
  async (albumName, { extra: { albumsAPI }, dispatch }) => {
    await albumsAPI.createAlbum({ name: albumName });
    dispatch(fetchAllAlbums());
  }
);
