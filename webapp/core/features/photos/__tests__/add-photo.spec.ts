import { addPhoto } from "../photosSlice";
import { createTestStore } from "../../../store";

describe("addPhotos", () => {
  it("should correctly add a photo to an intiial empty list", () => {
    const testStore = createTestStore();

    testStore.dispatch(addPhoto({ id: "1", url: "photo1.jpeg" }));

    expect(testStore.getState().photos).toEqual([
      { id: "1", url: "photo1.jpeg" },
    ]);
  });

  it("should add the photo to an non empty initial list", () => {
    const testStore = createTestStore();

    testStore.dispatch(addPhoto({ id: "1", url: "photo1.jpeg" }));

    testStore.dispatch(addPhoto({ id: "2", url: "photo2.jpeg" }));
    testStore.dispatch(addPhoto({ id: "3", url: "photo3.jpeg" }));

    expect(testStore.getState().photos.length).toEqual(3);
  });
});
