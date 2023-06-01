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
  withBorder,
  round,
}: {
  onClick?: MouseEventHandler;
  style?: ButtonStyle;
  size?: ButtonSize;
  children: React.ReactNode;
  type?: ButtonType;
  disabled?: boolean;
  withBorder?: boolean;
  round?: boolean;
}) => {
  const _style = style || "flat";
  const _size = size || "md";

  var btnClass = classNames({
    "h-10 flex justify-center font-semibold items-center text-center ": true,
    "bg-fuchsia-500 hover:bg-fuchsia-600  text-white  border-black border-2 hover:shadow-button ":
      _style === "flat",
    "p-3": !round,
    "rounded-full h-8 w-8 p-0": round,
    "text-sm": _size === "sm",
    "text-md": _size === "md",
    "text-fuchsia-600 hover:text-fuchsia-700 hover:underline hover:underline-offset-4 decoration-fuchsia-600 decoration-2":
      style === "simple",
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
