import { PhotosApi } from "../application/photos.api";
import { Photos } from "../entities";
import { AllPhotosQuery } from "../queries/fetch-all-photos.query";

export const InMemoryPhotosQuery: AllPhotosQuery = async () => {
  return new Array(30).fill("").map((_, n) => ({
    id: n.toString(),
    url: `https://api.dicebear.com/6.x/personas/svg?seed=${n}`,
  }));
};

class MockPhotosApi implements PhotosApi {
  async getAllPhotos(): Promise<Photos> {
    return new Array(30).fill("").map((_, n) => ({
      id: n.toString(),
      url: `https://api.dicebear.com/6.x/personas/svg?seed=${n}`,
    }));
  }
  async uploadPhotos(formData: FormData): Promise<void> {}
}

export const MOCK_PHOTOS_API = new MockPhotosApi();
