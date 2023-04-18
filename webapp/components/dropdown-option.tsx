import { Menu } from "@headlessui/react";
import classNames from "classnames";

export const DropdownOption = ({
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
            className={classNames(
              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
              "block px-4 py-2 text-sm font-semibold"
            )}
          >
            {children}
          </a>
        )}
      </Menu.Item>
    </div>
  );
};
