import { Photos } from "../core/photos/use-cases/retrieve-all-photos.use-case";
import { Button } from "./button";

export const PhotosBulkActions = ({
  selectedPhotos,
  onClearClick,
}: {
  selectedPhotos: Photos;
  onClearClick: () => void;
}) => {
  return (
    <div className="px-2 flex flex-grow items-center gap-4 text-fuchsia-600">
      <div> {selectedPhotos.length} selected</div>

      <Button style="flat" onClick={onClearClick}>
        Clear
      </Button>

      <div className="flex flex-grow justify-end">
        <Button style="simple">Add to album</Button>
      </div>
    </div>
  );
};
