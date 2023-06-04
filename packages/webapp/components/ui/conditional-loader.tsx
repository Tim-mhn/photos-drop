"use client";
import { Spin } from "antd";

export function LoaderIf({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}
    </>
  );
}
