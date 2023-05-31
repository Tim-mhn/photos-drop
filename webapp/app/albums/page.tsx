"use client";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { Divider } from "../../components/ui";
import { CreateAlbumButton } from "../../components/create-album/create-album-button";
import { Album } from "../../core/features/albums";
import { useSelector } from "react-redux";
import { albumsSelectors } from "../../core/features/albums/albumsSlice";
import { useEffect } from "react";
import { fetchAllAlbums } from "../../core/features/albums/use-cases/fetch-all-albums/fetch-all-albums";
import { useAppDispatch } from "../../core/store";

export default function AlbumsPage() {
  const dispatch = useAppDispatch();
  const albums = useSelector(albumsSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchAllAlbums());
  }, [dispatch]);
  return (
    <div className="flex w-full h-full flex-col justify-start items-start gap-1 pb-4">
      <div className="flex w-full justify-between px-1 pt-1 text-fuchsia-600 font-bold text-xl">
        <div>Albums</div>
        <CreateAlbumButton selectedPhotos={[]} />
      </div>
      <Divider />
      <div className="m-1"></div>

      <AlbumList albums={albums} />
    </div>
  );
}

const AlbumList = ({ albums }: { albums: Album[] }) => {
  return (
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
          <div className="font-semibold mt-1 text-gray-800 ">{album.name}</div>
          <div className="text-sm text-gray-500">{album.itemsCount} items </div>
        </Link>
      ))}
    </div>
  );
};
