"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Button, DialogUI } from "../ui";
import { uploadPhotos } from "../../core/features/photos/use-cases/upload-photos.use-case";
import { useAppDispatch, useAppSelector } from "../../core/shared/store";

export const UploadPhotosButton = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const dispatch = useAppDispatch();

  const uploadingPhotos = useAppSelector((state) => state.photos.uploading);
  const onChange = (event: ChangeEvent) => {
    console.log("on change called");
    const fileList = (event.target as any).files as FileList;
    const formData = buildFormDataFromFileList(fileList);
    console.log(formData);
    dispatch(uploadPhotos(formData));
  };

  return (
    <>
      {/* todo: need to transform this into a snackbar */}
      <DialogUI open={uploadingPhotos} close={() => setUploading(false)}>
        <div> uploading photos</div>
      </DialogUI>
      <Button withBorder={true} onClick={() => inputRef.current?.click()}>
        Upload
      </Button>
      <input
        className="hidden"
        type="file"
        accept="image/png, image/jpeg"
        multiple={true}
        onChange={onChange}
        ref={inputRef}
      />
    </>
  );
};

function buildFormDataFromFileList(fileList: FileList) {
  console.log(fileList);
  const formData = new FormData();
  for (let i = 0; i < fileList.length; i++) {
    formData.append("files", fileList[i] as File);
  }
  return formData;
}
