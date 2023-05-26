import { AllAlbumsQuery } from "../use-cases/fetch-all-albums/all-albums.query";
import { DeleteAlbumCommand } from "../use-cases/delete-album/delete-album.command";
import { CreateAlbumCommand } from "../use-cases/create-album/create-album.command";

export type AlbumsAdapters = {
  allAlbumsQuery: AllAlbumsQuery;
  deleteAlbumCommand: DeleteAlbumCommand;
  createAlbumCommand: CreateAlbumCommand;
};

export const ALBUMS_ADAPTERS: AlbumsAdapters = {
  allAlbumsQuery: async () => [
    {
      id: "1",
      coverPhoto:
        "https://yt3.ggpht.com/slpyze3-aTwNUKBWT0-8tPKybF3RlkieB9YnYC8YSe_J6pL2eyGVi_jvznVSeZFJiVPhvdt-7Q=s88-c-k-c0x00ffffff-no-rj-mo",
      itemsCount: 10,
      name: "Album 1",
    },
  ],
  deleteAlbumCommand: async () => undefined,
  createAlbumCommand: async ({ name }) => undefined,
};
