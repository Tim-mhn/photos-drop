import { apiClient } from "./client";
import { Images } from "@shared";
import { IMAGES_API_ENDPOINT } from "./endpoints";

export async function fetchImages() {
  return apiClient.get<Images>(IMAGES_API_ENDPOINT);
}
