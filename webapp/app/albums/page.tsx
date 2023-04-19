"use client";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { Divider } from "../../components/divider";
import { useAlbumsStore } from "../../core/albums/store";

export default function AlbumsPage() {
  const albums = useAlbumsStore((state) => state.albums);
  return (
    <div className="flex  h-full flex-col justify-start items-start gap-4  mb-4">
      <div className="px-1 pt-1 text-fuchsia-600 font-bold text-xl">Albums</div>
      <Divider />

      <div className="flex flex-row flex-wrap gap-4 gap-y-8 overflow-auto">
        {albums.map((album, n) => (
          <Link
            href={"/albums/" + album.id}
            key={n}
            className="flex flex-col  text-gray-800"
          >
            <img
              src={album.coverPhoto}
              alt={album.name}
              className="rounded-sm w-52 h-52"
            />
            <div className="font-semibold mt-1 text-gray-800 ">
              {album.name}
            </div>
            <div className="text-sm text-gray-500">
              {album.itemsCount} items{" "}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
