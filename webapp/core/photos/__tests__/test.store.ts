import { createStore } from "../../redux/store";
import { Photos } from "../entities";
import { AllPhotosQuery } from "../queries/fetch-all-photos.query";

export function createInMemoryPhotosQuery(photos: Photos): AllPhotosQuery {
  return async () => photos;
}

export function createTestStore(
  {
    photos,
    photosQuery,
  }: {
    photos: Photos;
    photosQuery: AllPhotosQuery;
  } = {
    photos: [],
    photosQuery: createInMemoryPhotosQuery([]),
  }
) {
  return createStore(
    {
      photos,
    },
    {
      photosQuery,
    }
  );
}
