import { buildAlbumsStore } from "../../store";

describe("createAlbum", () => {
  it("should create an album and add it to the list of albums", () => {
    const store = buildAlbumsStore({ initialAlbums: [] });

    store.getState().createAlbum("new album");

    expect(store.getState().albums.length).toEqual(1);
  });

  it("should create an album with the right name", () => {
    const store = buildAlbumsStore({ initialAlbums: [] });

    store.getState().createAlbum("new album");

    expect(store.getState().albums[0].name).toEqual("new album");
  });

  it("itemsCount should be 0 initially", () => {
    const store = buildAlbumsStore({ initialAlbums: [] });

    store.getState().createAlbum("new album");

    expect(store.getState().albums[0].itemsCount).toEqual(0);
  });
});
