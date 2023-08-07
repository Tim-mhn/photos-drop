import { apiClient } from "./client";
import { Images } from "../../../shared/src";
import { IMAGES_API_ENDPOINT } from "./endpoints";

export async function fetchImages() {
  const userImages = await apiClient.get<{ date: string; images: Images }[]>(
    IMAGES_API_ENDPOINT,
  );

  return userImages?.map(({ date, images }) => ({
    date: new Date(date),
    images,
  }));
}
