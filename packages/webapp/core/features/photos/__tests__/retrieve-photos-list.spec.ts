import { fetchAllPhotos } from "../use-cases/retrieve-all-photos.use-case";
import { createTestStore } from "../../../shared/store";
import { MockPhotosApi } from "../__mocks__/photos-api.mock";

describe("getAllPhotos", () => {
  it("should correctly return the list of photos", async () => {
    const photosApi = new MockPhotosApi();
    const testStore = createTestStore({
      photos: [],
      photosApi,
    });

    photosApi.photos = [
      {
        id: "1",
        url: "photo1.jpeg",
      },
      {
        id: "2",
        url: "photo2.jpeg",
      },
    ];

    await testStore.dispatch(fetchAllPhotos());

    expect(testStore.getState().photos.photos).toEqual([
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
