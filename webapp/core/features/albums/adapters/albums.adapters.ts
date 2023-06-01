import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Album, AlbumId, AlbumName, Albums } from "../domain";
import { MockAlbumsApi } from "./mock-albums.api";
import { AlbumsAPI } from "../application/albums.api";
import { Photos } from "../../photos";

export const MOCK_ALBUMS_API: AlbumsAPI = new MockAlbumsApi();

const ALBUM_LIST_TAG = "album-list" as const;
export const albumsApi = createApi({
  reducerPath: "albumsApi",
  tagTypes: [ALBUM_LIST_TAG],
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (build) => ({
    getAllAlbums: build.query<Albums, void>({
      async queryFn() {
        const albums = await MOCK_ALBUMS_API.fetchAllAlbums();
        return { data: albums };
      },
      providesTags: [ALBUM_LIST_TAG],
    }),
    deleteAlbum: build.mutation<AlbumId, AlbumId>({
      async queryFn(albumToDeleteId: AlbumId) {
        await MOCK_ALBUMS_API.deleteAlbum(albumToDeleteId);
        return { data: albumToDeleteId };
      },
      invalidatesTags: [ALBUM_LIST_TAG],
    }),
    createAlbum: build.mutation<string, AlbumName>({
      async queryFn(albumName: AlbumName) {
        await MOCK_ALBUMS_API.createAlbum({ name: albumName });
        return { data: albumName };
      },
      invalidatesTags: [ALBUM_LIST_TAG],
    }),
    getAlbum: build.query<Album, AlbumId>({
      async queryFn(albumId: AlbumId) {
        const album = await MOCK_ALBUMS_API.getAlbum(albumId);
        return { data: album };
      },
    }),
    getAlbumPhotos: build.query<Photos, AlbumId>({
      async queryFn(albumId: AlbumId) {
        const albumPhotos = await MOCK_ALBUMS_API.getAlbumPhotos(albumId);
        return { data: albumPhotos };
      },
    }),
  }),
});

export const {
  useGetAllAlbumsQuery,
  useDeleteAlbumMutation,
  useCreateAlbumMutation,
  useGetAlbumQuery,
  useGetAlbumPhotosQuery,
} = albumsApi;
