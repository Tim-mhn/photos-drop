"use client";
import { Divider } from "../../../components";
import { PhotosList } from "../../../components/photos-list/photos-list";

import { useAlbumsStore } from "../../../core/albums";
import { getAlbumPhotos } from "../../../core/albums/add-photos-to-album";

export default function AlbumPhotosPage({
  params,
}: {
  params: { id: string };
}) {
  const albumsStore = useAlbumsStore();
  const album = albumsStore.getAlbumById(params.id);
  const photos = getAlbumPhotos(album);
  return (
    <div className="flex flex-col w-full h-full justify-start gap-6">
      <div className="text-4xl text-fuchsia-600 font-semibold">
        Album {params.id}
      </div>

      <Divider />

      <div>
        <PhotosList photos={photos} />
      </div>
    </div>
  );
}
