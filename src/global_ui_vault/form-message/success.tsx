import { ThumbsUp } from "lucide-react";
import { FormErrorMessageProps } from "./type";

export const FormSucessMessage = ({ message }: FormErrorMessageProps) => {
  return <p className=" text-[var(--color-success)] capitalize p-3  bg-green-100 flex gap-3 rounded">
    <ThumbsUp />
    <span>
      {message}
    </span>
  </p>;
};
