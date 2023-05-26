import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { photosReducer } from "../features/photos/photosSlice";
import { AllPhotosQuery } from "../features/photos/queries/fetch-all-photos.query";
import { InMemoryPhotosQuery } from "../features/photos/adapters/in-memory-photos.query";
import { albumsAdapter, albumsReducer } from "../features/albums/albumsSlice";
import { ALBUMS_API } from "../features/albums/adapters/albums.adapters";
import { AlbumsAPI } from "../features/albums/application/albums.api";

const rootReducer = combineReducers({
  photos: photosReducer,
  albums: albumsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export function createStore(
  preloadedState: RootState,
  adapters: {
    photosQuery: AllPhotosQuery;
  } & { albumsAPI: AlbumsAPI }
) {
  const { photosQuery, albumsAPI } = adapters;
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            allPhotosQuery: photosQuery,
            albumsAPI,
          },
        },
      }),
    preloadedState,
  });

  return store;
}

const createProductionStore = () =>
  createStore(
    {
      photos: [],
      albums: albumsAdapter.getInitialState([]),
    },
    {
      photosQuery: InMemoryPhotosQuery,
      albumsAPI: ALBUMS_API,
    }
  );

export const store = createProductionStore();

export type Store = typeof store;
