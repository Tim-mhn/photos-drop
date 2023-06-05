import { RootState, createStore } from "./store";
import { Images } from "@shared";
import { AlbumsAPI } from "../../features/albums/application/albums.api";
import { Album } from "../../features/albums";
import { PhotosApi } from "../../features/photos/application/photos.api";
import { MOCK_PHOTOS_API } from "../../features/photos/adapters/in-memory-photos.query";

type StoreProps = {
  photos: Images;
  photosApi: PhotosApi;
  albumsAPI: AlbumsAPI;
};

const DEFAULT_ALBUMS_API: AlbumsAPI = {
  createAlbum: async () => undefined,
  deleteAlbum: async () => undefined,
  fetchAllAlbums: async () => [],
  addPhotosToAlbum: async () => undefined,
  getAlbum: async () => <Album>(<any>{}),
  getAlbumPhotos: async (albumId) => [],
};

const DEFAULT_STORE_PROPS: StoreProps = {
  photos: [],
  photosApi: MOCK_PHOTOS_API,
  albumsAPI: DEFAULT_ALBUMS_API,
};
export function createTestStore(props: Partial<StoreProps> = {}) {
  const { photos, albumsAPI, photosApi }: StoreProps = {
    ...DEFAULT_STORE_PROPS,
    ...props,
  };

  const initialState: Partial<RootState> = {
    photos: {
      photos,
      uploading: false,
    },
  };

  return createStore(initialState, {
    photosApi,
    albumsAPI,
  });
}
