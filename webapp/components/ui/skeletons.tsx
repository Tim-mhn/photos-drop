import React from "react";

export const TextSkeleton = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) => {
  if (isLoading)
    return (
      <div className="animate-pulse flex py-1 h-10 bg-fuchsia-400 rounded-sm w-64"></div>
    );
  return <>{children}</>;
};
