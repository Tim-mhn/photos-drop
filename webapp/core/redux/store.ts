import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { photosReducer } from "../photos/photosSlice";
import { AllPhotosQuery } from "../photos/queries/fetch-all-photos.query";
import { InMemoryPhotosQuery } from "../photos/adapters/in-memory-photos.query";

const rootReducer = combineReducers({
  photos: photosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export function createStore(
  preloadedState: RootState,
  queries: {
    photosQuery: AllPhotosQuery;
  }
) {
  const { photosQuery } = queries;
  const store = configureStore({
    reducer: {
      photos: photosReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            allPhotosQuery: photosQuery,
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
    },
    {
      photosQuery: InMemoryPhotosQuery,
    }
  );

export const store = createProductionStore();
