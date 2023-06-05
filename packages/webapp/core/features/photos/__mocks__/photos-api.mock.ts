import { randomId } from "../../../../shared/utils";
import { PhotosApi } from "../application/photos.api";
import { Images } from "@shared";
export class MockPhotosApi implements PhotosApi {
  constructor(public photos: Images = []) {}

  async getAllPhotos() {
    return this.photos;
  }

  private async _wait(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async uploadPhotos(formData: FormData) {
    // await this._wait(5000);
    try {
      formData.forEach((f) => {
        this.photos = [
          ...this.photos,
          {
            id: randomId(),
            url: `https://s3-images/${randomId()}`,
          },
        ];
      });

      console.log("uploading end");
      console.groupEnd();
    } catch (err) {
      console.error(err);
    }
  }
}
