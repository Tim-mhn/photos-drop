import React from "react";
import { retrieveAllPhotos } from "../../core/photos/use-cases/retrieve-all-photos.use-case";

export default function HelloPage() {
  const photos = retrieveAllPhotos();
  return (
    <div className="flex flex-grow h-full w-full grid grid-cols-6 gap-4 overflow-auto">
      {photos.map((photo, n) => (
        // check why it doesnt work with Next Image
        <img
          alt="image"
          src={photo.url}
          key={photo.id}
          width="240"
          height="240"
          className="h-60 w-60 border border-gray-100 shadow-sm"
        />
      ))}
    </div>
  );
}
