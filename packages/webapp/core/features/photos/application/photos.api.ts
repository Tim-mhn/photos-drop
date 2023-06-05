import { Images } from "@shared";

export interface PhotosApi {
  getAllPhotos(): Promise<Images>;
  uploadPhotos(formData: FormData): Promise<void>;
}
