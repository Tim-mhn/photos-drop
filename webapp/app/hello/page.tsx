import React from "react";

export default function HelloPage() {
  return (
    <div className="grid grid-cols-6 gap-4 overflow-auto">
      {new Array(30).fill("").map((_, n) => (
        <div key={n} className="h-36 w-36 bg-gray-200"></div>
      ))}
    </div>
  );
}
