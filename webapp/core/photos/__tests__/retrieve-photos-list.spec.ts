import { AllPhotosQuery } from "../queries/fetch-all-photos.query";
import { fetchAllPhotos } from "../use-cases/retrieve-all-photos.use-case";
import { createTestStore } from "./test.store";

describe("getAllPhotos", () => {
  it("should correctly return the list of photos", async () => {
    const mockPhotosQuery: AllPhotosQuery = async () => [
      {
        id: "1",
        url: "photo1.jpeg",
      },
      {
        id: "2",
        url: "photo2.jpeg",
      },
    ];
    const testStore = createTestStore({
      photos: [],
      photosQuery: mockPhotosQuery,
    });

    await testStore.dispatch(fetchAllPhotos());

    expect(testStore.getState().photos).toEqual([
      {
        id: "1",
        url: "photo1.jpeg",
      },
      {
        id: "2",
        url: "photo2.jpeg",
      },
    ]);
  });
});
