"use client";
import { ErrorMessage } from "formik";

export const ErrorMessageWrapper = ({ name }: { name: string }) => {
  return (
    <ErrorMessage name={name}>
      {(msg) => <div className="text-red-800 font-medium text-sm ">{msg}</div>}
    </ErrorMessage>
  );
};
