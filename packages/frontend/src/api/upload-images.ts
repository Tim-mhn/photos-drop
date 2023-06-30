import { QueryClient } from "@tanstack/vue-query";
import { APIClient } from ".";

export const IMAGES_QUERY_KEY = "IMAGES" as const;
export async function uploadImages(
  client: APIClient,
  queryClient: QueryClient,
  images: FileList,
) {
  const formData = buildFormDataFromFileList(images);
  await client.post("http://localhost:8000/images/upload", formData);
  await queryClient.invalidateQueries({ queryKey: [IMAGES_QUERY_KEY] });
}

function buildFormDataFromFileList(fileList: FileList) {
  console.log(fileList);
  const formData = new FormData();
  for (let i = 0; i < fileList.length; i++) {
    const f = fileList[i];
    console.log(f);
    formData.append("files", fileList[i] as File);
  }
  return formData;
}
