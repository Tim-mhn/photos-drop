"use client";
import { Divider } from "../../../components/shared";
import { PhotosList } from "../../../components/photos-list/photos-list";

import { useAlbumsStore } from "../../../core/albums";
import { getAlbumPhotos } from "../../../core/album-photos";

export default function AlbumPhotosPage({
  params,
}: {
  params: { id: string };
}) {
  const albumsStore = useAlbumsStore();
  const albumId = params.id;
  const photos = getAlbumPhotos({ albumId });
  const album = albumsStore.getAlbumById(albumId);

  return (
    <div className="flex flex-col w-full h-full justify-start gap-6">
      <div className="text-4xl text-fuchsia-600 font-semibold">
        {album.name}
      </div>

      <Divider />

      <div>
        <PhotosList photos={photos} />
      </div>
    </div>
  );
}
