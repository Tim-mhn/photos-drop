import { Photos } from "../entities";

export interface PhotosApi {
  getAllPhotos(): Promise<Photos>;
  uploadPhotos(formData: FormData): Promise<void>;
}
