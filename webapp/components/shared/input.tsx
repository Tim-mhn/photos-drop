import { ChangeEventHandler } from "react";
import { FocusEventHandler } from "react";

type InputProps = {
  label?: string;
  name: string;
  placeholder?: string;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  value: string | number | string[];
};

export function Input({
  label,
  name,
  placeholder,
  onChange,
  onBlur,
  value,
}: InputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-fuchsia-900"
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          type="text"
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full outline-none rounded-md border-0 p-2  text-gray-900 shadow-sm ring-1 ring-inset ring-fuchsia-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
