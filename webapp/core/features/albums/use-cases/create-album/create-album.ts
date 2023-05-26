import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateAlbumCommand } from "./create-album.command";
import { fetchAllAlbums } from "../fetch-all-albums/fetch-all-albums";
import { AppDispatch } from "../../../../store";

export const createAlbum = createAsyncThunk<
  void,
  string,
  { extra: { createAlbumCommand: CreateAlbumCommand }; dispatch: AppDispatch }
>(
  "albums/createAlbum",
  async (albumName, { extra: { createAlbumCommand }, dispatch }) => {
    await createAlbumCommand({ name: albumName });
    dispatch(fetchAllAlbums());
  }
);
