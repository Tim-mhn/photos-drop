import { Photos } from "../core/photos/use-cases/retrieve-all-photos.use-case";
import { Button, Dropdown } from "./shared";
import { PlusIcon } from "@heroicons/react/20/solid";
import { DropdownOptionCmp } from "./shared";
import { DialogUI, DialogTitle } from "./shared";
import { useState } from "react";
import { Album, useAlbumsStore } from "../core/albums";
import Image from "next/image";
import { addPhotosToAlbum } from "../core/album-photos/use-cases/add-photos-to-album";

export const PhotosBulkActions = ({
  selectedPhotos,
  onClearClick,
}: {
  selectedPhotos: Photos;
  onClearClick: () => void;
}) => {
  const albums = useAlbumsStore((state) => state.albums);
  const [addToAlbumDialogOpen, setAddToAlbumDialogOpen] = useState(false);
  const trigger = (
    <PlusIcon className="h-8 w-8 hover:shadow-sm rounded-full hover:bg-gray-50" />
  );

  const closeAddToAlbumDialog = () => setAddToAlbumDialogOpen(false);

  return (
    <div className="px-2 flex flex-grow items-center gap-4 text-fuchsia-600">
      <div> {selectedPhotos.length} selected</div>

      <Button style="simple" onClick={onClearClick}>
        Clear
      </Button>

      <div className="flex flex-grow justify-end">
        <Dropdown trigger={trigger}>
          <DropdownOptionCmp onClick={() => setAddToAlbumDialogOpen(true)}>
            Add to album
          </DropdownOptionCmp>
          <DropdownOptionCmp onClick={() => {}}>Create album</DropdownOptionCmp>
        </Dropdown>
      </div>
      <AddPhotosToAlbumDialog
        open={addToAlbumDialogOpen}
        close={closeAddToAlbumDialog}
        albums={albums}
        onAlbumClick={(album) => {
          addPhotosToAlbum({ album, photos: selectedPhotos });
          closeAddToAlbumDialog();
        }}
      />
    </div>
  );
};

export const AddPhotosToAlbumDialog = ({
  open,
  close,
  albums,
  onAlbumClick,
}: {
  albums: Album[];
  open: boolean;
  close: () => void;
  onAlbumClick: (album: Album) => void;
}) => {
  return (
    <DialogUI
      open={open}
      close={close}
      title={
        <DialogTitle>
          <div className="px-4">Add to</div>
        </DialogTitle>
      }
    >
      <div className="flex flex-col items-start gap-1">
        {albums.map((a) => (
          <div
            key={a.id}
            className="flex gap-3 items-center flex-grow w-full px-4 py-3 hover:bg-pink-50 cursor-pointer"
            onClick={() => onAlbumClick(a)}
          >
            <Image
              src={a.coverPhoto}
              alt={a.name}
              height={40}
              width={40}
              className="h-10 w-10"
            />
            <div className="font-semibold text-sm text-gray-700">{a.name}</div>
          </div>
        ))}
      </div>
    </DialogUI>
  );
};
