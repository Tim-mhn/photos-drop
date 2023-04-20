import { Photos } from "../../photos/use-cases/retrieve-all-photos.use-case";
import { Album } from "../album";

export class AlbumsPhotosRepository {
  private albumsPhotos: { [id: string]: Photos } = {};

  addPhotosToAlbum({ photos, album }: { photos: Photos; album: Album }) {
    const newPhotos = this._filterOutExistingPhotoUrls({
      newPhotos: photos,
      album,
    });
    this._appendNewPhotosToAlbum({ newPhotos, album });
  }

  private _appendNewPhotosToAlbum({
    album,
    newPhotos,
  }: {
    album: Album;
    newPhotos: Photos;
  }) {
    const currentPhotos = this.getAlbumPhotos(album);

    this.albumsPhotos[album.id] = [...currentPhotos, ...newPhotos];
  }

  private _filterOutExistingPhotoUrls({
    newPhotos,
    album,
  }: {
    newPhotos: Photos;
    album: Album;
  }): Photos {
    const currentPhotos = this.getAlbumPhotos(album);

    const currentPhotosIds = currentPhotos.map((p) => p.id);
    const photosToBeAdded = newPhotos.filter(
      (p) => !currentPhotosIds.includes(p.id)
    );

    return photosToBeAdded;
  }

  getAlbumPhotos(album: Album): Photos {
    console.log("getAlbumPhotos");
    console.log(album);
    return this.albumsPhotos[album?.id] || [];
  }
}

export function addPhotosToAlbum({
  photos,
  album,
}: {
  photos: Photos;
  album: Album;
}) {
  return repo.addPhotosToAlbum({ photos, album });
}

export function getAlbumPhotos(album: Album): Photos {
  return repo.getAlbumPhotos(album);
}

const repo = new AlbumsPhotosRepository();
