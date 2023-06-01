import { RootState, createStore } from "./store";
import { Photos } from "../../features/photos/entities";
import { AllPhotosQuery } from "../../features/photos/queries/fetch-all-photos.query";
import { AlbumsAPI } from "../../features/albums/application/albums.api";

export function createInMemoryPhotosQuery(photos: Photos): AllPhotosQuery {
  return createInMemoryQuery(photos);
}

export function createInMemoryQuery<T>(items: T[]): () => Promise<T[]> {
  return async () => items;
}

type StoreProps = {
  photos: Photos;
  photosQuery: AllPhotosQuery;
  albumsAPI: AlbumsAPI;
};

const DEFAULT_ALBUMS_API: AlbumsAPI = {
  createAlbum: async () => undefined,
  deleteAlbum: async () => undefined,
  fetchAllAlbums: async () => [],
};

const DEFAULT_STORE_PROPS: StoreProps = {
  photos: [],
  photosQuery: createInMemoryQuery([]),
  albumsAPI: DEFAULT_ALBUMS_API,
};
export function createTestStore(props: Partial<StoreProps> = {}) {
  const { photos, albumsAPI, photosQuery }: StoreProps = {
    ...DEFAULT_STORE_PROPS,
    ...props,
  };

  const initialState: Partial<RootState> = {
    photos,
    // albums: albumsAdapter.getInitialState(),
  };

  return createStore(initialState, {
    photosQuery,
    albumsAPI,
  });
}
