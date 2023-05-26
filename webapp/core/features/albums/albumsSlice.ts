import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Album } from "./domain";
import { fetchAllAlbums } from "./use-cases/fetch-all-albums/fetch-all-albums";
import { deleteAlbum } from "./use-cases/delete-album/delete-album";
import { RootState } from "../../store";
import { createAlbum } from "./use-cases/create-album/create-album";

export const albumsAdapter = createEntityAdapter<Album>({
  selectId: (album) => album.id,
});

export const albumsSlice = createSlice({
  name: "albums",
  initialState: albumsAdapter.getInitialState(),
  reducers: {
    setAllAlbums: albumsAdapter.setAll,
    removeAlbumById: albumsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllAlbums.fulfilled, (state, action) => {
      albumsAdapter.setAll(state, action.payload);
    });
    builder.addCase(deleteAlbum.fulfilled, (state, { payload: albumId }) => {
      albumsAdapter.removeOne(state, albumId);
    });
    builder.addCase(createAlbum.fulfilled, (_) => {});
  },
});

export const albumsSelectors = albumsAdapter.getSelectors<RootState>(
  (state) => state.albums
);

export const { setAllAlbums, removeAlbumById } = albumsSlice.actions;
export const albumsReducer = albumsSlice.reducer;
