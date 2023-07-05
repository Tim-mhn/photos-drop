import { AxiosResponse } from "axios";
import { retrieveFilenameFromHttpResponse } from "./download-photos";
import { describe, it, expect } from "vitest";

describe("retrieveFilenameFromHttpResponse", () => {
  it("should correctly retrieve filename from HttpResponse", () => {
    const mockRes: AxiosResponse = {
      headers: {
        "content-disposition": 'attachment; filename="uploads.zip"',
        "content-type": "application/zip",
      },
    } as any as AxiosResponse;

    const filename = retrieveFilenameFromHttpResponse(mockRes);

    expect(filename).toEqual("uploads.zip");
  });
});
