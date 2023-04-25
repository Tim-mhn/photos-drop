"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export default function ErrorAlbumPage({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-start gap-4 flex-grow w-full">
      <div className="flex flex-grow justify-center">
        <ExclamationTriangleIcon className="w-36 h-36 " color="fuchsia" />
      </div>
      <div className="text-6xl font-semibold text-fuchsia-800">
        An error occurred
      </div>

      <div className="text-lg font-medium text-fuchsia-700">
        {error.message}
      </div>
    </div>
  );
}
