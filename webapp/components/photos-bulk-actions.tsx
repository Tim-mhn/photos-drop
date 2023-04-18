import { Photos } from "../core/photos/use-cases/retrieve-all-photos.use-case";
import { Button } from "./button";
import Dropdown from "./dropdown";
import { PlusIcon } from "@heroicons/react/20/solid";
import { DropdownOption } from "./dropdown-option";

enum PhotosBulkAction {
  ADD_TO_GROUP,
  CREATE_GROUP,
}

const options: { text: string; action: PhotosBulkAction }[] = [
  {
    action: PhotosBulkAction.ADD_TO_GROUP,
    text: "Add to group",
  },
  {
    action: PhotosBulkAction.CREATE_GROUP,
    text: "Create group",
  },
];
export const PhotosBulkActions = ({
  selectedPhotos,
  onClearClick,
}: {
  selectedPhotos: Photos;
  onClearClick: () => void;
}) => {
  const trigger = (
    <PlusIcon className="h-8 w-8 hover:shadow-sm rounded-full hover:bg-gray-50" />
  );

  return (
    <div className="px-2 flex flex-grow items-center gap-4 text-fuchsia-600">
      <div> {selectedPhotos.length} selected</div>

      <Button style="simple" onClick={onClearClick}>
        Clear
      </Button>

      <div className="flex flex-grow justify-end">
        <Dropdown trigger={trigger}>
          {options.map((opt) => (
            <DropdownOption key={opt.action} onClick={() => {}}>
              {opt.text}
            </DropdownOption>
          ))}
        </Dropdown>
      </div>
    </div>
  );
};
