import { APIClient } from "./client";
import { Images } from "@shared";
import { IMAGES_API_ENDPOINT } from "./endpoints";

export async function fetchImages(client: APIClient) {
  return client.get<Images>(IMAGES_API_ENDPOINT);
}
