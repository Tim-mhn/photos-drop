import { createAsyncThunk } from "@reduxjs/toolkit";
import { AllAlbumsQuery } from "./all-albums.query";
import { Albums } from "../../entities";

export const fetchAllAlbums = createAsyncThunk<
  Albums,
  void,
  {
    extra: {
      allAlbumsQuery: AllAlbumsQuery;
    };
  }
>(
  "albums/fetchAllAlbums",
  async (
    _,
    { extra: { allAlbumsQuery } }: { extra: { allAlbumsQuery: AllAlbumsQuery } }
  ) => {
    return await allAlbumsQuery();
  }
);
