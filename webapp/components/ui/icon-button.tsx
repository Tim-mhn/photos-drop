import React from "react";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/20/solid";

export type Icon = "plus" | "dots";
export function IconButton({ icon }: { icon: Icon }) {
  const className =
    "h-8 w-8 rounded-full hover:shadow-button border-2 border-black bg-fuchsia-400 hover:bg-fuchsia-500 text-black";
  if (icon === "plus") return <PlusIcon className={className} />;

  if (icon === "dots") return <EllipsisVerticalIcon className={className} />;
  else return <PlusIcon className={className} />;
}
