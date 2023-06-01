import React from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

export type Icon = "plus";
export function IconButton({ icon }: { icon: Icon }) {
  const className =
    "h-8 w-8 rounded-full hover:shadow-button border-2 border-black bg-fuchsia-400 hover:bg-fuchsia-500 text-black";
  return <PlusIcon className={className} />;
}
