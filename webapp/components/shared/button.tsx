import classNames from "classnames";
import React, { MouseEventHandler } from "react";

export type ButtonStyle = "flat" | "simple";
export const Button = ({
  onClick,
  children,
  style,
}: {
  onClick?: MouseEventHandler;
  style?: ButtonStyle;
  children: React.ReactNode;
}) => {
  const _style = style || "flat";

  var btnClass = classNames({
    "h-8 p-3 flex justify-center font-semibold items-center text-center ": true,
    "bg-fuchsia-600 hover:bg-fuchsia-700 text-white  hover:shadow-sm  ":
      _style === "flat",
    "text-fuchsia-600 hover:text-fuchsia-700": style === "simple",
  });
  return (
    <button onClick={onClick} className={btnClass}>
      {children}
    </button>
  );
};
