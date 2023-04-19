import { Photos } from "../../photos/use-cases/retrieve-all-photos.use-case";
import { Album } from "../album";

export class AlbumsPhotosRepository {
  private albumsPhotos: { [id: string]: Photos } = {};

  addPhotosToAlbum({ photos, album }: { photos: Photos; album: Album }) {
    const currentPhotos = this.getAlbumPhotos(album);
    this.albumsPhotos[album.id] = [...currentPhotos, ...photos];
    console.log(this.albumsPhotos);
  }

  getAlbumPhotos(album: Album): Photos {
    console.group("getAlbumPhotos");
    console.log(this.albumsPhotos);
    console.log(album);
    console.groupEnd();
    return this.albumsPhotos[album.id] || [];
  }
}

export function addPhotosToAlbum({
  photos,
  album,
}: {
  photos: Photos;
  album: Album;
}) {
  console.group("add photos to album");
  console.log(photos);
  console.log(album);
  console.groupEnd();
  return repo.addPhotosToAlbum({ photos, album });
}

export function getAlbumPhotos(album: Album): Photos {
  return repo.getAlbumPhotos(album);
}

const repo = new AlbumsPhotosRepository();
