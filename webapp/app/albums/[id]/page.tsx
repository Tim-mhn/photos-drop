"use client";
/* eslint-disable @next/next/no-img-element */

import { Album } from "../../../core/albums";
import { getAlbumPhotos } from "../../../core/albums/add-photos-to-album";

export default function AlbumPhotosPage({
  params,
}: {
  params: { id: string };
}) {
  const photos = getAlbumPhotos({ id: params.id } as any as Album);
  return (
    <div className="flex flex-col w-full h-full justify-start ">
      <div>album {params.id}</div>

      <div className="flex flex-row gap-4 flex-wrap">
        {photos.map((p) => (
          <img
            key={p.id}
            src={p.url}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 aspect-auto"
          />
        ))}
      </div>
    </div>
  );
}
