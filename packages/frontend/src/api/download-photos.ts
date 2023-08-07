import { AxiosResponse } from "axios";
import { apiClient } from ".";
import { saveAs } from "file-saver";
import { DownloadPhotosDTO, Images } from "../../../shared/src";

export async function downloadPhotos(photos?: Images) {
  const res = await apiClient.post<DownloadPhotosDTO, Blob>(
    "http://localhost:8000/images/download",
    { photos: photos?.map((p) => p.id) || [] },
    {
      responseType: "blob",
      observe: "response",
    },
  );

  const filename = retrieveFilenameFromHttpResponse(res);
  saveAs(res.data, filename);
}

export function retrieveFilenameFromHttpResponse(res: AxiosResponse) {
  const headers = res.headers;
  const contentDispositionEls: string[] =
    headers?.["content-disposition"]?.split("; ");

  return contentDispositionEls[1]?.split("filename=")[1]?.replace(/\"/g, "");
}
