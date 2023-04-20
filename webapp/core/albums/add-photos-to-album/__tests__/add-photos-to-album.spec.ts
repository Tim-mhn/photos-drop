import { Photos } from "../../../photos/use-cases/retrieve-all-photos.use-case";
import { Album } from "../../album";
import { AlbumsPhotosRepository } from "../add-photos-to-album";

describe("addPhotosToAlbum", () => {
  it("should return correctly photos that have been added to the album when the album is initially empty", () => {
    const repo = new AlbumsPhotosRepository();
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

    repo.addPhotosToAlbum({ photos: newPhotos, album });

    expect(repo.getAlbumPhotos(album)).toEqual(newPhotos);
  });

  it("should return the current photos and the newly added photos when adding photos to a non-empty album", () => {
    const repo = new AlbumsPhotosRepository();

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

    repo.addPhotosToAlbum({ photos: initialPhotos, album });

    repo.addPhotosToAlbum({ photos: newPhotos, album });

    const albumPhotos = repo.getAlbumPhotos(album);
    expect(albumPhotos).toEqual([...initialPhotos, ...newPhotos]);
  });

  it("should not double-add photos which are already in the album", () => {
    const repo = new AlbumsPhotosRepository();

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

    repo.addPhotosToAlbum({ photos: initialPhotos, album });

    repo.addPhotosToAlbum({ photos: newPhotos, album });

    const albumPhotosIds = repo.getAlbumPhotos(album).map((p) => p.id);
    expect(albumPhotosIds).toEqual(["photo1", "photo2", "photo3"]);
  });
});
