import { buildAlbumPhotosStore } from "../../../../album-photos";
import { Album } from "../../../entities";
import { buildAlbumsStore } from "../../../infrastructure";

describe("getAlbums", () => {
  it("should initially returned an empty list", () => {
    const albumPhotosStore = buildAlbumPhotosStore();

    const store = buildAlbumsStore({ initialAlbums: [], albumPhotosStore });
    expect(store.getState().albums).toEqual([]);
  });

  it("should return a list of many albums", () => {
    const albums: Album[] = [
      {
        id: "album1",
        coverPhoto: "",
        itemsCount: 0,
        name: "Album 1",
      },
      {
        id: "album2",
        coverPhoto: "",
        itemsCount: 0,
        name: "Album 2",
      },
    ];
    const albumPhotosStore = buildAlbumPhotosStore();

    const store = buildAlbumsStore({ initialAlbums: albums, albumPhotosStore });

    expect(store.getState().albums).toEqual([
      {
        id: "album1",
        coverPhoto: "",
        itemsCount: 0,
        name: "Album 1",
      },
      {
        id: "album2",
        coverPhoto: "",
        itemsCount: 0,
        name: "Album 2",
      },
    ]);
  });
});
