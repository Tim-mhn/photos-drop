import { APIClient } from "./client";

export async function fetchImages(client: APIClient) {
  return client.get<any>("http://localhost:8000/images");
}
