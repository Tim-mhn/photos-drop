import { buildAlbumPhotosStore } from "../../../../album-photos";
import { Album } from "../../../entities";
import { buildAlbumsStore } from "../../../infrastructure";

describe("getAlbumById", () => {
  it("should return the right album by id", () => {
    const initialAlbums: Album[] = [
      {
        coverPhoto: "",
        id: "album1",
        itemsCount: 0,
        name: "Album 1",
      },
    ];
    const albumPhotosStore = buildAlbumPhotosStore();

    const store = buildAlbumsStore({ initialAlbums, albumPhotosStore });
    const albumId = "album1";

    expect(store.getState().getAlbumById(albumId)).toEqual({
      coverPhoto: "",
      id: "album1",
      itemsCount: 0,
      name: "Album 1",
    });
  });

  it("should trow an error if no album exists with the given id", () => {
    const initialAlbums: Album[] = [
      {
        coverPhoto: "",
        id: "album1",
        itemsCount: 0,
        name: "Album 1",
      },
    ];
    const albumPhotosStore = buildAlbumPhotosStore();

    const store = buildAlbumsStore({ initialAlbums, albumPhotosStore });
    const albumId = "id-does-not-exist";

    expect(() => store.getState().getAlbumById(albumId)).toThrow();
  });
});
