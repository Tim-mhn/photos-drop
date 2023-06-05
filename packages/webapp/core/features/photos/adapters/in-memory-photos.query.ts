import axios from "axios";
import { MockPhotosApi } from "../__mocks__/photos-api.mock";
import { PhotosApi } from "../application/photos.api";
import { Photos } from "../entities";

const photos = Array(30)
  .fill("")
  .map((_, n) => ({
    id: n.toString(),
    url: `https://api.dicebear.com/6.x/personas/svg?seed=${n}`,
  }));

export const MOCK_PHOTOS_API = new MockPhotosApi(photos);

class HttpPhotosApi implements PhotosApi {
  async getAllPhotos(): Promise<Photos> {
    const { data } = await axios.get<Photos>("http://localhost:8000/images");
    return data;
  }
  uploadPhotos(formData: FormData): Promise<void> {
    return axios.post("http://localhost:8000/images/upload", formData);
  }
}

export const PHOTOS_API = new HttpPhotosApi();
