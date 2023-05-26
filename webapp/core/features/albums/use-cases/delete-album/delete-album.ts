import { createAsyncThunk } from "@reduxjs/toolkit";
import { AlbumId } from "../../domain";
import { AlbumsAPI } from "../../application/albums.api";

export const deleteAlbum = createAsyncThunk<
  AlbumId,
  AlbumId,
  { extra: { albumsAPI: AlbumsAPI } }
>("albums/deleteAlbum", async (id, { extra: { albumsAPI } }) => {
  await albumsAPI.deleteAlbum(id);
  return id;
});
