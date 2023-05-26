import { createAsyncThunk } from "@reduxjs/toolkit";
import { Albums } from "../../domain";
import { AlbumsAPI } from "../../application/albums.api";

export const fetchAllAlbums = createAsyncThunk<
  Albums,
  void,
  {
    extra: {
      albumsAPI: AlbumsAPI;
    };
  }
>(
  "albums/fetchAllAlbums",
  async (_, { extra: { albumsAPI } }: { extra: { albumsAPI: AlbumsAPI } }) => {
    return await albumsAPI.fetchAllAlbums();
  }
);
