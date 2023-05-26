import { RootState, createStore } from "./store";
import { Photos } from "../features/photos/entities";
import { AllPhotosQuery } from "../features/photos/queries/fetch-all-photos.query";
import { albumsAdapter } from "../features/albums/albumsSlice";
import { AlbumsAdapters } from "../features/albums/adapters/albums.adapters";

export function createInMemoryPhotosQuery(photos: Photos): AllPhotosQuery {
  return createInMemoryQuery(photos);
}

export function createInMemoryQuery<T>(items: T[]): () => Promise<T[]> {
  return async () => items;
}

type StoreProps = {
  photos: Photos;
  photosQuery: AllPhotosQuery;
} & AlbumsAdapters;

const DEFAULT_STORE_PROPS: StoreProps = {
  photos: [],
  allAlbumsQuery: createInMemoryQuery([]),
  photosQuery: createInMemoryQuery([]),
  createAlbumCommand: async () => undefined,
  deleteAlbumCommand: async (albumId: string) => undefined,
};
export function createTestStore(props: Partial<StoreProps> = {}) {
  const {
    photos,
    allAlbumsQuery,
    photosQuery,
    deleteAlbumCommand,
    createAlbumCommand,
  }: StoreProps = {
    ...DEFAULT_STORE_PROPS,
    ...props,
  };

  const initialState: RootState = {
    photos,
    albums: albumsAdapter.getInitialState(),
  };

  return createStore(initialState, {
    photosQuery,
    allAlbumsQuery,
    deleteAlbumCommand,
    createAlbumCommand,
  });
}
