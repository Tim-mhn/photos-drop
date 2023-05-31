import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { photosReducer } from "../features/photos/photosSlice";
import { AllPhotosQuery } from "../features/photos/queries/fetch-all-photos.query";
import { InMemoryPhotosQuery } from "../features/photos/adapters/in-memory-photos.query";
import { albumsReducer } from "../features/albums/albumsSlice";
import {
  MOCK_ALBUMS_API,
  albumsApi,
} from "../features/albums/adapters/albums.adapters";
import { AlbumsAPI } from "../features/albums/application/albums.api";

// check https://codesandbox.io/s/rtk-query-github-example-nk4b1?file=/src/shared/redux/store.ts
// good example of redux structure

const rootReducer = combineReducers({
  photos: photosReducer,
  albums: albumsReducer,
  [albumsApi.reducerPath]: albumsApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export function createStore(
  preloadedState: Partial<RootState>,
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
      }).concat(albumsApi.middleware),
    preloadedState,
  });

  return store;
}

const createProductionStore = () =>
  createStore(
    {
      photos: [],
    },
    {
      photosQuery: InMemoryPhotosQuery,
      albumsAPI: MOCK_ALBUMS_API,
    }
  );

export const store = createProductionStore();

export type Store = typeof store;
