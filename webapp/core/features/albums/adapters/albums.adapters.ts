import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { randomId } from "../../../../shared/utils";
import { AlbumsAPI } from "../application/albums.api";
import { Album, AlbumId, AlbumName, Albums } from "../domain";

class MockAlbumsApi implements AlbumsAPI {
  async fetchAllAlbums() {
    console.count("fetch albums called");
    return this.albums;
  }

  async deleteAlbum(albumId: string) {
    console.log("delete album called");
    this.albums = this.albums.filter((a) => a.id !== albumId);
  }

  async createAlbum({ name }: { name: string }) {
    const randomAlbum: Album = {
      id: randomId(),
      name,
      coverPhoto: this.COVER_PHOTO,
      itemsCount: 0,
    };
    console.log("album created");
    debugger;
    this.albums = [...this.albums, randomAlbum];
    debugger;
    console.log(this.albums);
  }

  private COVER_PHOTO =
    "https://yt3.ggpht.com/slpyze3-aTwNUKBWT0-8tPKybF3RlkieB9YnYC8YSe_J6pL2eyGVi_jvznVSeZFJiVPhvdt-7Q=s88-c-k-c0x00ffffff-no-rj-mo";
  private albums: Albums = new Array(10).fill("").map((_, index) => ({
    id: index.toString(),
    coverPhoto: this.COVER_PHOTO,
    itemsCount: 10,
    name: `Album ${index + 1}`,
  }));
}
export const MOCK_ALBUMS_API = new MockAlbumsApi();

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
    deleteAlbum: build.mutation<void, AlbumId>({
      async queryFn(albumToDeleteId: AlbumId) {
        await MOCK_ALBUMS_API.deleteAlbum(albumToDeleteId);
        return { data: undefined };
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
  }),
});

export const {
  useGetAllAlbumsQuery,
  useDeleteAlbumMutation,
  useCreateAlbumMutation,
} = albumsApi;
