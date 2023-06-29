import { APIClient } from ".";

export async function uploadImages(client: APIClient, images: FileList) {
  const formData = buildFormDataFromFileList(images);
  client.post("http://localhost:8000/images/upload", formData);
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
