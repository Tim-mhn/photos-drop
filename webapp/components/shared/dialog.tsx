"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
export const DialogTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog.Title
      as="h3"
      className="flex  justify-start text-base font-semibold leading-6 text-gray-900 pb-2"
    >
      {children}
    </Dialog.Title>
  );
};
export function DialogUI({
  open,
  close,
  title,
  children,
}: {
  open: boolean;
  close: () => void;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center py-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white py-2  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:py-6">
                {title}

                <div className="mt-2 max-h-96 overflow-auto">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}