import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { photosReducer } from "../../features/photos/photosSlice";
import { MOCK_PHOTOS_API } from "../../features/photos/adapters/in-memory-photos.query";
import {
  MOCK_ALBUMS_API,
  albumsApi,
} from "../../features/albums/adapters/albums.adapters";
import { AlbumsAPI } from "../../features/albums/application/albums.api";
import { PhotosApi } from "../../features/photos/application/photos.api";

// check https://codesandbox.io/s/rtk-query-github-example-nk4b1?file=/src/shared/redux/store.ts
// good example of redux structure

const rootReducer = combineReducers({
  photos: photosReducer,
  [albumsApi.reducerPath]: albumsApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export function createStore(
  preloadedState: Partial<RootState>,
  adapters: {
    photosApi: PhotosApi;
    albumsAPI: AlbumsAPI;
  }
) {
  const { photosApi, albumsAPI } = adapters;

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            photosApi,
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
      albumsAPI: MOCK_ALBUMS_API,
      photosApi: MOCK_PHOTOS_API,
    }
  );

export const store = createProductionStore();

export type Store = typeof store;
