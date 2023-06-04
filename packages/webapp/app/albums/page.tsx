"use client";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { Divider, LoaderIf } from "../../components/ui";
import { CreateAlbumButton } from "../../components/albums/create-album/create-album-button";
import {
  Album,
  useDeleteAlbumMutation,
  useGetAllAlbumsQuery,
} from "../../core/features/albums";

export default function AlbumsPage() {
  const { data, isLoading } = useGetAllAlbumsQuery();
  const albums = data || [];

  return (
    <div className="flex w-full h-full flex-col justify-start items-start gap-1 pb-4">
      <div className="flex w-full justify-between px-1 pt-1 text-fuchsia-600 font-bold text-xl">
        <div>Albums</div>
        <CreateAlbumButton selectedPhotos={[]} />
      </div>
      <Divider />
      <div className="m-1"></div>

      <AlbumList albums={albums} />

      <LoaderIf isLoading={isLoading} />
    </div>
  );
}

const AlbumList = ({ albums }: { albums: Album[] }) => {
  const [deleteAlbum] = useDeleteAlbumMutation({});
  return (
    <div className="flex flex-row flex-wrap gap-4 gap-y-8 overflow-auto">
      {albums.map((album, n) => (
        <div key={album.id}>
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

          <button onClick={() => deleteAlbum(album.id)}> Delete </button>
        </div>
      ))}
    </div>
  );
};
