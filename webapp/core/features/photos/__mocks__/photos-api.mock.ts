import { randomId } from "../../../../shared/utils";
import { PhotosApi } from "../application/photos.api";
import { Photos } from "../entities";

export class MockPhotosApi implements PhotosApi {
  photos: Photos = [];

  async getAllPhotos() {
    return this.photos;
  }

  async uploadPhotos(formData: FormData) {
    try {
      formData.forEach((f) =>
        this.photos.push({
          id: randomId(),
          url: `https://s3-images/${randomId()}`,
        })
      );
    } catch (err) {
      console.error(err);
    }
  }
}
