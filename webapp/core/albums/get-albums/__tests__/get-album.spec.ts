import { Album } from "../../album";
import { buildAlbumsStore } from "../../store";

describe("getAlbums", () => {
  it("should initially returned an empty list", () => {
    const store = buildAlbumsStore({ initialAlbums: [] });

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

    const store = buildAlbumsStore({ initialAlbums: albums });

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
