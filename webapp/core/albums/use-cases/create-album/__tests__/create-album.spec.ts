import { buildAlbumPhotosStore } from "../../../../album-photos";
import { Photos } from "../../../../photos";
import { buildAlbumsStore } from "../../../infrastructure/store";

describe("createAlbum", () => {
  it("should create an album and add it to the list of albums", () => {
    const albumPhotosStore = buildAlbumPhotosStore();

    const store = buildAlbumsStore({ initialAlbums: [], albumPhotosStore });
    store.getState().createAlbum("new album");

    expect(store.getState().albums.length).toEqual(1);
  });

  it("should create an album with the right name", () => {
    const albumPhotosStore = buildAlbumPhotosStore();

    const store = buildAlbumsStore({ initialAlbums: [], albumPhotosStore });
    store.getState().createAlbum("new album");

    expect(store.getState().albums[0].name).toEqual("new album");
  });

  it("itemsCount should be 0 initially", () => {
    const albumPhotosStore = buildAlbumPhotosStore();

    const store = buildAlbumsStore({ initialAlbums: [], albumPhotosStore });
    store.getState().createAlbum("new album");

    expect(store.getState().albums[0].itemsCount).toEqual(0);
  });

  it("should correctly compute the itemsCount", () => {
    const albumPhotosStore = buildAlbumPhotosStore();

    const store = buildAlbumsStore({ initialAlbums: [], albumPhotosStore });

    const photos: Photos = [
      {
        id: "photo1",
        url: "photo1.jpeg",
      },
      {
        id: "photo2",
        url: "photo2.jpeg",
      },
    ];
    store.getState().createAlbum("new album", { photos });

    const [album] = store.getState().albums;

    expect(album.itemsCount).toEqual(2);
  });

  it("should add the initial photos to the album", () => {
    const albumPhotosStore = buildAlbumPhotosStore();
    const store = buildAlbumsStore({ initialAlbums: [], albumPhotosStore });

    const photos: Photos = [
      {
        id: "photo1",
        url: "photo1.jpeg",
      },
      {
        id: "photo2",
        url: "photo2.jpeg",
      },
    ];
    store.getState().createAlbum("new album", { photos });

    const [album] = store.getState().albums;

    expect(
      albumPhotosStore.getState().getAlbumPhotos({ albumId: album.id })
    ).toEqual([
      {
        id: "photo1",
        url: "photo1.jpeg",
      },
      {
        id: "photo2",
        url: "photo2.jpeg",
      },
    ]);
  });
});
