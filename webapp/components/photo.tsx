/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Photo } from "../core/photos/use-cases/retrieve-all-photos.use-case";

export function PhotoComponent({
  photo,
  isSelected,
  onSelectedToggle,
}: {
  photo: Photo;
  isSelected: boolean;
  onSelectedToggle: (photo: Photo) => void;
}) {
  return (
    <div className="relative">
      <img
        role="image"
        aria-selected={isSelected}
        alt="image"
        src={photo.url}
        width="240"
        height="240"
        className="h-60 w-60 border border-gray-100 shadow-sm"
      />

      {/* how the fuck do we add classes conditionally !! */}
      <div
        role="checkbox"
        className={
          "absolute top-3 left-3 w-5 h-5 border border-blue-300 rounded-full cursor-pointer hover:border-blue-400 " +
          (isSelected ? "bg-blue-300" : "")
        }
        aria-checked={isSelected}
        onClick={() => onSelectedToggle(photo)}
      ></div>
    </div>
  );
}
