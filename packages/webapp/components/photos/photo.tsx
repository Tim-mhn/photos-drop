/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Photo } from "../../core/features/photos";
import classNames from "classnames";

export function PhotoComponent({
  photo,
  isSelected,
  onSelectedToggle,
}: {
  photo: Photo;
  isSelected: boolean;
  onSelectedToggle: (photo: Photo) => void;
}) {
  const checkboxClass = classNames({
    " group-hover:visible absolute top-3 left-3 w-5 h-5 border border-blue-300 rounded-full cursor-pointer hover:border-blue-400":
      true,
    invisible: !isSelected,
    "bg-blue-300  ": isSelected,
  });
  return (
    <div
      className={classNames({
        "relative hover:shadow-lg cursor-pointer group ": true,
        "outline-4 outline -outline-offset-4 outline-blue-300 ": isSelected,
      })}
    >
      <img
        role="image"
        aria-selected={isSelected}
        alt="image"
        src={photo.url}
        width="240"
        height="240"
        className="h-60 w-60 border border-gray-100 shadow-sm"
      />

      <div
        role="checkbox"
        className={checkboxClass}
        aria-checked={isSelected}
        onClick={(event) => {
          event.stopPropagation();
          onSelectedToggle(photo);
        }}
      ></div>
    </div>
  );
}
