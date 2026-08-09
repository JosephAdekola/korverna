import { TriangleAlert } from "lucide-react";
import { FormErrorMessageProps } from "./type";

export const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  return <p className=" text-[var(--color-error)] capitalize p-3 bg-red-100 flex gap-3 rounded">
    <TriangleAlert />
    <span>
      {message}
    </span>
  </p>;
};