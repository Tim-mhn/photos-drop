"use client";
import { Menu } from "@headlessui/react";
import classNames from "classnames";

export const DropdownOptionCmp = ({
  onClick,
  children,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div onClick={onClick}>
      <Menu.Item>
        {({ active }) => (
          <a
            href="#"
            className={classNames({
              "text-gray-900 px-4 py-2 text-sm  block border-b border-t border-black":
                true,
              "bg-fuchsia-400": active,
            })}
          >
            {children}
          </a>
        )}
      </Menu.Item>
    </div>
  );
};
