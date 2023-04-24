import { Album } from "../../albums";
import { Photos } from "../../photos";
import { buildAlbumPhotosStore } from "./store";

describe("AlbumPhotosStore", () => {
  describe("addPhotosToAlbum", () => {
    it("should return correctly photos that have been added to the album when the album is initially empty", () => {
      const repo = buildAlbumPhotosStore().getState();
      const album: Album = {
        id: "id-1",
        coverPhoto: "",
        itemsCount: 0,
        name: "My album",
      };

      const newPhotos: Photos = [
        {
          id: "photo1",
          url: "",
        },
        {
          id: "photo2",
          url: "",
        },
      ];

      repo.addPhotosToAlbum({ photos: newPhotos, albumId: album.id });

      expect(repo.getAlbumPhotos({ albumId: album.id })).toEqual(newPhotos);
    });

    it("should return the current photos and the newly added photos when adding photos to a non-empty album", () => {
      const repo = buildAlbumPhotosStore().getState();

      const album: Album = {
        id: "id-1",
        coverPhoto: "",
        itemsCount: 0,
        name: "My album",
      };

      const initialPhotos: Photos = [
        {
          id: "photo1",
          url: "photo1.jpeg",
        },
        {
          id: "photo2",
          url: "photo2.jpeg",
        },
      ];

      const newPhotos: Photos = [
        {
          id: "photo3",
          url: "photo1.jpeg",
        },
        {
          id: "photo4",
          url: "",
        },
      ];

      repo.addPhotosToAlbum({ photos: initialPhotos, albumId: album.id });

      repo.addPhotosToAlbum({ photos: newPhotos, albumId: album.id });

      const albumPhotos = repo.getAlbumPhotos({ albumId: album.id });
      expect(albumPhotos).toEqual([...initialPhotos, ...newPhotos]);
    });

    it("should not double-add photos which are already in the album", () => {
      const repo = buildAlbumPhotosStore().getState();

      const album: Album = {
        coverPhoto: "",
        id: "album1",
        itemsCount: 0,
        name: "Album 1",
      };
      const initialPhotos: Photos = [
        {
          id: "photo1",
          url: "",
        },
        {
          id: "photo2",
          url: "",
        },
      ];

      const newPhotos: Photos = [
        {
          id: "photo1",
          url: "",
        },
        {
          id: "photo3",
          url: "",
        },
      ];

      repo.addPhotosToAlbum({ photos: initialPhotos, albumId: album.id });

      repo.addPhotosToAlbum({ photos: newPhotos, albumId: album.id });

      const albumPhotosIds = repo
        .getAlbumPhotos({ albumId: album.id })
        .map((p) => p.id);
      expect(albumPhotosIds).toEqual(["photo1", "photo2", "photo3"]);
    });
  });

  describe("getAlbumPhotos", () => {
    it("return an empty list of photos if no photos have been added", () => {
      const store = buildAlbumPhotosStore();

      expect(store.getState().getAlbumPhotos({ albumId: "album1" })).toEqual(
        []
      );
    });

    it("return the correct list of photos after adding them", () => {
      const store = buildAlbumPhotosStore();

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

      store.getState().addPhotosToAlbum({ albumId: "album-1", photos });
      expect(store.getState().getAlbumPhotos({ albumId: "album-1" })).toEqual([
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
});
