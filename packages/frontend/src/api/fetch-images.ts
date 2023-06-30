import { APIClient } from "./client";
import { Images } from "@shared";

export async function fetchImages(client: APIClient) {
  return client.get<Images>("http://localhost:8000/images");
}
