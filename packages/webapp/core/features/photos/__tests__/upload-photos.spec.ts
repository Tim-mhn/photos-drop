import { createTestStore } from "../../../shared/store";
import { Images } from "@shared";
import { uploadPhotos } from "../use-cases/upload-photos.use-case";
import { MockPhotosApi } from "../__mocks__/photos-api.mock";

describe("upload photos", () => {
  let testFixture!: PhotosTestFixture;
  beforeEach(() => (testFixture = new PhotosTestFixture()));

  it("the updated list of photos should contain the ones which have been uploaded", async () => {
    testFixture.givenInitialPhotosAre([
      {
        id: "1",
        url: "image1.jpeg",
      },
    ]);

    const image4: File = new File([], "image4.jpeg");
    const image2: File = new File([], "image2.jpeg");
    const image3: File = new File([], "image3.jpeg");

    const images = [image4, image2, image3];
    await testFixture.uploadPhotos(images);

    expect(testFixture.getAllPhotos().photos.length).toEqual(4);
  });
});

class PhotosTestFixture {
  mockApi = new MockPhotosApi();

  store!: ReturnType<typeof createTestStore>;
  givenInitialPhotosAre(photos: Images) {
    this.store = createTestStore({
      photos: [],
      photosApi: this.mockApi,
    });

    this.mockApi.photos = photos;
  }
  async uploadPhotos(files: File[]) {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    await this.store.dispatch(uploadPhotos(formData));
  }

  getAllPhotos() {
    return this.store.getState().photos;
  }
}
