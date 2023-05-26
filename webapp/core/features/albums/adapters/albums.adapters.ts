import { AlbumsAPI } from "../application/albums.api";

export const ALBUMS_API: AlbumsAPI = {
  fetchAllAlbums: async () => [
    {
      id: "1",
      coverPhoto:
        "https://yt3.ggpht.com/slpyze3-aTwNUKBWT0-8tPKybF3RlkieB9YnYC8YSe_J6pL2eyGVi_jvznVSeZFJiVPhvdt-7Q=s88-c-k-c0x00ffffff-no-rj-mo",
      itemsCount: 10,
      name: "Album 1",
    },
  ],
  deleteAlbum: async () => undefined,
  createAlbum: async ({ name }) => undefined,
};
