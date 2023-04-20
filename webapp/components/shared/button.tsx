import classNames from "classnames";
import React, { MouseEventHandler } from "react";

export type ButtonStyle = "flat" | "simple";
export type ButtonSize = "sm" | "md";
export type ButtonType = "submit" | "reset" | "button";
export const Button = ({
  onClick,
  children,
  style,
  size,
  type,
  disabled,
}: {
  onClick?: MouseEventHandler;
  style?: ButtonStyle;
  size?: ButtonSize;
  children: React.ReactNode;
  type?: ButtonType;
  disabled?: boolean;
}) => {
  const _style = style || "flat";
  const _size = size || "md";

  var btnClass = classNames({
    "h-8 p-3 flex justify-center font-semibold items-center text-center ": true,
    "bg-fuchsia-600 hover:bg-fuchsia-700 text-white  hover:shadow-sm  ":
      _style === "flat",
    "text-sm": _size === "sm",
    "text-md": _size === "md",
    "text-fuchsia-600 hover:text-fuchsia-700": style === "simple",
    "pointer-events-none bg-gray-300": disabled,
  });
  return (
    <button
      onClick={onClick}
      className={btnClass}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
