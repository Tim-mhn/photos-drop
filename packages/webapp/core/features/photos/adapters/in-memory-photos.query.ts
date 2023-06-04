import { MockPhotosApi } from "../__mocks__/photos-api.mock";

const photos = Array(30)
  .fill("")
  .map((_, n) => ({
    id: n.toString(),
    url: `https://api.dicebear.com/6.x/personas/svg?seed=${n}`,
  }));

export const MOCK_PHOTOS_API = new MockPhotosApi(photos);
