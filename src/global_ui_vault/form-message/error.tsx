import { TriangleAlert } from "lucide-react";
import { FormErrorMessageProps } from "./type";

export const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  return <p className=" text-background! capitalize px-2 bg-danger flex items-center gap-3 rounded">
    <TriangleAlert />
    <span>
      {message}
    </span>
  </p>;
};