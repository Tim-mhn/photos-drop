import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeleteAlbumCommand } from "./delete-album.command";
import { AlbumId } from "../../entities";

export const deleteAlbum = createAsyncThunk<
  AlbumId,
  AlbumId,
  { extra: { deleteAlbumCommand: DeleteAlbumCommand } }
>("albums/deleteAlbum", async (id, { extra: { deleteAlbumCommand } }) => {
  await deleteAlbumCommand(id);
  return id;
});
