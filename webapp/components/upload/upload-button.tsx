"use client";

import { ChangeEvent, useRef } from "react";
import { Button } from "../ui";

export const UploadPhotosButton = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: ChangeEvent) => {
    console.log((event.target as any).files);
  };
  return (
    <>
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
