import { randomId } from "../../../../shared/utils";
import { AlbumsAPI } from "../application/albums.api";
import { Album } from "../domain";

const albums = [
  {
    id: "1",
    coverPhoto:
      "https://yt3.ggpht.com/slpyze3-aTwNUKBWT0-8tPKybF3RlkieB9YnYC8YSe_J6pL2eyGVi_jvznVSeZFJiVPhvdt-7Q=s88-c-k-c0x00ffffff-no-rj-mo",
    itemsCount: 10,
    name: "Album 1",
  },
];
export const ALBUMS_API: AlbumsAPI = {
  fetchAllAlbums: async () => albums,
  deleteAlbum: async () => undefined,
  createAlbum: async ({ name }) => {
    const randomAlbum: Album = {
      id: randomId(),
      name,
      coverPhoto: "",
      itemsCount: 0,
    };
    albums.push(randomAlbum);
  },
};
