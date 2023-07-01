import { QueryClient } from "@tanstack/vue-query";
import { apiClient } from ".";
import { UPLOAD_API_ENDPOINT } from "./endpoints";

export const IMAGES_QUERY_KEY = "IMAGES" as const;
export async function uploadImages(queryClient: QueryClient, images: FileList) {
  const formData = buildFormDataFromFileList(images);
  await apiClient.post(UPLOAD_API_ENDPOINT, formData);
  await queryClient.invalidateQueries({ queryKey: [IMAGES_QUERY_KEY] });
}

function buildFormDataFromFileList(fileList: FileList) {
  const formData = new FormData();
  for (let i = 0; i < fileList.length; i++) {
    formData.append("files", fileList[i] as File);
  }
  return formData;
}
