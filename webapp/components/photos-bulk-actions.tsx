import {
  DropdownOptionCmp,
  Button,
  Dropdown,
  DialogUI,
  DialogTitle,
} from "./ui";
import { useState } from "react";
import Image from "next/image";
import { CreateAlbumDialog } from "./create-album/create-album-dialog";
import { Photos } from "../core/features/photos";
import { Album, useGetAllAlbumsQuery } from "../core/features/albums";
import { addPhotosToAlbum } from "../core/features/album-photos";
import { IconButton } from "./ui/icon-button";

export const PhotosBulkActions = ({
  selectedPhotos,
  onClearClick,
  unSelectPhotos,
}: {
  selectedPhotos: Photos;
  onClearClick: () => void;
  unSelectPhotos: () => void;
}) => {
  const { data } = useGetAllAlbumsQuery();
  const albums = data || [];
  const [addToAlbumDialogOpen, setAddToAlbumDialogOpen] = useState(false);
  const [createAlbumDialogOpen, setCreateAlbumDialogOpen] = useState(false);
  const trigger = <IconButton icon="plus"></IconButton>;

  const closeAddToAlbumDialog = () => setAddToAlbumDialogOpen(false);

  return (
    <div className="px-2 flex flex-grow  items-center gap-4 text-fuchsia-600">
      <div> {selectedPhotos.length} selected</div>

      <Button style="simple" onClick={onClearClick}>
        Clear
      </Button>

      <div className="flex flex-grow justify-end">
        <Dropdown trigger={trigger}>
          <DropdownOptionCmp onClick={() => setAddToAlbumDialogOpen(true)}>
            Add to album
          </DropdownOptionCmp>
          <DropdownOptionCmp onClick={() => setCreateAlbumDialogOpen(true)}>
            Create album
          </DropdownOptionCmp>
        </Dropdown>
      </div>
      <AddPhotosToAlbumDialog
        open={addToAlbumDialogOpen}
        close={closeAddToAlbumDialog}
        albums={albums}
        onAlbumClick={(album) => {
          addPhotosToAlbum({ album, photos: selectedPhotos });
          closeAddToAlbumDialog();
          unSelectPhotos();
        }}
      />

      <CreateAlbumDialog
        open={createAlbumDialogOpen}
        closeDialog={() => setCreateAlbumDialogOpen(false)}
        selectedPhotos={selectedPhotos}
        onAlbumCreated={unSelectPhotos}
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
      <div className="flex flex-col items-start gap-1 ">
        {albums.map((a) => (
          <div
            key={a.id}
            className="flex gap-3 items-center  flex-grow w-full px-4 py-3 hover:bg-pink-200 cursor-pointer border-r-2 border-t-2 border-b-2  border-black "
            onClick={() => onAlbumClick(a)}
          >
            <Image
              src={a.coverPhoto}
              alt={a.name}
              height={40}
              width={40}
              className="h-10 w-10"
            />
            <div className="font-semibold text-sm text-black">{a.name}</div>
          </div>
        ))}
      </div>
    </DialogUI>
  );
};
