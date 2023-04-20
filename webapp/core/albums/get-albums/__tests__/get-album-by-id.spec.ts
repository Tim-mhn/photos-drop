import { Album } from "../../album";
import { buildAlbumsStore } from "../../store";

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
    const store = buildAlbumsStore({ initialAlbums });
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
    const store = buildAlbumsStore({ initialAlbums });
    const albumId = "id-does-not-exist";

    expect(() => store.getState().getAlbumById(albumId)).toThrow();
  });
});
